import type { ZodSchema } from "zod";
import type { Context } from "./context";
import { ServiceError } from "./errors/error";

export type ServiceAction<
	InputDto extends Record<string, any> = Record<string, any>,
	OutputType = any,
> = (arg: {
	dto: InputDto;
	context: Context;
}) => Promise<OutputType>;

function isClassInstance(value: any): boolean {
	return value?.constructor && value.constructor !== Object;
}

async function validateDto<T extends Record<string, any>>(
	dto: T,
	schema?: ZodSchema<T>,
): Promise<T> {
	if (!schema) return dto;

	const result = await schema.safeParseAsync(dto);
	if (!result.success) {
		ServiceError.throwValidationErrorFromZodError(result.error);
	}

	if (isClassInstance(dto)) {
		Object.assign(dto, result.data);
		return dto;
	}

	return result.data;
}

function createServiceProxy<InputDto extends Record<string, any>, OutputType>(
	action: ServiceAction<InputDto, OutputType>,
	validationSchema?: ZodSchema<InputDto>,
) {
	return new Proxy(action, {
		async apply(
			target: ServiceAction<InputDto, OutputType>,
			thisArg: unknown,
			[arg]: [{ dto: InputDto; context: Context }],
		) {
			arg.dto = await validateDto(arg.dto, validationSchema);
			return target.call(thisArg, arg);
		},
	});
}

export function makeService<InputDto extends Record<string, any>, OutputType>(
	action: ServiceAction<InputDto, OutputType>,
	validationSchema?: ZodSchema<InputDto>,
) {
	return createServiceProxy(action, validationSchema);
}
