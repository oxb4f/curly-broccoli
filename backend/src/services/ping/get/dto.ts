import { z } from "zod";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";

export type InShape = DtoShape<typeof GetPingDtoIn>;
export type OutShape = DtoShape<typeof GetPingDtoOut>;

export const GetPingDtoIn = createInputDto(
	z.object({
		ping: z.string().max(128),
	}),
);

export const GetPingDtoOut = createOutputDto(
	z.object({
		pong: z.string().max(128),
	}),
);
