import Elysia, { t } from "elysia";
import { factory as getPingServiceFactory } from "../../services/ping/get/action";
import { GetPingDtoIn } from "../../services/ping/get/dto.in";
import { contextPlugin } from "../plugins/context";

export const pingRoute = new Elysia({ name: "pingRoute" })
	.use(contextPlugin)
	.decorate("getPingService", getPingServiceFactory())
	.group("/ping", (app) =>
		app.guard((app) =>
			app.get(
				"/",
				async ({ query, getPingService, context }) => {
					const result = await getPingService({
						dto: new GetPingDtoIn(query.ping!),
						context,
					});

					return result.toJSON();
				},
				{
					query: t.Object({
						ping: t.String({
							description: "Ping value",
							examples: "Ping",
						}),
					}),
				},
			),
		),
	);
