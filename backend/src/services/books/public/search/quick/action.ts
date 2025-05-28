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

	return QuickSearchDtoOut.create({
		books: books.items.map((book) => ({
			id: book.id,
			title: book.title,
			description: book.description || null,
			author: book.author,
			genre: book.genre || null,
		})),
		total: books.total,
	});
}, QuickSearchDtoIn);
