import assert from "node:assert/strict";
import { makeService } from "../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const listDto = await context.usersRepository.list({
		notId: dto.notId,
		followedByUserId: getUserDto.id,
		limit: dto.limit,
		offset: dto.offset,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
	});

	console.log(listDto);

	return ListDtoOut.create({
		users: listDto.data.map((user) => ({
			id: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			birthday: user.birthday,
			social: user.social,
			imageUrl: user.imageUrl,
			followed: user.followed,
		})),
		total: listDto.total,
	});
}, ListDtoIn);
