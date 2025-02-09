import assert from "node:assert/strict";
import z from "zod";
import { password, refreshId, username } from "../../common/validation/schema";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { LoginDtoIn } from "./dto.in";
import { LoginDtoOut } from "./dto.out";

export default makeService<LoginDtoIn, LoginDtoOut>(
	async ({ dto, context }) => {
		const user = await context.usersRepository.getUser({
			username: dto.username,
		});

		if (!user) {
			ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
				message: "User not found",
				details: [{ path: ["username"], message: "Username does not exist" }],
			});
		}

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

		await context.usersRepository.updateFromEntity(user);

		const access = user.getAcesss();

		assert(access, "Acesss must exist");

		return new LoginDtoOut(
			user.getId(),
			user.getUsername(),
			user.getFirstName(),
			user.getLastName(),
			user.getBirthday(),
			user.getSocial(),
			access.getId(),
			{
				access: loginResult.jwtAccess,
				refresh: loginResult.refreshToken,
			},
		);
	},
	z.object({ username, password, refreshId }),
);
