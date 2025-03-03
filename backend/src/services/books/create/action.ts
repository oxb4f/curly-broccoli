import assert from "node:assert";
import { Book } from "../../../entities/book";
import { UserBook } from "../../../entities/userBook";
import { makeService } from "../../make-service";
import { CreateDtoIn, CreateDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const user = await context.usersRepository.getUser({
		accessId: dto.accessId,
	});

	assert(user, "User not found");

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

	await context.booksRepository.createFromEntity(book);

	const userBook = await UserBook.from({
		book,
		user,
	});

	await context.userBooksRepository.createFromEntity(userBook);

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
