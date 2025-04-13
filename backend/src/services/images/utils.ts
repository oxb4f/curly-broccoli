import { P, match } from "ts-pattern";
import { FileStorageNotFoundError } from "../../infra/file-storage/errors/not-found";
import { FileStorageDeniedError } from "../../infra/file-storage/errors/denied";
import { ServiceError } from "../errors/error";

function catchFileStorageError(error: any, notFoundOnDenied = false): never {
	return match(error)
		.with(P.instanceOf(FileStorageNotFoundError), () =>
			ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
				message: error.message,
				details: [{ path: ["path"], message: error.message }],
			}),
		)
		.with(P.instanceOf(FileStorageDeniedError), () => {
			const errorType = notFoundOnDenied
				? ServiceError.ERROR_TYPE.NOT_FOUND
				: ServiceError.ERROR_TYPE.VALIDATION;

			ServiceError.throw(errorType, {
				message: "File storage denied",
				details: [{ path: ["path"], message: "File storage denied" }],
			});
		})
		.otherwise(() => {
			throw error;
		});
}

export function catchFileStorageErrorOnGet(error: any): never {
	return catchFileStorageError(error, true);
}

export function catchFileStorageErrorOnCreate(error: any): never {
	return catchFileStorageError(error, false);
}