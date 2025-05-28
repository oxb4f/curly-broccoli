import { z } from "zod";
import {
	url,
	getEnumValues,
	id,
	limit,
	offset,
	orderDirection,
	orderField,
	searchTerm,
} from "../../../common/validation/schema";
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

const orderFieldValues = [
	...getEnumValues(orderField),
	"isFavorite",
	"isRead",
	"numberOfPages",
	"genre",
	"author",
];

export const ListDtoIn = createInputDto(
	z.object({
		genre: z
			.preprocess((val) => {
				if (val === undefined || val === null) return [];
				return Array.isArray(val) ? val : [val];
			}, z.array(genre))
			.optional()
			.default([]),
		author: z
			.preprocess((val) => {
				if (val === undefined || val === null) return [];
				return Array.isArray(val) ? val : [val];
			}, z.array(author))
			.optional()
			.default([]),
		numberOfPagesMin: numberOfPages.optional(),
		numberOfPagesMax: numberOfPages.optional(),
		isRead: z.boolean().optional(),
		isFavorite: z.boolean().optional(),
		userId: id,
		limit: limit.optional().nullable().default(10),
		offset: offset.optional().nullable().default(0),
		orderDirection: orderDirection.optional().nullable().default("desc"),
		orderField: z
			.enum(orderFieldValues as [string, ...string[]])
			.optional()
			.nullable()
			.default("createdAt"),
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
				isFavorite: z.boolean().nullable(),
				isRead: z.boolean().nullable(),
				rating: z.number().int().min(0).max(5).nullable(),
				review: z.string().nullable(),
				isReadingTrackerStarted: z.boolean(),
				userId: id,
			}),
		),
		total: z.number().int().min(0),
	}),
);
