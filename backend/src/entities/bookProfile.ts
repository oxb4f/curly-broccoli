import { Base } from "./base";
import type { MaybeNumberId } from "./types/id";

export type Title = string;
export type Description = string | null | undefined;
export type ImageUrl = string | null | undefined;
export type Author = string;
export type Genre = string | null | undefined;
export type NumberOfPages = number;
export type Isbn = string | null | undefined;

export interface BookProfileData {
	id?: MaybeNumberId;
	title: Title;
	description: Description;
	imageUrl: ImageUrl;
	numberOfPages: NumberOfPages;
	author: Author;
	genre: Genre;
	isbn: Isbn;
}

type BookProfileUpdateData = Partial<Omit<BookProfileData, "id">>;

export class BookProfile extends Base {
	private _title: Title;
	private _description: Description;
	private _imageUrl: ImageUrl;
	private _numberOfPages: NumberOfPages;
	private _author: Author;
	private _genre: Genre;
	private _isbn: Isbn;

	private constructor(payload: BookProfileData) {
		super(payload.id);

		this._title = payload.title;
		this._description = payload.description;
		this._numberOfPages = payload.numberOfPages;
		this._imageUrl = payload.imageUrl;
		this._author = payload.author;
		this._genre = payload.genre;
		this._isbn = payload.isbn;
	}

	static async from(payload: BookProfileData): Promise<BookProfile> {
		return new BookProfile(payload);
	}

	async update(payload: BookProfileUpdateData) {
		const { title, description, imageUrl, numberOfPages, author, genre, isbn } =
			payload;

		if (title || title === null) this.setTitle(title);
		if (description || description === null) this.setDescription(description);
		if (imageUrl || imageUrl === null) this.setImageUrl(imageUrl);
		if (numberOfPages || numberOfPages === null)
			this.setNumberOfPages(numberOfPages);
		if (author || author === null) this.setAuthor(author);
		if (genre || genre === null) this.setGenre(genre);
		if (isbn || isbn === null) this.setIsbn(isbn);

		return this;
	}

	private setTitle(title: Title) {
		this._title = title;
	}

	private setDescription(description: Description) {
		this._description = description;
	}

	private setImageUrl(imageUrl: ImageUrl) {
		this._imageUrl = imageUrl;
	}

	private setNumberOfPages(numberOfPages: NumberOfPages) {
		this._numberOfPages = numberOfPages;
	}

	private setAuthor(author: Author) {
		this._author = author;
	}

	private setGenre(genre: Genre) {
		this._genre = genre;
	}

	private setIsbn(isbn: Isbn) {
		this._isbn = isbn;
	}

	getTitle(): Title {
		return this._title;
	}

	getDescription(): Description {
		return this._description;
	}

	getNumberOfPages(): NumberOfPages {
		return this._numberOfPages;
	}

	getImageUrl(): ImageUrl {
		return this._imageUrl;
	}

	getAuthor(): Author {
		return this._author;
	}

	getGenre(): Genre {
		return this._genre;
	}

	getIsbn(): Isbn {
		return this._isbn;
	}

	toPlainObject(): BookProfileData {
		return {
			id: this._id,
			title: this._title,
			description: this._description,
			imageUrl: this._imageUrl,
			numberOfPages: this._numberOfPages,
			author: this._author,
			genre: this._genre,
			isbn: this._isbn,
		};
	}
}
