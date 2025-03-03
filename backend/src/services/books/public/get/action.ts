import { ServiceError } from "../../../errors/error";
import { makeService } from "../../../make-service";
import { GetDtoIn, GetDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const book = await context.booksRepository.getBook({
		id: dto.bookId,
	});

	if (!book) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Book not found",
			details: [{ path: ["bookId"], message: "Book not found" }],
		});
	}

	return GetDtoOut.create({
		id: book.id,
		title: book.title,
		description: book.description,
		author: book.author,
		genre: book.genre,
		imageUrl: book.imageUrl,
		numberOfPages: book.numberOfPages,
		isbn: book.isbn,
	});
}, GetDtoIn);
