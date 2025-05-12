import assert from "node:assert/strict";
import Elysia, { type InferContext } from "elysia";
import countFollowersService from "../../services/followers/count/action";
import createFollowerService from "../../services/followers/follow/action";
import listFollowersService from "../../services/followers/list/action";
import createUnfollowService from "../../services/followers/unfollow/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { prepareServiceHandlerPayload } from "./utils";

export const followersRoute = new Elysia({ name: "followersRoute" })
	.use(contextPlugin)
	.decorate("createFollowerService", createFollowerService)
	.decorate("createUnfollowService", createUnfollowService)
	.decorate("listFollowersService", listFollowersService)
	.decorate("countFollowersService", countFollowersService)
	.group("/followers", (app) =>
		app.guard((app) => {
			const appWithJwtGuard = app.use(createJwtAuthGuard());

			return appWithJwtGuard
				.post(
					"/",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

							return ctx.createFollowerService({
								dto: {
									accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				)
				.delete(
					"/",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

							return ctx.createUnfollowService({
								dto: {
									accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				)
				.get(
					"/count",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							return ctx.countFollowersService({
								dto: {
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				)
				.get(
					"/:type",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							return ctx.listFollowersService({
								dto: {
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				);
		}),
	);
