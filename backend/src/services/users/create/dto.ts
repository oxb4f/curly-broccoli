import { z } from "zod";

import {
	url,
	date,
	id,
	jwt,
	password,
	refreshId,
	username,
} from "../../common/validation/schema";
import { type DtoShape, createInputDto } from "../../dtos/factory";
import { createOutputDto } from "../../dtos/factory";
import { firstName } from "../common/validation/schema";
import { lastName } from "../common/validation/schema";
import { social } from "../common/validation/schema";

export type InShape = DtoShape<typeof CreateUserDtoIn>;
export type OutShape = DtoShape<typeof CreateUserDtoOut>;

export const CreateUserDtoIn = createInputDto(
	z.object({
		username: username,
		password: password,
		refreshId: refreshId,
	}),
);

export const CreateUserDtoOut = createOutputDto(
	z.object({
		id: id,
		username: username,
		firstName: firstName.nullable(),
		lastName: lastName.nullable(),
		birthday: date.nullable(),
		social: social.nullable(),
		imageUrl: url.nullable(),
		accessId: id,
		jwt: z.object({
			access: jwt,
			refresh: jwt,
		}),
	}),
);
