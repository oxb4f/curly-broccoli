import { z } from "zod";
import { id } from "../../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../../dtos/factory";

export type InShape = DtoShape<typeof DeleteDtoIn>;
export type OutShape = DtoShape<typeof DeleteDtoOut>;

export const DeleteDtoIn = createInputDto(
	z.object({
		bookId: id,
		accessId: id,
	}),
);

export const DeleteDtoOut = createOutputDto(
	z.object({
		id: id,
	}),
);
