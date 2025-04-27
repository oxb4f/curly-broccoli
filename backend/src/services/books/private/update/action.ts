import assert from "node:assert";
import { BookProfile } from "../../../../entities/book-profile";
import { UserBook } from "../../../../entities/userBook";
import { ServiceError } from "../../../errors/error";
import { makeService } from "../../../make-service";
import { type InShape, type OutShape, UpdateDtoIn, UpdateDtoOut } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const data = await context.userBooksRepository.get({
		id: dto.bookId,
		userId: getUserDto.id,
	});

	if (!data) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Book not found",
			details: [{ path: ["bookId"], message: "Book not found" }],
		});
	}

	const userBook = await UserBook.from({
		...data,
		profile: await BookProfile.from({
			...data.profile,
			id: data.profile.id,
		}),
	});

	await userBook.update({
		isRead: dto.isRead,
		isFavorite: dto.isFavorite,
		rating: dto.rating,
		review: dto.review,
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

	await context.userBooksRepository.update(
		{
			id: userBook.getId(),
		},
		{
			isRead: userBook.getIsRead(),
			isFavorite: userBook.getIsFavorite(),
			rating: userBook.getRating(),
			review: userBook.getReview(),
			...(userBook.getProfile()?.getId() && {
				profile: {
					id: userBook.getProfile()!.getId(),
					title: userBook.getProfile()!.getTitle(),
					description: userBook.getProfile()!.getDescription(),
					author: userBook.getProfile()!.getAuthor(),
					genre: userBook.getProfile()!.getGenre(),
					imageUrl: userBook.getProfile()!.getImageUrl(),
					numberOfPages: userBook.getProfile()!.getNumberOfPages(),
					isbn: userBook.getProfile()!.getIsbn(),
				},
			}),
		},
	);

	return UpdateDtoOut.create({
		id: userBook.getId(),
		isFavorite: userBook.getIsFavorite(),
		isRead: userBook.getIsRead(),
		rating: userBook.getRating(),
		review: userBook.getReview(),
		title: userBook.getProfile()!.getTitle(),
		description: userBook.getProfile()!.getDescription(),
		author: userBook.getProfile()!.getAuthor(),
		genre: userBook.getProfile()!.getGenre(),
		imageUrl: userBook.getProfile()!.getImageUrl(),
		numberOfPages: userBook.getProfile()!.getNumberOfPages(),
		isbn: userBook.getProfile()!.getIsbn(),
	});
}, UpdateDtoIn);
