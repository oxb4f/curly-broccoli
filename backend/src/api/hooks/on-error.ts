import { type Context, NotFoundError } from "elysia";
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
				let statusCode = 422;

				if (e.isAuthError()) statusCode = 401;
				if (e.isNotFoundError()) statusCode = 404;

				set.status = statusCode;

				return getErrorResponse(e.toJSON());
			},
		)
		.when(
			(e: any) => e && e.code === "VALIDATION" && Array.isArray(e.all),
			(e: any) => {
				set.status = 422;

				return getErrorResponse({
					message: "Validation error",
					details: e.all.map((r: { path: string; message: string }) => ({
						path: r.path.slice(1).split("/"),
						message: "Invalid data",
					})),
				});
			},
		)
		.when(
			(e: any) => e instanceof NotFoundError,
			() => {
				set.status = 404;

				return getErrorResponse({ message: "Not found", details: [] });
			},
		)
		.otherwise(() => {
			set.status = 500;

			return getErrorResponse({ type: "INTERNAL_SERVER_ERROR" });
		});

	return result;
}
