import {
	type SQL,
	and,
	asc,
	count,
	eq,
	gte,
	inArray,
	lte,
	max,
	min,
	sql,
} from "drizzle-orm";
import type { Author, Genre } from "../../../../entities/book-profile";
import type { UserBook } from "../../../../entities/userBook";
import type {
	FiltersDto,
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
		const where = this.transformObjectIntoEqSequence(filter, userBooks);

		if (!where.length) return null;

		const query = this._connection
			.select()
			.from(userBooks)
			.innerJoin(bookProfiles, eq(userBooks.bookProfileId, bookProfiles.id))
			.where(and(...where))
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
			userId: result[0].user_books.userId,
		};
	}

	async list(filter: ListUserBookFilter) {
		const total = await this.getTotal(filter);

		let data: UserBooksListDto["data"] = [];

		if (!total) return { data, total };

		const filters = this.applyFilters(filter);

		const query = this._connection
			.select({
				user_books: userBooks,
				book_profiles: bookProfiles,
				...(filter.checkIsReadingTrackerStarted && {
					isReadingTrackerStarted: sql<boolean>`EXISTS (
                            SELECT 1
                            FROM reading_trackers
                            WHERE reading_trackers.user_book_id = user_books.id
                            AND reading_trackers.state IN ('paused', 'reading')
                        )`,
				}),
			})
			.from(userBooks)
			.innerJoin(bookProfiles, and(...filters.bookProfilesInnerJoinOn))
			.$dynamic();

		if (filters.where.length) {
			query.where(and(...filters.where));
		}

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(
			query,
			[userBooks, bookProfiles],
			filter.orderDirection,
			filter.orderField,
		);

		const result = await query.execute();

		data = result.map((row) => {
			return {
				id: row.user_books.id,
				isFavorite: row.user_books.isFavorite,
				isRead: row.user_books.isRead,
				rating: row.user_books.rating,
				review: row.user_books.review,
				isReadingTrackerStarted: row.isReadingTrackerStarted ?? false,
				profile: {
					title: row.book_profiles.title,
					description: row.book_profiles.description,
					author: row.book_profiles.author,
					genre: row.book_profiles.genre,
					imageUrl: row.book_profiles.imageUrl,
					numberOfPages: row.book_profiles.numberOfPages,
					isbn: row.book_profiles.isbn,
				},
				userId: row.user_books.userId,
			};
		});

		return {
			data,
			total,
		};
	}

	private async getTotal(filter: ListUserBookFilter) {
		const query = this._connection
			.select({ total: count() })
			.from(userBooks)
			.$dynamic();

		const filters = this.applyFilters(filter);

		if (filters.where.length) {
			query.where(and(...filters.where));
		}

		if (filters.bookProfilesInnerJoinOn.length) {
			query.innerJoin(bookProfiles, and(...filters.bookProfilesInnerJoinOn));
		}

		const result = await query.execute();

		return result[0]?.total ?? 0;
	}

	private applyFilters(filter: ListUserBookFilter) {
		const filters = {
			where: [] as SQL[],
			bookProfilesInnerJoinOn: [
				eq(bookProfiles.id, userBooks.bookProfileId),
			] as SQL<unknown>[],
		};

		if (typeof filter.isRead === "boolean") {
			filters.where.push(eq(userBooks.isRead, filter.isRead));
		}

		if (typeof filter.isFavorite === "boolean") {
			filters.where.push(eq(userBooks.isFavorite, filter.isFavorite));
		}

		if (filter.userId) {
			filters.where.push(eq(userBooks.userId, filter.userId));
		}

		if (filter.genre?.length) {
			filters.bookProfilesInnerJoinOn.push(
				inArray(bookProfiles.genre, filter.genre as string[]),
			);
		}

		if (filter.author?.length) {
			filters.bookProfilesInnerJoinOn.push(
				inArray(bookProfiles.author, filter.author),
			);
		}

		if (filter.numberOfPagesMin) {
			filters.bookProfilesInnerJoinOn.push(
				gte(bookProfiles.numberOfPages, filter.numberOfPagesMin),
			);
		}

		if (filter.numberOfPagesMax) {
			filters.bookProfilesInnerJoinOn.push(
				lte(bookProfiles.numberOfPages, filter.numberOfPagesMax),
			);
		}

		return filters;
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

			if (!filter.id) return;

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

	async delete(filter: GetUserBookFilter) {
		if (!filter.id) return;

		const result = await this._connection
			.delete(userBooks)
			.where(eq(userBooks.id, filter.id))
			.returning({
				bookProfileId: userBooks.bookProfileId,
			})
			.execute();

		if (result?.[0]?.bookProfileId) {
			await this._connection
				.delete(bookProfiles)
				.where(eq(bookProfiles.id, result[0].bookProfileId))
				.execute();
		}
	}

	async getFilters(filter: GetUserBookFilter): Promise<FiltersDto> {
		if (!filter.userId) {
			return {
				genres: [],
				authors: [],
				numberOfPagesMin: 0,
				numberOfPagesMax: 0,
				total: 0,
			};
		}

		const distinctGenres = await this._connection
			.select({
				genres: sql<
					Genre[]
				>`DISTINCT ON (book_profiles.genre) book_profiles.genre`,
			})
			.from(userBooks)
			.innerJoin(bookProfiles, eq(userBooks.bookProfileId, bookProfiles.id))
			.where(eq(userBooks.userId, filter.userId))
			.orderBy(asc(bookProfiles.genre))
			.execute();

		const distinctAuthors = await this._connection
			.select({
				authors: sql<
					Author[]
				>`DISTINCT ON (book_profiles.author) book_profiles.author`,
			})
			.from(userBooks)
			.innerJoin(bookProfiles, eq(userBooks.bookProfileId, bookProfiles.id))
			.where(eq(userBooks.userId, filter.userId))
			.orderBy(asc(bookProfiles.author))
			.execute();

		const numberOfPages = await this._connection
			.select({
				minNumberOfPages: min(bookProfiles.numberOfPages),
				maxNumberOfPages: max(bookProfiles.numberOfPages),
			})
			.from(userBooks)
			.innerJoin(bookProfiles, eq(userBooks.bookProfileId, bookProfiles.id))
			.where(eq(userBooks.userId, filter.userId))
			.execute();

		const total = await this._connection
			.select({
				total: count(),
			})
			.from(userBooks)
			.where(eq(userBooks.userId, filter.userId))
			.execute();

		return {
			genres: distinctGenres.flatMap((row) => row.genres),
			authors: distinctAuthors.flatMap((row) => row.authors),
			numberOfPagesMin: numberOfPages[0]?.minNumberOfPages ?? 0,
			numberOfPagesMax: numberOfPages[0]?.maxNumberOfPages ?? 0,
			total: total[0]?.total ?? 0,
		};
	}
}
