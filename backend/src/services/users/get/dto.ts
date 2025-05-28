import { z } from "zod";

import { url, date, id, username } from "../../common/validation/schema";
import { type DtoShape, createInputDto } from "../../dtos/factory";
import { createOutputDto } from "../../dtos/factory";
import { social } from "../common/validation/schema";
import { lastName } from "../common/validation/schema";
import { firstName } from "../common/validation/schema";

export type InShape = DtoShape<typeof GetUserDtoIn>;
export type OutShape = DtoShape<typeof GetUserDtoOut>;

export const GetUserDtoIn = createInputDto(
	z.object({
		accessId: id,
		userId: id,
	}),
);

export const GetUserDtoOut = createOutputDto(
	z.object({
		id: id,
		username: username,
		firstName: firstName.nullable(),
		lastName: lastName.nullable(),
		birthday: date.nullable(),
		social: social.nullable(),
		imageUrl: url.nullable(),
		followed: z.boolean().nullable(),
		followersId: z.number().nullable(),
		numberOfReadBooks: z.number(),
		numberOfFollowing: z.number(),
		numberOfFollowers: z.number(),
	}),
);
