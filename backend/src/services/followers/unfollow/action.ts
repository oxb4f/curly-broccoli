import assert from "node:assert/strict";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	type InShape,
	type OutShape,
	UnfollowDtoIn,
	UnfollowDtoOut,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const existingFollower = await context.followersRepository.get({
		id: dto.id,
	});

	if (
		!(
			existingFollower?.followerId === getUserDto.id ||
			existingFollower?.userId === getUserDto.id
		)
	) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Cannot unfollow user due to invalid id",
			details: [
				{ path: ["id"], message: "Cannot unfollow user due to invalid id" },
			],
		});
	}

	await context.followersRepository.delete({ id: dto.id });

	return UnfollowDtoOut.create({ result: true });
}, UnfollowDtoIn);
