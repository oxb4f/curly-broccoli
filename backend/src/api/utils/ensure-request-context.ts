import { randomUUID } from "node:crypto";
import { type Context, StatusMap } from "elysia";
import { runInScope } from "../../infra/als";
import { defaultRequestLoggerFactory } from "../../infra/logger";

type RouteHandlerFunction<T, R> = (ctx: T) => Promise<R>;

function startTimeToMsString(startTime: [number, number]): string {
	const ms = startTime[0] * 1000 + startTime[1] / 1000000;

	return `${ms.toFixed(2)}ms`;
}

export function ensureRequestContext<T extends Context, R>(
	routeHandler: RouteHandlerFunction<T, R>,
): [
	RouteHandlerFunction<T, R>,
	{
		afterHandle: ({ response, set }: T) => void;
		beforeHandle: ({ request }: T) => void;
	},
] {
	const ctxId = randomUUID();

	const requestLogger = defaultRequestLoggerFactory(ctxId);

	const afterHandle = ({
		request,
		set,
		store,
		query,
		body,
		params,
		response,
	}: T) => {
		set.headers["x-request-id"] = ctxId;

		const startTime = (store as { startTime?: [number, number] }).startTime ?? [
			0, 0,
		];

		const status = StatusMap[set.status as keyof typeof StatusMap] ?? 200;
		const responseHeaders = set.headers;

		const level = Math.trunc(status / 100) === 2 ? "info" : "error";

		requestLogger[level](
			{
				method: request.method,
				url: request.url,
				status,
				query,
				body,
				params,
				duration: startTimeToMsString(startTime),
				responseBody: response,
				responseHeaders: responseHeaders,
				requestHeaders: Object.fromEntries(request.headers.entries()),
			},
			"response",
		);
	};
	const beforeHandle = ({ request, store, query, body, params }: T) => {
		const startTime = process.hrtime();
		store = { ...store, startTime };

		requestLogger.info(
			{
				method: request.method,
				url: request.url,
				query,
				body,
				params,
				headers: Object.fromEntries(request.headers.entries()),
				startTime: startTimeToMsString(startTime),
			},
			"request",
		);
	};

	const handler = async (ctx: T) => {
		return runInScope(async () => {
			try {
				return await routeHandler(ctx);
			} catch (error) {
				requestLogger.error(
					{
						method: ctx.request.method,
						url: ctx.request.url,
						query: ctx.query,
						body: ctx.body,
						params: ctx.params,
						headers: Object.fromEntries(ctx.request.headers.entries()),
						error_message:
							error instanceof Error ? error.message : String(error),
						error: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
					},
					"request",
				);

				throw error;
			}
		}, ctxId);
	};

	return [handler, { afterHandle, beforeHandle }];
}
