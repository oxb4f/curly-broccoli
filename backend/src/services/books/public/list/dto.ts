import { z } from "zod";
import { url, id, limit, offset } from "../../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../../dtos/factory";
import {
	author,
	description,
	genre,
	isbn,
	numberOfPages,
	title,
} from "../../common/validation/schema";

export type InShape = DtoShape<typeof ListDtoIn>;
export type OutShape = DtoShape<typeof ListDtoOut>;

export const ListDtoIn = createInputDto(
	z.object({
		limit: limit.optional().nullable().default(10),
		offset: offset.optional().nullable().default(0),
	}),
);

export const ListDtoOut = createOutputDto(
	z.object({
		books: z.array(
			z.object({
				id: id,
				title: title,
				description: description.nullable(),
				author: author,
				genre: genre.nullable(),
				imageUrl: url.nullable(),
				numberOfPages: numberOfPages,
				isbn: isbn.nullable(),
			}),
		),
		total: z.number().int().min(0),
	}),
);
