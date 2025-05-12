import assert from "node:assert/strict";
import Elysia, { type InferContext } from "elysia";
import createUserService from "../../services/users/create/action";
import getUserService from "../../services/users/get/action";
import listUserService from "../../services/users/list/action";
import loginUserService from "../../services/users/login/action";
import quickSearchUserService from "../../services/users/search/quick/action";
import updateUserService from "../../services/users/update/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { generateUserAgentHash, prepareServiceHandlerPayload } from "./utils";

export const usersRoute = new Elysia({ name: "usersRoute" })
	.use(contextPlugin)
	.decorate("createUserService", createUserService)
	.decorate("loginUserService", loginUserService)
	.decorate("updateUserService", updateUserService)
	.decorate("getUserService", getUserService)
	.decorate("listUserService", listUserService)
	.decorate("quickSearchUserService", quickSearchUserService)
	.group("/users", (app) =>
		app.guard((app) => {
			app
				.post(
					"/",
					...ensureRequestContext<InferContext<typeof app>, any>(
						async (ctx) => {
							return ctx.createUserService({
								dto: {
									...prepareServiceHandlerPayload(ctx),
									refreshId: generateUserAgentHash(ctx.request),
								},
								context: ctx.context,
							});
						},
					),
				)
				.post(
					"/login",
					...ensureRequestContext<InferContext<typeof app>, any>(
						async (ctx) => {
							return ctx.loginUserService({
								dto: {
									...prepareServiceHandlerPayload(ctx),
									refreshId: generateUserAgentHash(ctx.request),
								},
								context: ctx.context,
							});
						},
					),
				)
				.get(
					"/quick-search",
					...ensureRequestContext<InferContext<typeof app>, any>(
						async (ctx) => {
							return ctx.quickSearchUserService({
								dto: {
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				);

			const appWithJwtGuard = app.use(createJwtAuthGuard());

			return appWithJwtGuard
				.get(
					"/:userId",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

							return ctx.getUserService({
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
					"/",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

							return ctx.listUserService({
								dto: {
									accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				)
				.patch(
					"/:userId",
					...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
						async (ctx) => {
							assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

							return ctx.updateUserService({
								dto: {
									accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
									...prepareServiceHandlerPayload(ctx),
								},
								context: ctx.context,
							});
						},
					),
				);
		}),
	);
