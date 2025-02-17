import { FileStorageNotFoundError } from "../../../infra/file-storage/errors/not-found";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	GetImageDtoIn,
	GetImageDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	try {
		const image = await context.fileStorage.get({ path: dto.path });

		return GetImageDtoOut.create({
			image,
		});
	} catch (error) {
		if (error instanceof FileStorageNotFoundError) {
			ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
				message: "Image not found",
				details: [{ path: ["path"], message: "Image not found" }],
			});
		}

		throw error;
	}
}, GetImageDtoIn);
