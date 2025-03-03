import { count, eq } from "drizzle-orm";
import { Book } from "../../../../entities/book";
import { BookProfile } from "../../../../entities/bookProfile";
import type {
	BooksRepository,
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
	async getBook(filter: GetBookFilter) {
		const result = await this._connection
			.select()
			.from(books)
			.innerJoin(bookProfiles, eq(books.bookProfileId, bookProfiles.id))
			.where(eq(books.id, filter.id));

		if (!result?.[0]) {
			return null;
		}

		return {
			id: result[0].books.id,
			isPublic: result[0].books.isPublic,
			title: result[0].book_profiles.title,
			description: result[0].book_profiles.description,
			author: result[0].book_profiles.author,
			genre: result[0].book_profiles.genre,
			imageUrl: result[0].book_profiles.imageUrl,
			numberOfPages: result[0].book_profiles.numberOfPages,
			isbn: result[0].book_profiles.isbn,
		};
	}

	async list(filter: ListBookFilter) {
		const result = await this._connection
			.select({ total: count() })
			.from(books);

		const total = result[0]?.total ?? 0;
		let data: Book[] = [];

		if (total) {
			const result = await this._connection
				.select()
				.from(books)
				.innerJoin(bookProfiles, eq(books.bookProfileId, bookProfiles.id))
				.limit(filter.limit)
				.offset(filter.offset);

			data = await Promise.all(
				result.map(async (row) => {
					return Book.from({
						id: row.books.id,
						isPublic: row.books.isPublic,
						profile: await BookProfile.from(row.book_profiles),
					});
				}),
			);
		}

		return {
			data,
			total,
		};
	}

	async createFromEntity(book: Book) {
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
}
