import type { ZodError } from "zod";
import { type ErrorType, errorType } from "./error-type";

export type ErrorDetails = Record<string, any>[];
export type ErrorMessage = string;
export type ErrorPayload = { message: ErrorMessage; details: ErrorDetails };

export class ServiceError<C extends Error = Error> extends Error {
	protected constructor(
		protected type: ErrorType,
		protected payload: ErrorPayload,
		cause?: C,
	) {
		super(payload.message, { cause });
	}

	static throwNotFoundError(payload: ErrorPayload): never {
		throw new ServiceError(errorType.NOT_FOUND, payload);
	}

	static throwDuplicatedError(payload: ErrorPayload): never {
		throw new ServiceError(errorType.DUPLICATED, payload);
	}

	static throwValidationErrorFromZodError(error: ZodError): never {
		throw new ServiceError(errorType.VALIDATION, {
			message: "Validation error",
			details: error.issues.map((issue) => ({
				path: issue.path,
				message: issue.message,
			})),
		});
	}

	static throwValidationError(payload: ErrorPayload): never {
		throw new ServiceError(errorType.VALIDATION, payload);
	}

	toJSON() {
		return {
			type: this.type,
			payload: this.payload,
		};
	}
}
