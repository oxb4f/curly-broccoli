import type { ZodSchema } from "zod";
import type { Context } from "./context";
import { ServiceError } from "./errors/error";

export type ActionDto<T extends Record<string, any> = Record<string, any>> = T;
export type ActionArg<
	T extends Record<string, any>,
	D extends ActionDto<T> = ActionDto<T>,
> = {
	dto: D;
	context: Context;
};
export type TAction<T extends Record<string, any>, R> = (
	arg: ActionArg<T>,
) => Promise<R>;

function makeProxyHandler<T extends Record<string, any>, R>(
	action: TAction<T, R>,
	validationSchema?: ZodSchema<T>,
) {
	const proxyHandler = {
		async apply(target: TAction<T, R>, thisArg: unknown, args: [ActionArg<T>]) {
			if (validationSchema) {
				const result = await validationSchema.safeParseAsync(args[0].dto);

				if (!result.success)
					ServiceError.throwValidationErrorFromZodError(result.error);

				args[0].dto = result.data;
			}

			return target.apply(thisArg, args);
		},
	};

	return new Proxy(action, proxyHandler);
}

export function makeService<T extends Record<string, any>, R>(
	action: TAction<T, R>,
	validationSchema?: ZodSchema<T>,
) {
	return makeProxyHandler(action, validationSchema);
}
