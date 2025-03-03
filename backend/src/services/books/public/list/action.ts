import { makeService } from "../../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const { data, total } = await context.booksRepository.list({
		limit: dto.limit ?? 10,
		offset: dto.offset ?? 0,
	});

	return ListDtoOut.create({
		books: data.map((book) => ({
			id: book.getId(),
			title: book.getProfile().getTitle(),
			description: book.getProfile().getDescription(),
			author: book.getProfile().getAuthor(),
			genre: book.getProfile().getGenre(),
			imageUrl: book.getProfile().getImageUrl(),
			numberOfPages: book.getProfile().getNumberOfPages(),
			isbn: book.getProfile().getIsbn(),
		})),
		total,
	});
}, ListDtoIn);
