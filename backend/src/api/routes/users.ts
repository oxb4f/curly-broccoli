import crypto from "node:crypto";
import Elysia, { t } from "elysia";
import { factory as createUsersServiceFactory } from "../../services/users/create/action";
import { CreateUserDtoIn } from "../../services/users/create/dto.in";
import { factory as loginUsersServiceFactory } from "../../services/users/login/action";
import { LoginDtoIn } from "../../services/users/login/dto.in";
import { contextPlugin } from "../plugins/context";

function generateUserAgentHash(userAgent?: string) {
	return crypto
		.createHash("sha256")
		.update(userAgent ?? "default")
		.digest("base64");
}

export const usersRoute = new Elysia({ name: "usersRoute" })
	.use(contextPlugin)
	.decorate("createUsersService", createUsersServiceFactory())
	.decorate("loginUsersService", loginUsersServiceFactory())
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
						body: t.Object({
							username: t.String({
								description: "Username",
								examples: "lupapupa",
							}),
							password: t.String({
								description: "Password",
								examples: "lupapupa",
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
						body: t.Object({
							username: t.String({
								description: "Username",
								examples: "lupapupa",
							}),
							password: t.String({
								description: "Password",
								examples: "lupapupa",
							}),
						}),
					},
				),
		),
	);
