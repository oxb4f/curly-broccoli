import z from "zod";
import { User } from "../../../entities/user";
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
		username: dto.username,
		password: dto.password,
		refreshId: dto.refreshId,
		refreshLifetime: context.config.REFRESH_TOKEN_LIFETIME,
		secret: context.config.JWT_SECRET,
		jwtAccessLifetime: context.config.JWT_ACCESS_LIFETIME,
	});

	await context.usersRepository.createFromEntity(user);

	return new CreateUserDtoOut(user.getId(), user.getUsername(), {
		access: jwtAccess,
		refresh: refreshToken,
	});
}

export function factory() {
	return makeService(
		create,
		z.object({
			username: z.string().trim().min(1).max(128).readonly(),
			password: z.string().trim().min(8).max(128).readonly(),
			refreshId: z.string().trim().max(255).readonly(),
		}),
	);
}
