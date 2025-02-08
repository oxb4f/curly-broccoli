import assert from "node:assert/strict";
import z from "zod";
import { User } from "../../../entities/user";
import { password, refreshId, username } from "../../common/validation/schema";
import type { Context } from "../../context";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { CreateUserDtoIn } from "./dto.in";
import { CreateUserDtoOut } from "./dto.out";

async function create({
	dto,
	context,
}: {
	dto: CreateUserDtoIn;
	context: Context;
}) {
	const isUsersWithSameUsernameExist = await context.usersRepository.exists({
		username: dto.username,
	});

	if (isUsersWithSameUsernameExist) {
		ServiceError.throw(ServiceError.ERROR_TYPE.DUPLICATED, {
			message: "User with this username already exists",
			details: [
				{
					path: ["username"],
					message: "Not unique",
				},
			],
		});
	}

	const [user, jwtAccess, refreshToken] = await User.fromCredentials({
		imageUrl: null,
		firstName: null,
		lastName: null,
		birthday: null,
		social: {},
		username: dto.username,
		password: dto.password,
		refreshId: dto.refreshId,
		refreshLifetime: context.config.REFRESH_TOKEN_LIFETIME,
		secret: context.config.JWT_SECRET,
		jwtAccessLifetime: context.config.JWT_ACCESS_LIFETIME,
	});

	await context.usersRepository.createFromEntity(user);

	const access = user.getAcesss();

	assert(access, "Assert must be created");

	return new CreateUserDtoOut(
		user.getId(),
		user.getUsername(),
		user.getFirstName(),
		user.getLastName(),
		user.getBirthday(),
		user.getSocial(),
		user.getImageUrl(),
		access.getId(),
		{
			access: jwtAccess,
			refresh: refreshToken,
		},
	);
}

export function factory() {
	return makeService(create, z.object({ username, password, refreshId }));
}
