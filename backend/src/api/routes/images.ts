import assert from "node:assert/strict";
import Elysia, { type InferContext } from "elysia";
import createImagesService from "../../services/images/create/action";
import getImageService from "../../services/images/get/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { prepareServiceHandlerPayload } from "./utils";

export const imagesRoute = new Elysia({ name: "imagesRoute" })
	.use(contextPlugin)
	.decorate("createImageService", createImagesService)
	.decorate("getImageService", getImageService)
	.group("/images", (app) =>
		app.guard((app) => {
			const appWithoutGuard = app.get(
				"*",
				...ensureRequestContext<InferContext<typeof app>, any>(async (ctx) => {
					return new Response(
						(
							await ctx.getImageService({
								dto: { path: String((ctx.params as any)["*"]) },
								context: ctx.context,
							})
						).image,
					);
				}),
			);

			const appWithJwtGuard = appWithoutGuard.use(createJwtAuthGuard());

			return appWithJwtGuard.post(
				"/",
				...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
					async (ctx) => {
						assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

						return ctx.createImageService({
							dto: {
								...prepareServiceHandlerPayload(ctx),
							},
							context: ctx.context,
						});
					},
				),
			);
		}),
	);
