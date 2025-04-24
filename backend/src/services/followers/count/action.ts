import { makeService } from "../../make-service";
import { CountDtoIn, CountDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const followers = await context.followersRepository.count({
		userId: dto.userId,
		followerId: dto.userId,
	});

	return CountDtoOut.create({
		followersCount: followers.followersCount,
		followingCount: followers.followingCount,
	});
}, CountDtoIn);
