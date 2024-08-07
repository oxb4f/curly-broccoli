import assert from "node:assert/strict";
import z from "zod";
import type { Context } from "../../context";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { LoginDtoIn } from "./dto.in";
import { LoginDtoOut } from "./dto.out";

async function login({
	dto,
	context,
}: {
	dto: LoginDtoIn;
	context: Context;
}) {
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

	return new LoginDtoOut(user.getId(), user.getUsername(), access.getId(), {
		access: loginResult.jwtAccess,
		refresh: loginResult.refreshToken,
	});
}

export function factory() {
	return makeService(
		login,
		z.object({
			username: z.string().trim().min(1).max(128),
			password: z.string().trim().min(8).max(128),
			refreshId: z.string().trim().max(255),
		}),
	);
}
