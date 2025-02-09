import Elysia, { t } from "elysia";
import createImagesService from "../../services/images/create/action";
import { CreateImageDtoIn } from "../../services/images/create/dto.in";
import getImageService from "../../services/images/get/action";
import { GetImageDtoIn } from "../../services/images/get/dto.in";
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
							dto: new GetImageDtoIn(params["*"] as string),
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
							dto: new CreateImageDtoIn(body.image, body.bucket),
							context,
						});

						return result.toJSON();
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
