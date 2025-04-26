import { z } from "zod";

import { id } from "../../common/validation/schema";
import { type DtoShape, createInputDto } from "../../dtos/factory";
import { createOutputDto } from "../../dtos/factory";

export type InShape = DtoShape<typeof CountDtoIn>;
export type OutShape = DtoShape<typeof CountDtoOut>;

export const CountDtoIn = createInputDto(
	z.object({
		userId: id,
	}),
);

export const CountDtoOut = createOutputDto(
	z.object({
		followersCount: z.number(),
		followingCount: z.number(),
	}),
);
