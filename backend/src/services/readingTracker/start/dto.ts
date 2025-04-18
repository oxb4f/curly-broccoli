import { z } from "zod";
import { date, id } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import { state } from "../common/validation/schema";

export type InShape = DtoShape<typeof CreateDtoIn>;
export type OutShape = DtoShape<typeof CreateDtoOut>;

export const CreateDtoIn = createInputDto(
	z.object({
		accessId: id,
		userBookId: id,
	}),
);

export const CreateDtoOut = createOutputDto(
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
);
