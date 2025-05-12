import Elysia, { type InferContext } from "elysia";
import refreshService from "../../services/accesses/refresh/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { generateUserAgentHash, prepareServiceHandlerPayload } from "./utils";

export const accessesRoute = new Elysia({ name: "accessesRoute" })
	.use(contextPlugin)
	.decorate("refreshService", refreshService)
	.group("/accesses", (app) =>
		app.guard((app) =>
			app.use(createJwtAuthGuard(true)).post(
				"/:accessId/refresh",
				...ensureRequestContext<InferContext<typeof app>, any>(async (ctx) => {
					return ctx.refreshService({
						dto: {
							refreshId: generateUserAgentHash(ctx.request),
							...prepareServiceHandlerPayload(ctx),
						},
						context: ctx.context,
					});
				}),
			),
		),
	);
