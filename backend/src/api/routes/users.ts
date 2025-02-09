import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import createUserService from "../../services/users/create/action";
import { CreateUserDtoIn } from "../../services/users/create/dto.in";
import getUserService from "../../services/users/get/action";
import { GetUserDtoIn } from "../../services/users/get/dto.in";
import loginUserService from "../../services/users/login/action";
import { LoginDtoIn } from "../../services/users/login/dto.in";
import updateUserService from "../../services/users/update/action";
import { UpdateUserDtoIn } from "../../services/users/update/dto.in";
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
							dto: new CreateUserDtoIn(
								body.username,
								body.password,
								generateUserAgentHash(headers["user-agent"]),
							),
							context,
						});

						return result.toJSON();
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
							dto: new LoginDtoIn(
								body.username,
								body.password,
								generateUserAgentHash(headers["user-agent"]),
							),
							context,
						});

						return result.toJSON();
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
							dto: new GetUserDtoIn(
								store.jwtAuthGuardPayload.payload.accessId,
								params.userId,
							),
							context,
						});

						return result.toJSON();
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
							dto: new UpdateUserDtoIn(
								store.jwtAuthGuardPayload.payload.accessId,
								params.userId,
								body.username,
								body.firstName,
								body.lastName,
								body.birthday,
								body.social,
								body.imageUrl,
							),
							context,
						});

						return result.toJSON();
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
