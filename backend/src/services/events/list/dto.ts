import { z } from "zod";
import {
	date,
	id,
	limit,
	offset,
	orderDirection,
	orderField,
} from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";

export type InShape = DtoShape<typeof ListDtoIn>;
export type OutShape = DtoShape<typeof ListDtoOut>;

export const ListDtoIn = createInputDto(
	z.object({
		accessId: id,
		fromUserId: id.optional(),
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
				name: z.string(),
				payload: z.any(),
				toUserId: id,
				fromUserId: id,
				createdAt: date,
			}),
		),
		total: z.number(),
	}),
);
