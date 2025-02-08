import z from "zod";
import { id, username } from "../../common/validation/schema";
import type { Context } from "../../context";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { UpdateUserDtoIn } from "./dto.in";
import { UpdateUserDtoOut } from "./dto.out";

async function update({
	dto,
	context,
}: {
	dto: UpdateUserDtoIn;
	context: Context;
}) {
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

	if (dto.username) {
		const isUsersWithSameUsernameExist = await context.usersRepository.exists({
			username: dto.username,
			notId: user.getId(),
		});

		if (isUsersWithSameUsernameExist) {
			ServiceError.throw(ServiceError.ERROR_TYPE.DUPLICATED, {
				message: "User not found",
				details: [
					{
						path: ["username"],
						message: "User already exists with this username",
					},
				],
			});
		}
	}

	await user.update(dto);

	await context.usersRepository.updateFromEntity(user);

	return new UpdateUserDtoOut(
		user.getId(),
		user.getUsername(),
		user.getFirstName(),
		user.getLastName(),
		user.getBirthday(),
		user.getSocial(),
		user.getImageUrl(),
	);
}

export function factory() {
	return makeService(
		update,
		z.object({
			accessId: id,
			userId: id,
			username: username.optional(),
			firstName: z.string().trim().min(1).max(255).optional().nullable(),
			lastName: z.string().trim().min(1).max(255).optional().nullable(),
			birthday: z.coerce.date().optional().nullable(),
			social: z
				.object({
					telegram: z.string().trim().url().optional().nullable(),
					instagram: z.string().trim().url().optional().nullable(),
				})
				.optional(),
			imageUrl: z.string().trim().url().optional().nullable(),
		}),
	);
}
