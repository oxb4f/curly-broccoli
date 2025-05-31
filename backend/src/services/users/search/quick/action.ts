import { makeService } from "../../../make-service";
import {
	type InShape,
	type OutShape,
	QuickSearchDtoIn,
	QuickSearchDtoOut,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const users = await context.search.searchUsers({
		term: dto.term,
	});

	const userIdToImageUrlMap =
		await context.usersRepository.getImagesUrlByUserIds(
			users.items.map((user) => Number(user.id)),
		);

	const usersWithImageUrl = users.items.map((user) => {
		return {
			id: user.id,
			username: user.username,
			firstName: user.firstName || null,
			lastName: user.lastName || null,
			imageUrl: userIdToImageUrlMap[user.id],
		};
	});

	return QuickSearchDtoOut.create({
		users: usersWithImageUrl,
		total: users.total,
	});
}, QuickSearchDtoIn);
