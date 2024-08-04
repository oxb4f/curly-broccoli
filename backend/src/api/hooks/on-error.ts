import type { Context } from "elysia";
import { match } from "ts-pattern";
import { ServiceError } from "../../services/errors/error";

function getErrorResponse(error: Record<string, any>) {
	return { error };
}

export function onError<E extends Error = Error>(
	error: E,
	set: Context["set"],
) {
	const result = match(error)
		.when(
			(e: any) => e instanceof ServiceError,
			(e: ServiceError) => {
				set.status = e.isAuthError() ? 401 : 422;

				return getErrorResponse(e.toJSON());
			},
		)
		.otherwise(() => {
			set.status = 500;

			return getErrorResponse({ type: "INTERNAL_SERVER_ERROR" });
		});

	return result;
}
