import { z } from "zod";
import {
	date,
	id,
	jwt,
	password,
	refreshId,
	username,
} from "../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../dtos/factory";
import { firstName } from "../common/validation/schema";
import { social } from "../common/validation/schema";
import { lastName } from "../common/validation/schema";

export type InShape = DtoShape<typeof LoginDtoIn>;
export type OutShape = DtoShape<typeof LoginDtoOut>;

export const LoginDtoIn = createInputDto(
	z.object({
		username: username,
		password: password,
		refreshId: refreshId,
	}),
);

export const LoginDtoOut = createOutputDto(
	z.object({
		id: id,
		username: username,
		firstName: firstName.nullable(),
		lastName: lastName.nullable(),
		birthday: date.nullable(),
		social: social.nullable(),
		accessId: id,
		jwt: z.object({
			access: jwt,
			refresh: jwt,
		}),
	}),
);
