import Elysia, { type InferContext } from "elysia";
import getPingService from "../../services/ping/get/action";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";

export const pingRoute = new Elysia({ name: "pingRoute" })
	.use(contextPlugin)
	.decorate("getPingService", getPingService)
	.group("/ping", (app) =>
		app.guard((app) =>
			app.get(
				"/",
				...ensureRequestContext<InferContext<typeof app>, any>(
					async ({ query, getPingService, context }) => {
						return getPingService({
							dto: { ping: query?.ping! },
							context,
						});
					},
				),
			),
		),
	);
