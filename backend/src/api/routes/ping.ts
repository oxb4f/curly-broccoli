import Elysia, { t } from "elysia";
import { factory as getPingServiceFactory } from "../../services/ping/get/action";
import { GetPingDtoIn } from "../../services/ping/get/dto.in";

export const pingRoute = new Elysia({ name: "pingRoute" })
	.decorate("getPingService", getPingServiceFactory())
	.group("/ping", (app) =>
		app.guard((app) =>
			app.get(
				"/",
				async ({ query, getPingService }) => {
					const result = await getPingService({
						dto: new GetPingDtoIn(query.ping!),
						context: {},
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
