import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import createUserService from "../../services/users/create/action";
import getUserService from "../../services/users/get/action";
import loginUserService from "../../services/users/login/action";
import updateUserService from "../../services/users/update/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { generateUserAgentHash } from "./utils";

export const usersRoute = new Elysia({ name: "usersRoute" })
	.use(contextPlugin)
	.decorate("createUserService", createUserService)
	.decorate("loginUserService", loginUserService)
	.decorate("updateUserService", updateUserService)
	.decorate("getUserService", getUserService)
	.group("/users", (app) =>
		app.guard((app) =>
			app
				.post(
					"/",
					async ({ body, context, createUserService, headers }) => {
						const result = await createUserService({
							dto: {
								username: body.username,
								password: body.password,
								refreshId: generateUserAgentHash(headers["user-agent"]),
							},
							context,
						});

						return result;
					},
					{
						tags: ["Users"],
						body: t.Object({
							username: t.String({
								description: "Username",
							}),
							password: t.String({
								description: "Password",
							}),
						}),
					},
				)
				.post(
					"/login",
					async ({ body, context, loginUserService, headers }) => {
						const result = await loginUserService({
							dto: {
								username: body.username,
								password: body.password,
								refreshId: generateUserAgentHash(headers["user-agent"]),
							},
							context,
						});

						return result;
					},
					{
						tags: ["Users"],
						body: t.Object({
							username: t.String({
								description: "Username",
							}),
							password: t.String({
								description: "Password",
							}),
						}),
					},
				)
				.use(createJwtAuthGuard())
				.get(
					"/:userId",
					async ({ params, context, getUserService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await getUserService({
							dto: {
								accessId: store.jwtAuthGuardPayload.payload.accessId,
								userId: params.userId,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Users"],
						params: t.Object({
							userId: t.Numeric({
								description: "User id",
							}),
						}),
					},
				)
				.patch(
					"/:userId",
					async ({ params, body, context, updateUserService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await updateUserService({
							dto: {
								accessId: store.jwtAuthGuardPayload.payload.accessId,
								userId: params.userId,
								username: body.username,
								firstName: body.firstName,
								lastName: body.lastName,
								birthday: body.birthday,
								social: body.social,
								imageUrl: body.imageUrl,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Users"],
						params: t.Object({
							userId: t.Numeric({
								description: "User id",
							}),
						}),
						body: t.Object({
							username: t.Optional(
								t.String({
									description: "Username",
								}),
							),
							firstName: t.Optional(
								t.Nullable(
									t.String({
										description: "First name",
									}),
								),
							),
							lastName: t.Optional(
								t.Nullable(
									t.String({
										description: "Last name",
									}),
								),
							),
							birthday: t.Optional(
								t.Nullable(
									t.Date({
										description: "Last name",
									}),
								),
							),
							social: t.Optional(
								t.Object({
									instagram: t.Optional(
										t.Nullable(
											t.String({
												description: "Instagram URL",
											}),
										),
									),
									telegram: t.Optional(
										t.Nullable(
											t.String({
												description: "Telegram URL",
											}),
										),
									),
								}),
							),
							imageUrl: t.Optional(
								t.Nullable(
									t.String({
										description: "Image URL",
									}),
								),
							),
						}),
					},
				),
		),
	);
