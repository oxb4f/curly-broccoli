import assert from "node:assert/strict";
import { FollowersCreateEvent } from "../../../entities/events/followers/followers-create-event";
import { Follower } from "../../../entities/follower";
import { ServiceError } from "../../errors/error";
import { followersEventsFactory } from "../../events/factories/followers-events";
import { makeService } from "../../make-service";
import { FollowDtoIn, FollowDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const userToFollow = await context.usersRepository.get({
		id: dto.userId,
	});

	if (!userToFollow) {
		ServiceError.throw(ServiceError.ERROR_TYPE.VALIDATION, {
			message: "User not found",
			details: [{ path: ["userId"], message: "User not found" }],
		});
	}

	const existingFollower = await context.followersRepository.get({
		userId: userToFollow.id,
		followerId: getUserDto.id,
	});

	if (existingFollower) {
		ServiceError.throw(ServiceError.ERROR_TYPE.VALIDATION, {
			message: "Already following",
			details: [{ path: ["userId"], message: "Already following" }],
		});
	}

	await followersEventsFactory({
		userId: getUserDto.id,
		context,
		eventGeneratorFn: ({ follower, user }) =>
			new FollowersCreateEvent({
				toUserId: follower.id,
				fromUserId: user.id,
				user: {
					id: userToFollow.id,
					firstName: userToFollow.firstName,
					lastName: userToFollow.lastName,
					username: userToFollow.username,
					imageUrl: userToFollow.imageUrl,
				},
			}),
	});

	const follower = await Follower.from({
		userId: userToFollow.id,
		followerId: getUserDto.id,
	});

	await context.followersRepository.create(follower);

	return FollowDtoOut.create({
		id: follower.getId(),
		userId: follower.getUserId(),
		followerId: follower.getFollowerId(),
	});
}, FollowDtoIn);
