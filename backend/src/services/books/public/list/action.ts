import assert from "node:assert/strict";
import { makeService } from "../../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
    const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const { data, total } = await context.booksRepository.list({
		isAddedByUserId: getUserDto.id,
		limit: dto.limit,
		offset: dto.offset,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
	});

	return ListDtoOut.create({
		books: data.map((book) => ({
			id: book.id,
			title: book.profile.title,
			description: book.profile.description,
			author: book.profile.author,
			genre: book.profile.genre,
			imageUrl: book.profile.imageUrl,
			numberOfPages: book.profile.numberOfPages,
			isbn: book.profile.isbn,
			isPrivateAdded: book.isPrivateAdded,
		})),
		total,
	});
}, ListDtoIn);
