import { z } from "zod";
import { id } from "../../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../../dtos/factory";
import { author, genre, numberOfPages } from "../../common/validation/schema";

export type InShape = DtoShape<typeof FiltersDtoIn>;
export type OutShape = DtoShape<typeof FiltersDtoOut>;

export const FiltersDtoIn = createInputDto(
	z.object({
		userId: id,
	}),
);

export const FiltersDtoOut = createOutputDto(
	z.object({
		genres: z.array(genre),
		authors: z.array(author),
		numberOfPagesMin: numberOfPages,
		numberOfPagesMax: numberOfPages,
		total: z.number().int().min(0),
	}),
);
