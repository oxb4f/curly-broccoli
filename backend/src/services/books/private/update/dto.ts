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

export type InShape = DtoShape<typeof UpdateDtoIn>;
export type OutShape = DtoShape<typeof UpdateDtoOut>;

export const UpdateDtoIn = createInputDto(
	z.object({
		accessId: id,
		bookId: id,
		title: title.optional(),
		description: description.nullable().optional(),
		author: author.optional(),
		genre: genre.nullable().optional(),
		imageUrl: url.nullable().optional(),
		numberOfPages: numberOfPages.optional(),
		isbn: isbn.nullable().optional(),
		isFavorite: z.coerce.boolean().optional(),
		isRead: z.coerce.boolean().optional(),
		rating: z.number().int().min(0).max(5).nullable().optional(),
		review: z.string().nullable().optional(),
	}),
);

export const UpdateDtoOut = createOutputDto(
	z.object({
		id: id,
		title: title,
		description: description.nullable(),
		author: author,
		genre: genre.nullable(),
		imageUrl: url.nullable(),
		numberOfPages: numberOfPages,
		isbn: isbn.nullable(),
		isFavorite: z.boolean().nullable(),
		isRead: z.boolean().nullable(),
		rating: z.number().int().min(0).max(5).nullable(),
		review: z.string().nullable(),
	}),
);
