import assert from "node:assert";
import { Book } from "../../../entities/book";
import { User } from "../../../entities/user";
import { UserBook } from "../../../entities/userBook";
import { makeService } from "../../make-service";
import { CreateDtoIn, CreateDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

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

	await context.userBooksRepository.create(userBook);

	const profile = book.getProfile();

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
