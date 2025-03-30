import { count, eq } from "drizzle-orm";
import type { UserBook } from "../../../../entities/userBook";
import type {
	GetUserBookFilter,
	ListUserBookFilter,
	UserBookUpdateData,
	UserBooksListDto,
	UserBooksRepository,
} from "../../../../services/books/repository";
import { bookProfiles, userBooks, users } from "../schema";
import { BaseRepository } from "./base";

export type SelectUserBook = typeof userBooks.$inferSelect;

export class PgUserBooksRepository
	extends BaseRepository
	implements UserBooksRepository
{
	async get(filter: GetUserBookFilter) {
		const query = this._connection
			.select()
			.from(userBooks)
			.innerJoin(bookProfiles, eq(userBooks.bookProfileId, bookProfiles.id))
			.where(eq(userBooks.id, filter.id))
			.limit(1);

		if (filter.userId) {
			query.innerJoin(users, eq(userBooks.userId, users.id));
		}

		const result = await query.execute();

		if (!result?.[0]) {
			return null;
		}

		return {
			id: result[0].user_books.id,
			isFavorite: result[0].user_books.isFavorite,
			rating: result[0].user_books.rating,
			review: result[0].user_books.review,
			profile: {
				id: result[0].book_profiles.id,
				title: result[0].book_profiles.title,
				description: result[0].book_profiles.description,
				author: result[0].book_profiles.author,
				genre: result[0].book_profiles.genre,
				imageUrl: result[0].book_profiles.imageUrl,
				numberOfPages: result[0].book_profiles.numberOfPages,
				isbn: result[0].book_profiles.isbn,
			},
			isRead: result[0].user_books.isRead,
		};
	}

	async list(filter: ListUserBookFilter) {
		const result = await this._connection
			.select({ total: count() })
			.from(userBooks)
			.where(eq(userBooks.userId, filter.userId));

		const total = result[0]?.total ?? 0;
		let data: UserBooksListDto["data"] = [];

		if (total) {
			const result = await this._connection
				.select()
				.from(userBooks)
				.innerJoin(bookProfiles, eq(userBooks.bookProfileId, bookProfiles.id))
				.where(eq(userBooks.userId, filter.userId))
				.limit(filter.limit)
				.offset(filter.offset);

			data = result.map((row) => {
				return {
					id: row.user_books.id,
					isFavorite: row.user_books.isFavorite,
					isRead: row.user_books.isRead,
					rating: row.user_books.rating,
					review: row.user_books.review,
					profile: {
						title: row.book_profiles.title,
						description: row.book_profiles.description,
						author: row.book_profiles.author,
						genre: row.book_profiles.genre,
						imageUrl: row.book_profiles.imageUrl,
						numberOfPages: row.book_profiles.numberOfPages,
						isbn: row.book_profiles.isbn,
					},
				};
			});
		}

		return {
			data,
			total,
		};
	}

	async create(userBook: UserBook) {
		await this._connection.transaction(async (tx) => {
			const profile = userBook.getProfile();
			const bookId = userBook.getBook()?.getId();
			const userId = userBook.getUser()?.getId();

			if (profile) {
				await tx
					.insert(bookProfiles)
					.values({
						id: profile.getId(),
						title: profile.getTitle(),
						description: profile.getDescription(),
						author: profile.getAuthor(),
						genre: profile.getGenre(),
						numberOfPages: profile.getNumberOfPages(),
						isbn: profile.getIsbn(),
						imageUrl: profile.getImageUrl(),
					})
					.execute();
			}

			if (bookId && userId && profile) {
				await tx
					.insert(userBooks)
					.values({
						id: userBook.getId(),
						bookId,
						userId,
						bookProfileId: profile.getId(),
						isFavorite: userBook.getIsFavorite(),
						rating: userBook.getRating(),
						review: userBook.getReview(),
						isRead: userBook.getIsRead(),
					})
					.execute();
			}
		});
	}

	async update(filter: GetUserBookFilter, userBook: UserBookUpdateData) {
		await this._connection.transaction(async (tx) => {
			const profile = userBook.profile;

			if (profile) {
				await tx
					.update(bookProfiles)
					.set({
						title: profile.title,
						description: profile.description,
						author: profile.author,
						genre: profile.genre,
						numberOfPages: profile.numberOfPages,
						isbn: profile.isbn,
						imageUrl: profile.imageUrl,
					})
					.where(eq(bookProfiles.id, profile.id))
					.execute();
			}

			await tx
				.update(userBooks)
				.set({
					isFavorite: userBook.isFavorite,
					rating: userBook.rating,
					review: userBook.review,
					isRead: userBook.isRead,
				})
				.where(eq(userBooks.id, filter.id))
				.execute();
		});
	}
}
