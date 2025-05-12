import assert from "node:assert/strict";
import Elysia, { type InferContext } from "elysia";
import changeStateService from "../../services/reading-tracker/change-state/action";
import listReadingTrackerService from "../../services/reading-tracker/list/action";
import startReadingTrackerService from "../../services/reading-tracker/start/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { prepareServiceHandlerPayload } from "./utils";

export const readingTrackersRoute = new Elysia({ name: "readingTrackersRoute" })
	.use(contextPlugin)
	.decorate("startReadingTrackerService", startReadingTrackerService)
	.decorate("changeStateService", changeStateService)
	.decorate("listReadingTrackerService", listReadingTrackerService)
	.group("/books/:userBookId/readingTrackers", (app) => {
		const appWithJwtGuard = app.use(createJwtAuthGuard());

		return appWithJwtGuard
			.get(
				"/",
				...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
					async (ctx) => {
						assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

						return ctx.listReadingTrackerService({
							dto: {
								accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
								...prepareServiceHandlerPayload(ctx),
								userBookId: Number(ctx.params.userBookId),
							},
							context: ctx.context,
						});
					},
				),
			)
			.post(
				"/:readingTrackerId/:action",
				...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
					async (ctx) => {
						assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

						return ctx.changeStateService({
							dto: {
								accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
								...prepareServiceHandlerPayload(ctx),
							},
							context: ctx.context,
						});
					},
				),
			)
			.post(
				"/start",
				...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
					async (ctx) => {
						assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

						return ctx.startReadingTrackerService({
							dto: {
								accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
								...prepareServiceHandlerPayload(ctx),
							},
							context: ctx.context,
						});
					},
				),
			);
	});
