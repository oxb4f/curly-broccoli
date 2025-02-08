import z from "zod";
import { Image } from "../../../entities/image";
import type { Context } from "../../context";
import { makeService } from "../../make-service";
import type { CreateImageDtoIn } from "./dto.in";
import { CreateImageDtoOut } from "./dto.out";

async function create({
	dto,
	context,
}: {
	dto: CreateImageDtoIn;
	context: Context;
}) {
	const image = await Image.fromBucket({
		bucket: dto.bucket,
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
}

export function factory() {
	return makeService(
		create,
		z.object({ image: z.instanceof(File), bucket: z.string().optional() }),
	);
}
