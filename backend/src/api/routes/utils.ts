import crypto from "node:crypto";
import type { Context } from "elysia";

export function generateUserAgentHash(request: Request) {
	const userAgent = request.headers.get("user-agent") ?? "default";
	return crypto.createHash("sha256").update(userAgent).digest("base64");
}

export function prepareServiceHandlerPayload<T extends Context>(ctx: T) {
	return {
		...((ctx.body as any) ?? {}),
		...((ctx.query as any) ?? {}),
		...((ctx.params as any) ?? {}),
	};
}
