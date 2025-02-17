import { z } from "zod";

import { id, jwt, refreshId } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";

export type InShape = DtoShape<typeof RefreshDtoIn>;
export type OutShape = DtoShape<typeof RefreshDtoOut>;

export const RefreshDtoIn = createInputDto(
	z.object({
		refresh: jwt,
		refreshId: refreshId,
		accessId: id,
	}),
);

export const RefreshDtoOut = createOutputDto(
	z.object({
		jwt: z.object({
			access: jwt,
			refresh: jwt,
		}),
	}),
);
