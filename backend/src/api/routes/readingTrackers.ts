import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import changeStateService from "../../services/readingTracker/change-state/action";
import listReadingTrackerService from "../../services/readingTracker/list/action";
import startReadingTrackerService from "../../services/readingTracker/start/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";

export const readingTrackersRoute = new Elysia({ name: "readingTrackersRoute" })
	.use(contextPlugin)
	.decorate("startReadingTrackerService", startReadingTrackerService)
	.decorate("changeStateService", changeStateService)
	.decorate("listReadingTrackerService", listReadingTrackerService)
	.use(createJwtAuthGuard())
	.group("/books/:userBookId/readingTrackers", (app) =>
		app
			.get(
				"/",
				async ({
					params,
					query,
					context,
					listReadingTrackerService,
					store,
				}) => {
					assert(store.jwtAuthGuardPayload.payload?.accessId);

					const result = await listReadingTrackerService({
						dto: {
							accessId: store.jwtAuthGuardPayload.payload.accessId,
							userBookId: Number(params.userBookId),
							state: query.state,
							limit: query.limit,
							offset: query.offset,
							orderDirection: query.orderDirection,
							orderField: query.orderField as any,
						},
						context,
					});

					return result;
				},
				{
					tags: ["Reading Trackers"],
					query: t.Object({
						params: t.Object({
							userBookId: t.Number({
								description: "User book ID",
							}),
						}),
						state: t.Optional(
							t.Enum(
								{
									reading: "reading",
									paused: "paused",
									finished: "finished",
								},
								{ description: "State" },
							),
						),
						orderDirection: t.Optional(
							t.Enum(
								{
									asc: "asc",
									desc: "desc",
								},
								{ description: "Order direction" },
							),
						),
						orderField: t.Optional(
							t.String({
								description: "Order field",
							}),
						),
						limit: t.Optional(
							t.Number({
								description: "Limit",
								default: 10,
							}),
						),
						offset: t.Optional(
							t.Number({
								description: "Offset",
								default: 0,
							}),
						),
					}),
				},
			)
			.post(
				"/:readingTrackerId/:action",
				async ({ params, context, changeStateService, store }) => {
					assert(store.jwtAuthGuardPayload.payload?.accessId);

					const result = await changeStateService({
						dto: {
							accessId: store.jwtAuthGuardPayload.payload.accessId,
							userBookId: Number(params.userBookId),
							readingTrackerId: params.readingTrackerId,
							action: params.action as "pause" | "resume" | "finish",
						},
						context,
					});

					return result;
				},
				{
					tags: ["Reading Trackers"],
					params: t.Object({
						userBookId: t.Number({
							description: "User book ID",
						}),
						readingTrackerId: t.Number({
							description: "Reading Tracker ID",
						}),
						action: t.String({
							description: "Action",
						}),
					}),
				},
			)
			.post(
				"/start",
				async ({ params, context, startReadingTrackerService, store }) => {
					assert(store.jwtAuthGuardPayload.payload?.accessId);

					const result = await startReadingTrackerService({
						dto: {
							accessId: store.jwtAuthGuardPayload.payload.accessId,
							userBookId: Number(params.userBookId),
						},
						context,
					});

					return result;
				},
				{
					tags: ["Reading Trackers"],
					params: t.Object({
						userBookId: t.Number({
							description: "User book ID",
						}),
					}),
				},
			),
	);
