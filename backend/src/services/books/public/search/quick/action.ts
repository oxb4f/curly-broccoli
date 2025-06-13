import { makeService } from "../../../../make-service";
import {
	type InShape,
	type OutShape,
	QuickSearchDtoIn,
	QuickSearchDtoOut,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const books = await context.search.searchBooks({
		term: dto.term,
	});

	const bookIdToImageUrlMap =
		await context.booksRepository.getImagesUrlByBookIds(
			books.items.map((book) => Number(book.id)),
		);

	const booksWithImageUrl = books.items.map((book) => ({
		id: book.id,
		title: book.title,
		description: book.description || null,
		author: book.author,
		genre: book.genre || null,
		isbn: book.isbn || null,
		imageUrl: bookIdToImageUrlMap[book.id],
	}));

	return QuickSearchDtoOut.create({
		books: booksWithImageUrl,
		total: books.total,
	});
}, QuickSearchDtoIn);
