import z from "zod";
import { id } from "../../common/validation/schema";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { GetUserDtoIn } from "./dto.in";
import { GetUserDtoOut } from "./dto.out";

export default makeService<GetUserDtoIn, GetUserDtoOut>(
	async ({ dto, context }) => {
		const user = await context.usersRepository.getUser({
			id: dto.userId,
			accessId: dto.accessId,
		});

		if (!user) {
			ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
				message: "User not found",
				details: [{ path: ["userId"], message: "User not found" }],
			});
		}

		return new GetUserDtoOut(
			user.getId(),
			user.getUsername(),
			user.getFirstName(),
			user.getLastName(),
			user.getBirthday(),
			user.getSocial(),
			user.getImageUrl(),
		);
	},
	z.object({
		accessId: id,
		userId: id,
	}),
);
