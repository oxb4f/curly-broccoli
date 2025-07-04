import { z } from "zod";
import { url, id, searchTerm } from "../../../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../../../dtos/factory";
import {
	author,
	description,
	genre,
	isbn,
	title,
} from "../../../common/validation/schema";

export type InShape = DtoShape<typeof QuickSearchDtoIn>;
export type OutShape = DtoShape<typeof QuickSearchDtoOut>;

export const QuickSearchDtoIn = createInputDto(
	z.object({
		term: searchTerm.optional(),
	}),
);

export const QuickSearchDtoOut = createOutputDto(
	z.object({
		books: z.array(
			z.object({
				id: id,
				title: title,
				description: description.nullable(),
				author: author,
				isbn: isbn.nullable(),
				genre: genre.nullable(),
				imageUrl: url.nullable(),
			}),
		),
		total: z.number(),
	}),
);
