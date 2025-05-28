import { makeService } from "../../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const { data, total } = await context.userBooksRepository.list({
        genre: dto.genre as string[],
        author: dto.author as string[],
        numberOfPagesMin: dto.numberOfPagesMin,
        numberOfPagesMax: dto.numberOfPagesMax,
        isRead: dto.isRead,
        isFavorite: dto.isFavorite,
		limit: dto.limit,
		offset: dto.offset,
		userId: dto.userId,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
		checkIsReadingTrackerStarted: true,
	});

	return ListDtoOut.create({
		books: data.map((userBook) => ({
			id: userBook.id,
			isFavorite: userBook.isFavorite,
			isRead: userBook.isRead,
			rating: userBook.rating,
			review: userBook.review,
			title: userBook.profile.title,
			description: userBook.profile.description,
			author: userBook.profile.author,
			genre: userBook.profile.genre,
			imageUrl: userBook.profile.imageUrl,
			numberOfPages: userBook.profile.numberOfPages,
			isbn: userBook.profile.isbn,
			isReadingTrackerStarted: userBook.isReadingTrackerStarted,
            userId: userBook.userId,
		})),
		total,
	});
}, ListDtoIn);
