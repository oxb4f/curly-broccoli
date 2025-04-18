import { z } from "zod";
import { STATE } from "../../../entities/readingTracker";
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
import { state } from "../common/validation/schema";

export type InShape = DtoShape<typeof ListDtoIn>;
export type OutShape = DtoShape<typeof ListDtoOut>;

export const ListDtoIn = createInputDto(
	z.object({
		accessId: id,
		userBookId: id,
		state: z.enum(Object.values(STATE) as [string, ...string[]]).optional(),
		limit: limit.optional().default(10),
		offset: offset.optional().default(0),
		orderDirection: orderDirection.optional().default("desc"),
		orderField: orderField.optional().default("createdAt"),
	}),
);

export const ListDtoOut = createOutputDto(
	z.object({
		trackers: z.array(
			z.object({
				id: id,
				userBookId: id,
				state: state,
				createdAt: date,
				finishedAt: date.nullable(),
				readingRecords: z.array(
					z.object({
						id: id,
						createdAt: date,
						duration: z.number(),
					}),
				),
			}),
		),
		total: z.number(),
	}),
);
