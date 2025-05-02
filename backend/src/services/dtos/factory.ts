import type { ZodError, z } from "zod";
import { ServiceError } from "../errors/error";

export type Dto<T> = {
	create: (data: unknown) => Promise<T> | never;
	schema: z.ZodType<T>;
};

export type DtoShape<T extends Dto<unknown>> = z.infer<T["schema"]>;

export function validate<T>(schema: z.ZodType<T>) {
	return async (data: unknown) => schema.safeParseAsync(data);
}

function createDto<T>(
	schema: z.ZodType<T>,
	onError: (error: ZodError) => never,
): Dto<T> {
	return {
		create: async (data: unknown) => {
			const result = await validate(schema)(data);

			if (!result.success) {
				onError(result.error);
			}

			return result.data;
		},
		schema,
	};
}

export function createInputDto<T>(schema: z.ZodType<T>): Dto<T> {
	return createDto(schema, ServiceError.throwValidationErrorFromZodError);
}

export function createOutputDto<T>(schema: z.ZodType<T>): Dto<T> {
	return createDto(schema, (error) => {
		console.trace({ error });

		ServiceError.throw(ServiceError.ERROR_TYPE.WRONG_INTERNAL_STATE, {
			message: "Validation error",
			details: [],
		});
	});
}
