import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import listEventsService from "../../services/events/list/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";

export const eventsRoute = new Elysia({ name: "eventsRoute" })
	.use(contextPlugin)
	.decorate("listEventsService", listEventsService)
	.group("/events", (app) =>
		app.guard((app) =>
			app.use(createJwtAuthGuard()).get(
				"/",
				async ({ query, listEventsService, context, store }) => {
					assert(store.jwtAuthGuardPayload.payload?.accessId);

					const result = await listEventsService({
						dto: {
							accessId: store.jwtAuthGuardPayload.payload.accessId,
							fromUserId: query.fromUserId,
							orderDirection: query.orderDirection,
							orderField: query.orderField as any,
							limit: query.limit,
							offset: query.offset,
						},
						context,
					});

					return result;
				},
				{
					tags: ["Events"],
					query: t.Object({
						fromUserId: t.Optional(
							t.Number({
								description: "From user id",
							}),
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
			),
		),
	);
