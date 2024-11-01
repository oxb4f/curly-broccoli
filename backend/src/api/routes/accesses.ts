import Elysia, { t } from "elysia";
import { factory as refreshServiceFactory } from "../../services/accesses/refresh/action";
import { RefreshDtoIn } from "../../services/accesses/refresh/dto.in";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { generateUserAgentHash } from "./utils";

export const accessesRoute = new Elysia({ name: "accessesRoute" })
	.use(contextPlugin)
	.decorate("refreshService", refreshServiceFactory())
	.group("/accesses", (app) =>
		app.guard((app) =>
			app.use(createJwtAuthGuard(true)).post(
				"/:accessId/refresh",
				async ({ body, params, context, refreshService, headers }) => {
					const result = await refreshService({
						dto: new RefreshDtoIn(
							generateUserAgentHash(headers["user-agent"]),
							params.accessId,
							body.refresh,
						),
						context,
					});

					return result.toJSON();
				},
				{
					params: t.Object({
						accessId: t.Numeric({
							description: "Access id",
							examples: 1,
						}),
					}),
					body: t.Object({
						refresh: t.String({
							description: "Refresh token",
							examples: "lupapupa",
						}),
					}),
				},
			),
		),
	);
