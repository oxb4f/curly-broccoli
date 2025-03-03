import { ServiceError } from "../../../errors/error";
import { makeService } from "../../../make-service";
import { GetDtoIn, GetDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const book = await context.booksRepository.get({
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
		title: book.profile.title,
		description: book.profile.description,
		author: book.profile.author,
		genre: book.profile.genre,
		imageUrl: book.profile.imageUrl,
		numberOfPages: book.profile.numberOfPages,
		isbn: book.profile.isbn,
	});
}, GetDtoIn);
