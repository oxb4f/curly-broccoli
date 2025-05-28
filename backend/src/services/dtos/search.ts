export interface SearchResultItem {
	id: string;
	score: number;
	createdAt: Date;
}

export interface BookSearchResult extends SearchResultItem {
	title: string;
	author: string;
	description: string;
	genre: string;
}

export interface UserSearchResult extends SearchResultItem {
	username: string;
	firstName: string;
	lastName: string;
}

export interface SearchResults<T extends SearchResultItem> {
	items: T[];
	total: number;
	took: number;
}

export type BookSearchResults = SearchResults<BookSearchResult>;
export type UserSearchResults = SearchResults<UserSearchResult>;

export interface SearchQuery {
	term?: string;
}

export interface BookSearchQuery extends SearchQuery {
	title?: string;
	author?: string;
	description?: string;
	genre?: string;
	size?: number;
}

export interface UserSearchQuery extends SearchQuery {
	firstName?: string;
	lastName?: string;
	username?: string;
	size?: number;
}

export interface BookIndexData {
	bookId: string;
	title: string;
	author: string;
	description: string;
	genre: string;
}

export interface UserIndexData {
	userId: string;
	firstName: string;
	lastName: string;
	username: string;
}
