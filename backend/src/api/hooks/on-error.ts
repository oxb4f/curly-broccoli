import { type Context, NotFoundError } from "elysia";
import { match } from "ts-pattern";
import { P } from "ts-pattern";
import { ServiceError } from "../../services/errors/error";

function getErrorResponse(error: Record<string, any>) {
	return { error };
}

export function onError<E extends Error = Error>(
	error: E,
	set: Context["set"],
) {
	console.trace(error);

	return match(error as any)
		.with({ constructor: ServiceError }, (e: any) => {
			set.status = match(e)
				.when(
					(e) => e.isAuthError(),
					() => 401,
				)
				.when(
					(e) => e.isNotFoundError(),
					() => 404,
				)
				.when(
					(e) => e.isConflictError(),
					() => 409,
				)
				.otherwise(() => 422);

			return getErrorResponse(e.toJSON());
		})
		.with({ code: "VALIDATION", all: P.array() }, (e: any) => {
			set.status = 422;
			return getErrorResponse({
				type: "VALIDATION",
				payload: {
					message: "Validation error",
					details: e.all.map((r: { path: string; message: string }) => ({
						path: r.path.slice(1).split("/"),
						message: "Invalid data",
					})),
				},
			});
		})
		.with({ constructor: NotFoundError }, () => {
			set.status = 404;
			return getErrorResponse({ message: "Not found", details: [] });
		})
		.otherwise(() => {
			set.status = 500;
			return getErrorResponse({ type: "INTERNAL_SERVER_ERROR" });
		});
}
