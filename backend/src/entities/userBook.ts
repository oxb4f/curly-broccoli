import assert from "node:assert/strict";

import { Base } from "./base";
import type { Book } from "./book";
import { BookProfile } from "./bookProfile";
import type { MaybeNumberId } from "./types/id";
import type { User } from "./user";

export type IsFavorite = boolean;
export type Rating = number | null | undefined;
export type Review = string | null | undefined;

export interface UserBookData {
	id?: MaybeNumberId;
	isFavorite?: IsFavorite;
	rating?: Rating;
	review?: Review;
	book: Book;
	profile: BookProfile;
	user: User;
}

type UserBookWithOptionalProfile = Omit<UserBookData, "profile"> & {
	profile?: BookProfile;
};

export class UserBook extends Base {
	private _isFavorite: IsFavorite;
	private _rating: Rating;
	private _review: Review;
	private _book: Book;
	private _profile: BookProfile;
	private _user: User;

	private constructor(payload: UserBookData) {
		super(payload.id);

		this._isFavorite = payload.isFavorite ?? false;
		this._rating = payload.rating ?? null;
		this._review = payload.review ?? null;
		this._book = payload.book;
		this._profile = payload.profile;
		this._user = payload.user;
	}

	static async from(payload: UserBookWithOptionalProfile): Promise<UserBook> {
        let profile;

		if (payload.profile) {
			profile = payload.profile;
		} else if (payload.book) {
			profile = await BookProfile.from({
				...payload.book.getProfile().toPlainObject(),
				id: Base._generateUniqueId(),
			});
		}

		assert(profile, "Profile is required");

		return new UserBook({ ...payload, profile });
	}

	private setIsFavorite(isFavorite: IsFavorite) {
		this._isFavorite = isFavorite;
	}

	private setRating(rating: Rating) {
		this._rating = rating;
	}

	private setReview(review: Review) {
		this._review = review;
	}

	private setBook(book: Book) {
		this._book = book;
	}

	private setProfile(profile: BookProfile) {
		this._profile = profile;
	}

	getIsFavorite(): IsFavorite {
		return this._isFavorite;
	}

	getRating(): Rating {
		return this._rating;
	}

	getReview(): Review {
		return this._review;
	}

	getBook(): Book {
		return this._book;
	}

	getProfile(): BookProfile {
		return this._profile;
	}

	getUser(): User {
		return this._user;
	}

	toPlainObject(): UserBookData {
		return {
			id: this._id,
			isFavorite: this._isFavorite,
			rating: this._rating,
			review: this._review,
			book: this._book,
			profile: this._profile,
			user: this._user,
		};
	}
}
