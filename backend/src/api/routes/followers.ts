import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import countFollowersService from "../../services/followers/count/action";
import createFollowerService from "../../services/followers/follow/action";
import listFollowersService from "../../services/followers/list/action";
import createUnfollowService from "../../services/followers/unfollow/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";

export const followersRoute = new Elysia({ name: "followersRoute" })
	.use(contextPlugin)
	.decorate("createFollowerService", createFollowerService)
	.decorate("createUnfollowService", createUnfollowService)
	.decorate("listFollowersService", listFollowersService)
	.decorate("countFollowersService", countFollowersService)
	.group("/followers", (app) =>
		app.guard((app) =>
			app
				.use(createJwtAuthGuard())
				.post(
					"/",
					async ({ body, context, createFollowerService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await createFollowerService({
							dto: {
								accessId: store.jwtAuthGuardPayload.payload.accessId,
								userId: body.userId,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Followers"],
						body: t.Object({
							userId: t.Number({
								description: "User id",
							}),
						}),
					},
				)
				.delete(
					"/",
					async ({ query, context, createUnfollowService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await createUnfollowService({
							dto: {
								accessId: store.jwtAuthGuardPayload.payload.accessId,
								id: query.id,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Followers"],
						query: t.Object({
							id: t.Number({
								description: "Record id",
							}),
						}),
					},
				)
				.get(
					"/count",
					async ({ query, context, countFollowersService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await countFollowersService({
							dto: {
								userId: query.userId,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Followers"],
						query: t.Object({
							userId: t.Numeric({
								description: "User id",
							}),
						}),
					},
				)
				.get(
					"/:type",
					async ({ params, query, context, listFollowersService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await listFollowersService({
							dto: {
								userId: query.userId,
								type: params.type,
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
						tags: ["Followers"],
						params: t.Object({
							type: t.Enum({
								followers: "followers",
								following: "following",
							}),
						}),
						query: t.Object({
							userId: t.Numeric({
								description: "User id",
							}),
							limit: t.Optional(
								t.Number({
									description: "Limit",
								}),
							),
							offset: t.Optional(
								t.Number({
									description: "Offset",
								}),
							),
							orderDirection: t.Optional(
								t.Enum({
									asc: "asc",
									desc: "desc",
								}),
							),
							orderField: t.Optional(
								t.String({
									description: "Order field",
								}),
							),
						}),
					},
				),
		),
	);
