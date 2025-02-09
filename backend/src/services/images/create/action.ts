import z from "zod";
import { Image } from "../../../entities/image";
import { makeService } from "../../make-service";
import { CreateImageDtoOut } from "./dto.out";

export default makeService(
	async ({ dto, context }) => {
		const image = await Image.fromBucket({
			bucket: dto.bucket ?? context.config.FILE_STORAGE_DEFAULT_BUCKET_NAME,
			extension: dto.image.type.split("/").pop(),
		});

		await context.imagesRepository.createFromEntity(image);

		await context.fileStorage.put({
			file: dto.image,
			path: image.getPath(),
		});

		return new CreateImageDtoOut(
			`${context.config.FILE_STORAGE_BASE_RETRIEVE_URL}/${image.getPath()}`,
		);
	},
	z.object({
		image: z
			.instanceof(File, { message: "Should be a file" })
			.refine(
				(file) =>
					file.size > 0 &&
					file.size < 10 << 20 &&
					file.type.startsWith("image/"),
				{
					message: "Invalid image",
				},
			),
		bucket: z.string().optional(),
	}),
);
