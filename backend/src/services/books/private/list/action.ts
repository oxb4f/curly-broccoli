import assert from "node:assert";
import { makeService } from "../../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const user = await context.usersRepository.getUser({
		accessId: dto.accessId,
	});

	assert(user, "User not found");

	const { data, total } = await context.userBooksRepository.list({
		limit: dto.limit ?? 10,
		offset: dto.offset ?? 0,
		userId: user.getId(),
	});

	return ListDtoOut.create({
		books: data.map((userBook) => ({
			id: userBook.id,
			isFavorite: userBook.isFavorite,
			rating: userBook.rating,
			review: userBook.review,
			title: userBook.title,
			description: userBook.description,
			author: userBook.author,
			genre: userBook.genre,
			imageUrl: userBook.imageUrl,
			numberOfPages: userBook.numberOfPages,
			isbn: userBook.isbn,
		})),
		total,
	});
}, ListDtoIn);
