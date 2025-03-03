import { ServiceError } from "../../../errors/error";
import { makeService } from "../../../make-service";
import { GetDtoIn, GetDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const userBook = await context.userBooksRepository.get({
		id: dto.bookId,
	});

	if (!userBook) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Book not found",
			details: [{ path: ["bookId"], message: "Book not found" }],
		});
	}

	return GetDtoOut.create({
		id: userBook.id,
		isFavorite: userBook.isFavorite,
		rating: userBook.rating,
		review: userBook.review,
		title: userBook.profile.title,
		description: userBook.profile.description,
		author: userBook.profile.author,
		genre: userBook.profile.genre,
		imageUrl: userBook.profile.imageUrl,
		numberOfPages: userBook.profile.numberOfPages,
		isbn: userBook.profile.isbn,
		isRead: userBook.isRead,
	});
}, GetDtoIn);
