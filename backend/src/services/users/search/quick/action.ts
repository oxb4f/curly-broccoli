import { makeService } from "../../../make-service";
import {
	QuickSearchDtoIn,
	QuickSearchDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const users = await context.search.searchUsers({
		term: dto.term,
	});

	return QuickSearchDtoOut.create({
		users: users.items.map((user) => ({
			id: user.id,
			username: user.username,
			firstName: user.firstName || null,
			lastName: user.lastName || null,
		})),
		total: users.total,
	});
}, QuickSearchDtoIn);
