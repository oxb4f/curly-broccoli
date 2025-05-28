import { z } from "zod";
import {
	type DtoShape,
	createOutputDto,
} from "../../../dtos/factory";
import {
	author,
	genre,
	numberOfPages,
} from "../../common/validation/schema";

export type OutShape = DtoShape<typeof FiltersDtoOut>;

export const FiltersDtoOut = createOutputDto(
	z.object({
		genres: z.array(genre),
		authors: z.array(author),
		numberOfPagesMin: numberOfPages,
		numberOfPagesMax: numberOfPages,
		total: z.number().int().min(0),
	}),
);
