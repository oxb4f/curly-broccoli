import Elysia, { type InferContext } from "elysia";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { API_REFERENCE } from "../../constants";

export const pingRoute = new Elysia({ name: "pingRoute" })
	.use(contextPlugin)
	.group("/references", (app) =>
		app.guard((app) =>
			app.get(
				"/:reference",
				...ensureRequestContext<InferContext<typeof app>, any>(
					async (ctx) => {
						const params = ctx.params as { reference: keyof typeof API_REFERENCE };

						return {
							data: API_REFERENCE[params.reference] ?? [],
						};
					},
				),
			)
			.get(
				"/",
				...ensureRequestContext<InferContext<typeof app>, any>(
					async () => {
						return API_REFERENCE;
					},
				),
			),
		),
	);