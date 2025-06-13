import assert from "node:assert";
import { Book } from "../../../entities/book";
import { UserBooksAddEvent } from "../../../entities/events/user-books/user-books-add-event";
import { User } from "../../../entities/user";
import { UserBook } from "../../../entities/userBook";
import { ServiceError } from "../../errors/error";
import { followersEventsFactory } from "../../events/factories/followers-events";
import { makeService } from "../../make-service";
import { CreateDtoIn, CreateDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	if (dto.isbn && context.config.FEATURE_FLAG_STRICT_ISBN_CHECK) {
		const isBookWithSameIsbnExists = await context.booksRepository.exists({
			isbn: dto.isbn,
		});

		if (isBookWithSameIsbnExists) {
			ServiceError.throw(ServiceError.ERROR_TYPE.DUPLICATED, {
				message: "Book with this ISBN already exists",
				details: [
					{
						path: ["isbn"],
						message: "Not unique",
					},
				],
			});
		}
	}

	const book = await Book.fromProfileData({
		// TODO(oxb4f): remove this once we have a way to create private books
		isPublic: true,
		profile: {
			title: dto.title,
			description: dto.description,
			author: dto.author,
			genre: dto.genre,
			imageUrl: dto.imageUrl,
			numberOfPages: dto.numberOfPages,
			isbn: dto.isbn,
		},
	});

	await context.booksRepository.create(book);

	const userBook = await UserBook.from({
		book,
		user: await User.from(getUserDto),
	});

	const profile = book.getProfile();

	await followersEventsFactory({
		userId: getUserDto.id,
		context,
		eventGeneratorFn: ({ follower, user }) =>
			new UserBooksAddEvent({
				toUserId: follower.id,
				fromUserId: user.id,
				profile: {
					title: profile.getTitle(),
					imageUrl: profile.getImageUrl(),
					description: profile.getDescription(),
				},
				userBookId: userBook.getId(),
			}),
	});

	await context.userBooksRepository.create(userBook);

	await context.search.indexBook({
		bookId: String(book.getId()),
		title: profile.getTitle(),
		author: profile.getAuthor(),
		description: profile.getDescription() ?? "",
		isbn: profile.getIsbn() ?? "",
		genre: profile.getGenre() ?? "",
	});

	return CreateDtoOut.create({
		id: book.getId(),
		title: profile.getTitle(),
		description: profile.getDescription(),
		author: profile.getAuthor(),
		genre: profile.getGenre(),
		imageUrl: profile.getImageUrl(),
		numberOfPages: profile.getNumberOfPages(),
		isbn: profile.getIsbn(),
	});
}, CreateDtoIn);
