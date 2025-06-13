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

export type InShape = DtoShape<typeof AddDtoIn>;
export type OutShape = DtoShape<typeof AddDtoOut>;

export const AddDtoIn = createInputDto(
	z.object({
		bookId: id,
		accessId: id,
	}),
);

export const AddDtoOut = createOutputDto(
	z.object({
		id: id,
		title: title,
		description: description.nullable(),
		author: author,
		genre: genre.nullable(),
		isbn: isbn.nullable(),
		numberOfPages: numberOfPages,
		imageUrl: url.nullable(),
	}),
);
