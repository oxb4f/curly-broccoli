import { makeService } from "../../make-service";
import { catchFileStorageErrorOnGet } from "../utils";
import {
	GetImageDtoIn,
	GetImageDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	try {
		const image = await context.fileStorage.get({ path: dto.path });

		return GetImageDtoOut.create({ image });
	} catch (error) {
		catchFileStorageErrorOnGet(error);
	}
}, GetImageDtoIn);
