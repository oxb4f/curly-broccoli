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
			(e: E) => e instanceof ServiceError,
			(e: ServiceError) => {
				set.status = e.isAuthError() ? 401 : 422;

				return getErrorResponse(e.toJSON());
			},
		)
		.when(
			(e: any) => e && e.code === "VALIDATION" && Array.isArray(e.all),
			(e: any) => {
				return getErrorResponse({
                    message: "Validation error",
                    details : e.all.map((r: { path: string, message: string }) => ({
                        path : r.path.slice(1).split('/'),
                        message : "Invalid data"
                    }))
                });
			},
		)
		.otherwise(() => {
			set.status = 500;

			return getErrorResponse({ type: "INTERNAL_SERVER_ERROR" });
		});

	return result;
}
