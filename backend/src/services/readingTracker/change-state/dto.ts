import { z } from "zod";
import { date, id } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import { state } from "../common/validation/schema";

export type InShape = DtoShape<typeof ChangeStateDtoIn>;
export type OutShape = DtoShape<typeof ChangeStateDtoOut>;

export const ChangeStateDtoIn = createInputDto(
	z.object({
		accessId: id,
		userBookId: id,
		readingTrackerId: id,
		action: z.enum(["pause", "resume", "finish"]),
	}),
);

export const ChangeStateDtoOut = createOutputDto(
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
