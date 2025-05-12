import assert from "node:assert/strict";
import Elysia, { type InferContext } from "elysia";
import listEventsService from "../../services/events/list/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { prepareServiceHandlerPayload } from "./utils";

export const eventsRoute = new Elysia({ name: "eventsRoute" })
	.use(contextPlugin)
	.decorate("listEventsService", listEventsService)
	.group("/events", (app) => {
		const appWithJwtGuard = app.use(createJwtAuthGuard());

		appWithJwtGuard.get(
			"/",
			...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
				async (ctx) => {
					assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

					return ctx.listEventsService({
						dto: {
							accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
							...prepareServiceHandlerPayload(ctx),
						},
						context: ctx.context,
					});
				},
			),
		);

		return appWithJwtGuard;
	});
