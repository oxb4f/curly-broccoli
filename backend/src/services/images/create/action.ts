import { Image } from "../../../entities/image";
import { makeService } from "../../make-service";
import {
	CreateImageDtoIn,
	CreateImageDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const image = await Image.fromBucket({
		bucket: dto.bucket ?? context.config.FILE_STORAGE_DEFAULT_BUCKET_NAME,
		extension: dto.image.type.split("/").pop(),
	});

	await context.imagesRepository.create(image);

	await context.fileStorage.put({
		file: dto.image,
		path: image.getPath(),
	});

	return CreateImageDtoOut.create({
		url: `${context.config.FILE_STORAGE_BASE_RETRIEVE_URL}/${image.getPath()}`,
	});
}, CreateImageDtoIn);
