import { z } from "zod";
import {
	url,
	date,
	id,
	limit,
	offset,
	orderDirection,
	orderField,
	searchTerm,
	username,
} from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import {
	firstName,
	lastName,
	social,
} from "../../users/common/validation/schema";

export type InShape = DtoShape<typeof ListDtoIn>;
export type OutShape = DtoShape<typeof ListDtoOut>;

export const ListDtoIn = createInputDto(
	z.object({
		searchTerm: searchTerm.optional(),
		notId: id.optional(),
		accessId: id,
		limit: limit.optional().default(10),
		offset: offset.optional().default(0),
		orderDirection: orderDirection.optional().default("desc"),
		orderField: orderField.optional().default("createdAt"),
	}),
);

export const ListDtoOut = createOutputDto(
	z.object({
		users: z.array(
			z.object({
				id: id,
				username: username,
				firstName: firstName.nullable(),
				lastName: lastName.nullable(),
				birthday: date.nullable(),
				social: social.nullable(),
				imageUrl: url.nullable(),
				followed: z.boolean(),
			}),
		),
		total: z.number(),
	}),
);
