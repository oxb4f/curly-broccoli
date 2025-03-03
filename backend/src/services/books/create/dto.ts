import { z } from "zod";
import { url, id } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import {
	author,
	description,
	genre,
	isbn,
	numberOfPages,
	title,
} from "../common/validation/schema";

export type InShape = DtoShape<typeof CreateDtoIn>;
export type OutShape = DtoShape<typeof CreateDtoOut>;

export const CreateDtoIn = createInputDto(
	z.object({
		accessId: id,
		title: title,
		description: description.nullable().optional(),
		author: author,
		genre: genre.nullable().optional(),
		imageUrl: url.nullable().optional(),
		numberOfPages: numberOfPages,
		isbn: isbn.nullable().optional(),
	}),
);

export const CreateDtoOut = createOutputDto(
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
);
