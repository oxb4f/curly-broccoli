import Elysia, { t } from "elysia";
import createImagesService from "../../services/images/create/action";
import getImageService from "../../services/images/get/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";

export const imagesRoute = new Elysia({ name: "imagesRoute" })
	.use(contextPlugin)
	.decorate("createImageService", createImagesService)
	.decorate("getImageService", getImageService)
	.group("/images", (app) =>
		app.guard((app) =>
			app
				.get(
					"*",
					async ({ params, context, getImageService }) => {
						const result = await getImageService({
							dto: { path: params["*"] as string },
							context,
						});

						return new Response(result.image);
					},
					{
						tags: ["Images"],
						params: t.Object({
							"*": t.String({
								description: "Path",
							}),
						}),
					},
				)
				.use(createJwtAuthGuard())
				.post(
					"/",
					async ({ body, context, createImageService }) => {
						const result = await createImageService({
							dto: {
								image: body.image,
								bucket: body.bucket,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Images"],
						body: t.Object({
							image: t.Any({
								description: "Image",
							}),
							bucket: t.Optional(
								t.String({
									description: "Bucket",
								}),
							),
						}),
					},
				),
		),
	);
