import { z } from "zod";

import { id } from "../../common/validation/schema";
import { type DtoShape, createInputDto } from "../../dtos/factory";
import { createOutputDto } from "../../dtos/factory";

export type InShape = DtoShape<typeof UnfollowDtoIn>;
export type OutShape = DtoShape<typeof UnfollowDtoOut>;

export const UnfollowDtoIn = createInputDto(
	z.object({
		accessId: id,
		id: id,
	}),
);

export const UnfollowDtoOut = createOutputDto(
	z.object({
		result: z.boolean(),
	}),
);
