import { z } from "zod";
import { url, id } from "../../../common/validation/schema";
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

export type InShape = DtoShape<typeof GetDtoIn>;
export type OutShape = DtoShape<typeof GetDtoOut>;

export const GetDtoIn = createInputDto(
	z.object({
		bookId: id,
	}),
);

export const GetDtoOut = createOutputDto(
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
