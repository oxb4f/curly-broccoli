import { z } from "zod";

import { id } from "../../common/validation/schema";
import { type DtoShape, createInputDto } from "../../dtos/factory";
import { createOutputDto } from "../../dtos/factory";

export type InShape = DtoShape<typeof FollowDtoIn>;
export type OutShape = DtoShape<typeof FollowDtoOut>;

export const FollowDtoIn = createInputDto(
	z.object({
		accessId: id,
		userId: id,
	}),
);

export const FollowDtoOut = createOutputDto(
	z.object({
		id: id,
		userId: id,
		followerId: id,
	}),
);
