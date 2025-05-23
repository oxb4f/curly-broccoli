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
import type { Id } from "../../entities/types/id";
import type {
	IsFavorite,
	IsRead,
	Rating,
	Review,
	UserBook,
} from "../../entities/userBook";
import type {
	BaseRepository,
	OrderDirection,
	RepositoryTypes,
} from "../base-repository";

export type GetBookFilter = {
	id: Id;
    isAddedByUserId?: Id;
};

export type ListBookFilter = {
    isAddedByUserId?: Id;
	limit?: number | null;
	offset?: number | null;
	orderDirection?: OrderDirection | null;
	orderField?: string | null;
};

export type ListUserBookFilter = {
	limit?: number | null;
	offset?: number | null;
	orderDirection?: OrderDirection | null;
	orderField?: string | null;
	userId: Id;
    checkIsReadingTrackerStarted?: boolean;
};

export type GetBookDto = {
	id: Id;
	isPublic: boolean;
    isPrivateAdded: boolean;
	profile: {
		id: Id;
		title: Title;
		description: Description;
		author: Author;
		genre: Genre;
		imageUrl: ImageUrl;
		numberOfPages: NumberOfPages;
		isbn: Isbn;
	};
};

export type BooksListDto = {
	data: {
		id: Id;
		isPrivateAdded: boolean;
		profile: {
			id: Id;
			title: Title;
			description: Description;
			author: Author;
			genre: Genre;
			imageUrl: ImageUrl;
			numberOfPages: NumberOfPages;
			isbn: Isbn;
		};
	}[];
	total: number;
};

export type BookUpdateData = { isPublic?: boolean };

export interface BooksRepository
	extends BaseRepository<
		RepositoryTypes<
			Book,
			BooksListDto,
			GetBookDto | null,
			ListBookFilter,
			GetBookFilter,
			BookUpdateData
		>
	> {
	create(book: Book): Promise<void>;
	list(filter: ListBookFilter): Promise<BooksListDto>;
	get(filter: GetBookFilter): Promise<GetBookDto | null>;
	update(filter: GetBookFilter, book: BookUpdateData): Promise<void>;
}

export interface UserBooksListDto {
	data: {
		id: Id;
		isFavorite: IsFavorite;
		rating: Rating;
		review: Review;
		profile: {
			title: Title;
			description: Description;
			author: Author;
			genre: Genre;
			imageUrl: ImageUrl;
			numberOfPages: NumberOfPages;
			isbn: Isbn;
		};
		isRead: IsRead;
		isReadingTrackerStarted: boolean;
	}[];
	total: number;
}

export type GetUserBookFilter = {
	id?: Id;
	userId?: Id;
	bookId?: Id;
};

export type GetUserBookDto = {
	id: Id;
	isFavorite: IsFavorite;
	rating: Rating;
	review: Review;
	profile: {
		id: Id;
		title: Title;
		description: Description;
		author: Author;
		genre: Genre;
		imageUrl: ImageUrl;
		numberOfPages: NumberOfPages;
		isbn: Isbn;
	};
	isRead: IsRead;
};

export type UserBookUpdateData = {
	profile?: {
		id: Id;
		title?: Title;
		description?: Description;
		author?: Author;
		genre?: Genre;
		imageUrl?: ImageUrl;
		numberOfPages?: NumberOfPages;
		isbn?: Isbn;
	};
	isFavorite?: IsFavorite;
	rating?: Rating;
	review?: Review;
	isRead?: IsRead;
};

export interface UserBooksRepository
	extends BaseRepository<
		RepositoryTypes<
			UserBook,
			UserBooksListDto,
			GetUserBookDto | null,
			ListUserBookFilter,
			GetUserBookFilter,
			UserBookUpdateData
		>
	> {
	create(userBook: UserBook): Promise<void>;
	list(filter: ListUserBookFilter): Promise<UserBooksListDto>;
	get(filter: GetUserBookFilter): Promise<GetUserBookDto | null>;
	update(
		filter: GetUserBookFilter,
		userBook: UserBookUpdateData,
	): Promise<void>;
	delete(filter: GetUserBookFilter): Promise<void>;
}
