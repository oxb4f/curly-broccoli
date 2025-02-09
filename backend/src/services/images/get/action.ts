import z from "zod";
import { FileStorageNotFoundError } from "../../../infra/file-storage/errors/not-found";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import { GetImageDtoOut } from "./dto.out";

export default makeService(
	async ({ dto, context }) => {
		try {
			const image = await context.fileStorage.get({ path: dto.path });

			return new GetImageDtoOut(image);
		} catch (error) {
			if (error instanceof FileStorageNotFoundError) {
				ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
					message: "Image not found",
					details: [{ path: ["path"], message: "Image not found" }],
				});
			}

			throw error;
		}
	},
	z.object({ path: z.string().min(1).max(100) }),
);
