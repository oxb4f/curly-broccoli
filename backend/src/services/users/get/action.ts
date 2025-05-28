import assert from "node:assert";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	GetUserDtoIn,
	GetUserDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const selfUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(selfUserDto, "User not found");

	const getUserDto = await context.usersRepository.get({
		id: dto.userId,
		...(selfUserDto.id !== dto.userId && {
			followedByUserId: selfUserDto.id,
		}),
	});

	if (!getUserDto) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "User not found",
			details: [{ path: ["userId"], message: "User not found" }],
		});
	}

	return GetUserDtoOut.create({
		id: getUserDto.id,
		username: getUserDto.username,
		firstName: getUserDto.firstName,
		lastName: getUserDto.lastName,
		birthday: getUserDto.birthday,
		social: getUserDto.social,
		imageUrl: getUserDto.imageUrl,
		followed: getUserDto.followed ?? null,
		followersId: getUserDto.followersId ?? null,
		numberOfReadBooks: getUserDto.numberOfReadBooks,
		numberOfFollowing: getUserDto.numberOfFollowing,
		numberOfFollowers: getUserDto.numberOfFollowers,
	});
}, GetUserDtoIn);
