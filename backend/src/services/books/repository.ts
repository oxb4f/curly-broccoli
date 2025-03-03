import type { Book } from "../../entities/book";
import type {
	Author,
	Description,
	Genre,
	ImageUrl,
	Isbn,
	NumberOfPages,
	Title,
} from "../../entities/bookProfile";
import type {
	IsFavorite,
	Rating,
	Review,
	UserBook,
} from "../../entities/userBook";

export type GetBookFilter = {
	id: number;
};

export type ListBookFilter = {
	limit: number;
	offset: number;
};

export type ListUserBookFilter = {
	limit: number;
	offset: number;
	userId: number;
};

export type GetBookDto = {
	id: number;
	title: Title;
	description: Description;
	author: Author;
	genre: Genre;
	imageUrl: ImageUrl;
	numberOfPages: NumberOfPages;
	isbn: Isbn;
};

export interface BooksRepository {
	createFromEntity(book: Book): Promise<void>;
	list(filter: ListBookFilter): Promise<{ data: Book[]; total: number }>;
	getBook(filter: GetBookFilter): Promise<GetBookDto | null>;
}

export interface UserBooksListDto {
	data: {
		id: number;
		isFavorite: IsFavorite;
		rating: Rating;
		review: Review;
		title: Title;
		description: Description;
		author: Author;
		genre: Genre;
		imageUrl: ImageUrl;
		numberOfPages: NumberOfPages;
		isbn: Isbn;
	}[];
	total: number;
}

export type GetUserBookFilter = {
	id: number;
};

export type GetUserBookDto = {
	id: number;
	isFavorite: IsFavorite;
	rating: Rating;
	review: Review;
	title: Title;
	description: Description;
	author: Author;
	genre: Genre;
	imageUrl: ImageUrl;
	numberOfPages: NumberOfPages;
	isbn: Isbn;
};

export interface UserBooksRepository {
	createFromEntity(userBook: UserBook): Promise<void>;
	list(filter: ListUserBookFilter): Promise<UserBooksListDto>;
	getUserBook(filter: GetUserBookFilter): Promise<GetUserBookDto | null>;
}
