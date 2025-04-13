import { and, count, eq } from "drizzle-orm";
import type { Book } from "../../../../entities/book";
import type {
	BookUpdateData,
	BooksListDto,
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
	async get(filter: GetBookFilter) {
		const result = await this._connection
			.select()
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
		const total = await this.getTotal();

		let data: BooksListDto["data"] = [];

		if (!total) return { data, total };

		const query = this._connection
			.select()
			.from(books)
			.innerJoin(bookProfiles, eq(books.bookProfileId, bookProfiles.id))
			.$dynamic();

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(query, books, filter.orderDirection, filter.orderField);

		const result = await query.execute();

		data = result.map((row) => ({
			id: row.books.id,
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

	private async getTotal() {
		const result = await this._connection
			.select({ total: count() })
			.from(books);

		return result[0]?.total ?? 0;
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
}
