import { z } from "zod";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";

export type InShape = DtoShape<typeof GetImageDtoIn>;
export type OutShape = DtoShape<typeof GetImageDtoOut>;

export const GetImageDtoIn = createInputDto(
	z.object({
		path: z.string().min(1).max(100),
	}),
);

export const GetImageDtoOut = createOutputDto(
	z.object({
		image: z.instanceof(File),
	}),
);
