import { z } from "zod";
import {
	url,
	date,
	id,
	limit,
	offset,
	orderDirection,
	orderField,
	username,
} from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import { firstName, lastName } from "../../users/common/validation/schema";

export type InShape = DtoShape<typeof ListDtoIn>;
export type OutShape = DtoShape<typeof ListDtoOut>;

export const ListDtoIn = createInputDto(
	z.object({
		type: z.enum(["followers", "following"]),
		userId: id,
		limit: limit.optional().default(10),
		offset: offset.optional().default(0),
		orderDirection: orderDirection.optional().default("desc"),
		orderField: orderField.optional().default("createdAt"),
	}),
);

export const ListDtoOut = createOutputDto(
	z.object({
		data: z.array(
			z.object({
				id: id,
				user: z.object({
					id: id,
					username: username.nullable(),
					firstName: firstName.nullable(),
					lastName: lastName.nullable(),
					imageUrl: url.nullable(),
				}),
				follower: z.object({
					id: id,
					username: username.nullable(),
					firstName: firstName.nullable(),
					lastName: lastName.nullable(),
					imageUrl: url.nullable(),
				}),
				createdAt: date,
				updatedAt: date,
			}),
		),
		total: z.number(),
	}),
);
