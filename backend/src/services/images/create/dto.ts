import { z } from "zod";
import { url } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";

export type InShape = DtoShape<typeof CreateImageDtoIn>;
export type OutShape = DtoShape<typeof CreateImageDtoOut>;

export const CreateImageDtoIn = createInputDto(
	z.object({
		image: z
			.instanceof(File, { message: "Should be a file" })
			.refine(
				(file) =>
					file.size > 0 &&
					file.size < 10 << 20 &&
					file.type.startsWith("image/"),
				{
					message: "Invalid image",
				},
			),
		bucket: z.string().optional(),
	}),
);

export const CreateImageDtoOut = createOutputDto(
	z.object({
		url: url,
	}),
);
