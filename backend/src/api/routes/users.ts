import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import { factory as createUsersServiceFactory } from "../../services/users/create/action";
import { CreateUserDtoIn } from "../../services/users/create/dto.in";
import { factory as loginUsersServiceFactory } from "../../services/users/login/action";
import { LoginDtoIn } from "../../services/users/login/dto.in";
import { factory as updateUsersServiceFactory } from "../../services/users/update/action";
import { UpdateUserDtoIn } from "../../services/users/update/dto.in";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { generateUserAgentHash } from "./utils";

export const usersRoute = new Elysia({ name: "usersRoute" })
	.use(contextPlugin)
	.decorate("createUsersService", createUsersServiceFactory())
	.decorate("loginUsersService", loginUsersServiceFactory())
	.decorate("updateUsersService", updateUsersServiceFactory())
	.group("/users", (app) =>
		app.guard((app) =>
			app
				.post(
					"/",
					async ({ body, context, createUsersService, headers }) => {
						const result = await createUsersService({
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
					async ({ body, context, loginUsersService, headers }) => {
						const result = await loginUsersService({
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
				.patch(
					"/:userId",
					async ({ params, body, context, updateUsersService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await updateUsersService({
							dto: new UpdateUserDtoIn(
								store.jwtAuthGuardPayload.payload.accessId,
								params.userId,
								body.username,
								body.firstName,
								body.lastName,
								body.birthday,
								body.social,
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
						}),
					},
				),
		),
	);
