import assert from "node:assert";
import { makeService } from "../../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const { data, total } = await context.userBooksRepository.list({
		limit: dto.limit,
		offset: dto.offset,
		userId: getUserDto.id,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
	});

	return ListDtoOut.create({
		books: data.map((userBook) => ({
			id: userBook.id,
			isFavorite: userBook.isFavorite,
			isRead: userBook.isRead,
			rating: userBook.rating,
			review: userBook.review,
			title: userBook.profile.title,
			description: userBook.profile.description,
			author: userBook.profile.author,
			genre: userBook.profile.genre,
			imageUrl: userBook.profile.imageUrl,
			numberOfPages: userBook.profile.numberOfPages,
			isbn: userBook.profile.isbn,
		})),
		total,
	});
}, ListDtoIn);
