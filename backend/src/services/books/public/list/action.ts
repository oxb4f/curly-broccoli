import { makeService } from "../../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const { data, total } = await context.booksRepository.list({
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
		})),
		total,
	});
}, ListDtoIn);
