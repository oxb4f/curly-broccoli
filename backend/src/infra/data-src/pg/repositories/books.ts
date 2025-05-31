import {
	and,
	asc,
	count,
	countDistinct,
	eq,
	gte,
	inArray,
	isNotNull,
	lte,
	max,
	min,
	sql,
} from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import type { Book } from "../../../../entities/book";
import type { ImageUrl } from "../../../../entities/book-profile";
import type { Id } from "../../../../entities/types/id";
import type {
	BookUpdateData,
	BooksListDto,
	BooksRepository,
	FiltersDto,
	GetBookFilter,
	ListBookFilter,
} from "../../../../services/books/repository";
import { bookProfiles, books } from "../schema";
import { BaseRepository } from "./base";

export type SelectBook = typeof books.$inferSelect;

export class PgBooksRepository
	extends BaseRepository
	implements BooksRepository
{
	async getImagesUrlByBookIds(
		bookIds: Id[],
	): Promise<{ [key: string]: ImageUrl }> {
		const result = await this._connection
			.select({ id: books.id, imageUrl: bookProfiles.imageUrl })
			.from(books)
			.innerJoin(bookProfiles, eq(books.bookProfileId, bookProfiles.id))
			.where(inArray(books.id, bookIds))
			.execute();

		return Object.fromEntries(result.map((row) => [row.id, row.imageUrl]));
	}

	async get(filter: GetBookFilter) {
		const result = await this._connection
			.select({
				books,
				book_profiles: bookProfiles,
				...(Number.isInteger(filter.isAddedByUserId) && {
					isPrivateAdded: sql<boolean>`EXISTS (
						SELECT 1
						FROM user_books
						WHERE user_books.book_id = books.id
						AND user_books.user_id = ${filter.isAddedByUserId}
					)`,
				}),
			})
			.from(books)
			.innerJoin(bookProfiles, eq(books.bookProfileId, bookProfiles.id))
			.where(and(...this.transformObjectIntoEqSequence(filter, books)))
			.limit(1)
			.execute();

		if (!result?.[0]) {
			return null;
		}

		return {
			id: result[0].books.id,
			isPublic: result[0].books.isPublic,
			isPrivateAdded: result[0].isPrivateAdded ?? false,
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
		};
	}

	async list(filter: ListBookFilter) {
		const total = await this.getTotal(filter);

		let data: BooksListDto["data"] = [];

		if (!total) return { data, total };

		const filters = this.applyFilters(filter);

		const query = this._connection
			.select({
				books,
				book_profiles: bookProfiles,
				...(Number.isInteger(filter.isAddedByUserId) && {
					isPrivateAdded: sql<boolean>`EXISTS (
						SELECT 1
						FROM user_books
						WHERE user_books.book_id = books.id
						AND user_books.user_id = ${filter.isAddedByUserId}
					)`,
				}),
			})
			.from(books)
			.innerJoin(bookProfiles, and(...filters.bookProfilesInnerJoinOn))
			.$dynamic();

		if (filters.where.length) {
			query.where(and(...filters.where));
		}

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(
			query,
			[books, bookProfiles],
			filter.orderDirection,
			filter.orderField,
		);

		const result = await query.execute();

		data = result.map((row) => ({
			id: row.books.id,
			isPrivateAdded: row.isPrivateAdded ?? false,
			profile: {
				id: row.book_profiles.id,
				title: row.book_profiles.title,
				description: row.book_profiles.description,
				author: row.book_profiles.author,
				genre: row.book_profiles.genre,
				imageUrl: row.book_profiles.imageUrl,
				numberOfPages: row.book_profiles.numberOfPages,
				isbn: row.book_profiles.isbn,
			},
		}));

		return {
			data,
			total,
		};
	}

	private async getTotal(filter: ListBookFilter) {
		const query = this._connection.select({ total: count() }).from(books);

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

	private applyFilters(filter: ListBookFilter) {
		const filters = {
			where: [] as SQL[],
			bookProfilesInnerJoinOn: [
				eq(bookProfiles.id, books.bookProfileId),
			] as SQL<unknown>[],
		};

		if (filter.id?.length) {
			filters.where.push(inArray(books.id, filter.id));
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

	async create(book: Book) {
		await this._connection.transaction(async (tx) => {
			const profile = book.getProfile();

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

			await tx
				.insert(books)
				.values({
					id: book.getId(),
					bookProfileId: profile.getId(),
					isPublic: book.getIsPublic(),
				})
				.execute();
		});
	}

	async update(filter: GetBookFilter, book: BookUpdateData) {
		await this._connection
			.update(books)
			.set(book)
			.where(eq(books.id, filter.id));
	}

	async getFilters(): Promise<FiltersDto> {
		const distinctGenres = await this._connection
			.selectDistinct({ genre: bookProfiles.genre })
			.from(bookProfiles)
			.where(isNotNull(bookProfiles.genre))
			.orderBy(asc(bookProfiles.genre))
			.execute();

		const distinctAuthors = await this._connection
			.selectDistinct({ author: bookProfiles.author })
			.from(bookProfiles)
			.orderBy(asc(bookProfiles.author))
			.execute();

		const distinctNumberOfPages = await this._connection
			.select({
				minPages: min(bookProfiles.numberOfPages),
				maxPages: max(bookProfiles.numberOfPages),
			})
			.from(bookProfiles)
			.execute();

		const total = await this._connection
			.select({ total: countDistinct(bookProfiles.title) })
			.from(bookProfiles)
			.execute();

		return {
			genres: distinctGenres.map((row) => row.genre),
			authors: distinctAuthors.map((row) => row.author),
			numberOfPagesMin: distinctNumberOfPages[0]?.minPages ?? 0,
			numberOfPagesMax: distinctNumberOfPages[0]?.maxPages ?? 0,
			total: total[0]?.total ?? 0,
		};
	}
}
