import { z } from "zod";
import { jwt } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";

export type InShape = DtoShape<typeof ValidateDtoIn>;
export type OutShape = DtoShape<typeof ValidateDtoOut>;

export const ValidateDtoIn = createInputDto(
	z.object({
		jwtAccess: jwt.optional().nullable(),
		ignoreExpiration: z.boolean().optional(),
	}),
);

export const ValidateDtoOut = createOutputDto(
	z.object({
		result: z.boolean(),
		payload: z.record(z.string(), z.any()).nullable(),
	}),
);
