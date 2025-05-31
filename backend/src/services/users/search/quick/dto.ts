import { z } from "zod";
import { id, searchTerm, url, username } from "../../../common/validation/schema";
import {
	type DtoShape,
	createInputDto,
	createOutputDto,
} from "../../../dtos/factory";
import { firstName, lastName } from "../../common/validation/schema";

export type InShape = DtoShape<typeof QuickSearchDtoIn>;
export type OutShape = DtoShape<typeof QuickSearchDtoOut>;

export const QuickSearchDtoIn = createInputDto(
	z.object({
		term: searchTerm.optional(),
	}),
);

export const QuickSearchDtoOut = createOutputDto(
	z.object({
		users: z.array(
			z.object({
				id: id,
				username: username,
				firstName: firstName.nullable(),
				lastName: lastName.nullable(),
				imageUrl: url.nullable(),
			}),
		),
		total: z.number(),
	}),
);
