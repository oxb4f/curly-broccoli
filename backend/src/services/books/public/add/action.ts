import assert from "node:assert";
import { Book } from "../../../../entities/book";
import { BookProfile } from "../../../../entities/book-profile";
import { UserBooksAddEvent } from "../../../../entities/events/user-books/user-books-add-event";
import { User } from "../../../../entities/user";
import { UserBook } from "../../../../entities/userBook";
import { ServiceError } from "../../../errors/error";
import { followersEventsFactory } from "../../../events/factories/followers-events";
import { makeService } from "../../../make-service";
import { AddDtoIn, AddDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const existingUserBook = await context.userBooksRepository.get({
		userId: getUserDto.id,
		bookId: dto.bookId,
	});

	if (existingUserBook) {
		ServiceError.throw(ServiceError.ERROR_TYPE.DUPLICATED, {
			message: "Book already added",
			details: [{ path: ["bookId"], message: "Book already added" }],
		});
	}

	const book = await context.booksRepository.get({ id: dto.bookId });

	if (!book) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Book not found",
			details: [{ path: ["bookId"], message: "Book not found" }],
		});
	}

	const bookProfile = await BookProfile.from(book.profile);

	const userBook = await UserBook.from({
		book: await Book.from({
			id: book.id,
			isPublic: book.isPublic,
			profile: bookProfile,
		}),
		user: await User.from(getUserDto),
	});

	await followersEventsFactory({
		userId: getUserDto.id,
		context,
		eventGeneratorFn: ({ follower, user }) =>
			new UserBooksAddEvent({
				toUserId: follower.id,
				fromUserId: user.id,
				profile: {
					title: bookProfile.getTitle(),
					imageUrl: bookProfile.getImageUrl(),
				},
				userBookId: userBook.getId(),
			}),
	});

	await context.userBooksRepository.create(userBook);

	return AddDtoOut.create({
		id: userBook.getId(),
		title: bookProfile.getTitle(),
		description: bookProfile.getDescription(),
		author: bookProfile.getAuthor(),
		genre: bookProfile.getGenre(),
		imageUrl: bookProfile.getImageUrl(),
		numberOfPages: bookProfile.getNumberOfPages(),
		isbn: bookProfile.getIsbn(),
	});
}, AddDtoIn);
