import { z } from "zod";
import { url, date, id, username } from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import { firstName, social } from "../common/validation/schema";
import { lastName } from "../common/validation/schema";

export type InShape = DtoShape<typeof UpdateUserDtoIn>;
export type OutShape = DtoShape<typeof UpdateUserDtoOut>;

export const UpdateUserDtoIn = createInputDto(
	z.object({
		accessId: id,
		userId: id,
		username: username.optional(),
		firstName: firstName.optional().nullable(),
		lastName: lastName.optional().nullable(),
		birthday: date.optional().nullable(),
		social: social.optional().nullable(),
		imageUrl: url.optional().nullable(),
	}),
);

export const UpdateUserDtoOut = createOutputDto(
	z.object({
		id: id,
		username: username,
		firstName: firstName.nullable(),
		lastName: lastName.nullable(),
		birthday: date.nullable(),
		social: social.nullable(),
		imageUrl: url.nullable(),
	}),
);
