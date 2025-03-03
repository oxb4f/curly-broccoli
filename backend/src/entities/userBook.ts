import { Base } from "./base";
import type { Book } from "./book";
import { BookProfile, type BookProfileData } from "./bookProfile";
import type { MaybeNumberId } from "./types/id";
import type { User } from "./user";

export type IsFavorite = boolean;
export type IsRead = boolean;
export type Rating = number | null | undefined;
export type Review = string | null | undefined;

export interface UserBookData {
	id?: MaybeNumberId;
	isFavorite?: IsFavorite;
	isRead?: IsRead;
	rating?: Rating;
	review?: Review;
	book?: Book;
	profile?: BookProfile;
	user?: User;
}

export interface UserBookUpdateData {
	isFavorite?: IsFavorite | undefined;
	isRead?: IsRead | undefined;
	rating?: Rating;
	review?: Review;
	profile?: Omit<Partial<BookProfileData>, "id"> | undefined;
}

type UserBookWithOptionalProfile = Omit<UserBookData, "profile"> & {
	profile?: BookProfile;
};

export class UserBook extends Base {
	private _isFavorite: IsFavorite;
	private _isRead: IsRead;
	private _rating: Rating;
	private _review: Review;
	private _book?: Book;
	private _profile?: BookProfile;
	private _user?: User;

	private constructor(payload: UserBookData) {
		super(payload.id);

		this._isFavorite = payload.isFavorite ?? false;
		this._isRead = payload.isRead ?? false;
		this._rating = payload.rating ?? null;
		this._review = payload.review ?? null;
		this._book = payload.book;
		this._profile = payload.profile;
		this._user = payload.user;
	}

	static async from(payload: UserBookWithOptionalProfile): Promise<UserBook> {
		let profile: BookProfile | undefined;

		if (payload.profile) {
			profile = payload.profile;
		} else if (payload.book) {
			profile = await BookProfile.from({
				...payload.book.getProfile().toPlainObject(),
				id: Base._generateUniqueId(),
			});
		}

		return new UserBook({ ...payload, profile });
	}

	async update(payload: UserBookUpdateData) {
		if (typeof payload.isFavorite === "boolean") {
			this.setIsFavorite(payload.isFavorite);
		}

		if (typeof payload.isRead === "boolean") {
			this.setIsRead(payload.isRead);
		}

		if (typeof payload.rating === "number" || payload.rating === null) {
			this.setRating(payload.rating);
		}

		if (payload.review || payload.review === null) {
			this.setReview(payload.review);
		}

		if (payload.profile && this._profile) {
			await this._profile.update(payload.profile);
		}

		return this;
	}

	private setIsFavorite(isFavorite: IsFavorite) {
		this._isFavorite = isFavorite;
	}

	private setIsRead(isRead: IsRead) {
		this._isRead = isRead;
	}

	private setRating(rating: Rating) {
		this._rating = rating;
	}

	private setReview(review: Review) {
		this._review = review;
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

	getBook(): Book | undefined {
		return this._book;
	}

	getProfile(): BookProfile | undefined {
		return this._profile;
	}

	getUser(): User | undefined {
		return this._user;
	}

	getIsRead(): IsRead {
		return this._isRead;
	}

	toPlainObject(): UserBookData {
		return {
			id: this._id,
			isFavorite: this._isFavorite,
			isRead: this._isRead,
			rating: this._rating,
			review: this._review,
			book: this._book,
			profile: this._profile,
			user: this._user,
		};
	}
}
