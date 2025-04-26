import assert from "node:assert/strict";
import { Follower } from "../../../entities/follower";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import { FollowDtoIn, FollowDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const existingFollower = await context.followersRepository.get({
		userId: dto.userId,
		followerId: getUserDto.id,
	});

	if (existingFollower) {
		ServiceError.throw(ServiceError.ERROR_TYPE.VALIDATION, {
			message: "Already following",
			details: [{ path: ["userId"], message: "Already following" }],
		});
	}

	const follower = await Follower.from({
		userId: dto.userId,
		followerId: getUserDto.id,
	});

	await context.followersRepository.create(follower);

	return FollowDtoOut.create({
		id: follower.getId(),
		userId: follower.getUserId(),
		followerId: follower.getFollowerId(),
	});
}, FollowDtoIn);
