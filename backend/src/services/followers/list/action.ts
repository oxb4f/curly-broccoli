import { makeService } from "../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const followers = await context.followersRepository.list({
		...(dto.type === "followers" && {
			userId: dto.userId,
		}),
		...(dto.type === "following" && {
			followerId: dto.userId,
		}),
		limit: dto.limit,
		offset: dto.offset,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
	});

	return ListDtoOut.create({
		data: followers.data.map((follower) => ({
			id: follower.id,
			user: follower.user,
			follower: follower.follower,
			createdAt: follower.createdAt,
			updatedAt: follower.updatedAt,
		})),
		total: followers.total,
	});
}, ListDtoIn);
