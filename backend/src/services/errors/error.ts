import type { ZodError } from "zod";

export type ErrorDetails = Record<string, any>[];
export type ErrorMessage = string;
export type ErrorPayload = { message: ErrorMessage; details: ErrorDetails };
export type ErrorType = keyof typeof ServiceError.ERROR_TYPE;

export class ServiceError<C extends Error = Error> extends Error {
	static ERROR_TYPE = Object.freeze({
		DUPLICATED: "DUPLICATED",
		NOT_FOUND: "NOT_FOUND",
		VALIDATION: "VALIDATION",
		AUTH: "AUTH",
	} as const);

	protected constructor(
		protected type: ErrorType,
		protected payload: ErrorPayload,
		cause?: C,
	) {
		super(payload.message, { cause });
	}

	static throwValidationErrorFromZodError(error: ZodError): never {
		throw new ServiceError(ServiceError.ERROR_TYPE.VALIDATION, {
			message: "Validation error",
			details: error.issues.map((issue) => ({
				path: issue.path,
				message: issue.message,
			})),
		});
	}

	static throw(errorType: ErrorType, payload: ErrorPayload): never {
		throw new ServiceError(errorType, payload);
	}

	isAuthError() {
		return this.type === ServiceError.ERROR_TYPE.AUTH;
	}

	toJSON() {
		return {
			type: this.type,
			payload: this.payload,
		};
	}
}