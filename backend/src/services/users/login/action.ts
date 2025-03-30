import assert from "node:assert/strict";
import { User } from "../../../entities/user";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import { type InShape, LoginDtoIn, LoginDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		username: dto.username,
	});

	if (!getUserDto) {
		ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
			message: "User not found",
			details: [{ path: ["username"], message: "Username does not exist" }],
		});
	}

	const user = await User.from(getUserDto);

	const loginResult = await user.login({
		password: dto.password,
		refreshId: dto.refreshId,
		refreshLifetime: context.config.REFRESH_TOKEN_LIFETIME,
		secret: context.config.JWT_SECRET,
		jwtAccessLifetime: context.config.JWT_ACCESS_LIFETIME,
	});

	if (!(loginResult.jwtAccess && loginResult.refreshToken)) {
		ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
			message: "Invalid password",
			details: [{ path: ["password"], message: "Invalid password" }],
		});
	}

	const access = user.getAcesss();

	assert(access, "Acesss must exist");

	await context.usersRepository.update(
		{
			id: user.getId(),
		},
		{
			access: {
				refreshTokens: Object.fromEntries(access.getRefreshTokens().entries()),
			},
		},
	);

	return LoginDtoOut.create({
		id: user.getId(),
		username: user.getUsername(),
		firstName: user.getFirstName(),
		lastName: user.getLastName(),
		birthday: user.getBirthday(),
		social: user.getSocial(),
		accessId: access.getId(),
		jwt: {
			access: loginResult.jwtAccess,
			refresh: loginResult.refreshToken,
		},
	});
}, LoginDtoIn);
