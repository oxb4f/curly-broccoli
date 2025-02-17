import assert from "node:assert/strict";
import { User } from "../../../entities/user";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	CreateUserDtoIn,
	CreateUserDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
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

	return CreateUserDtoOut.create({
		id: user.getId(),
		username: user.getUsername(),
		firstName: user.getFirstName(),
		lastName: user.getLastName(),
		birthday: user.getBirthday(),
		social: user.getSocial(),
		imageUrl: user.getImageUrl(),
		accessId: access.getId(),
		jwt: {
			access: jwtAccess,
			refresh: refreshToken,
		},
	});
}, CreateUserDtoIn);
