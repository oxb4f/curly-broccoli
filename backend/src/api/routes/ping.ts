import Elysia, { t } from "elysia";
import getPingService from "../../services/ping/get/action";
import { contextPlugin } from "../plugins/context";

export const pingRoute = new Elysia({ name: "pingRoute" })
	.use(contextPlugin)
	.decorate("getPingService", getPingService)
	.group("/ping", (app) =>
		app.guard((app) =>
			app.get(
				"/",
				async ({ query, getPingService, context }) => {
					const result = await getPingService({
						dto: { ping: query.ping },
						context,
					});

					return result;
				},
				{
					tags: ["Ping"],
					query: t.Object({
						ping: t.String({
							description: "Ping value",
						}),
					}),
				},
			),
		),
	);
