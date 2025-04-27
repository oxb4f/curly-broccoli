import { Base, type CreatedAt, type UpdatedAt } from "./base";
import { BookProfile, type BookProfileData } from "./book-profile";
import type { MaybeNumberId } from "./types/id";

export type IsPublic = boolean;

interface BookData {
	id?: MaybeNumberId;
	isPublic: IsPublic;
	profile: BookProfile;
	createdAt?: CreatedAt;
	updatedAt?: UpdatedAt;
}

type BookWithProfileData = Omit<BookData, "profile"> & {
	profile: Omit<BookProfileData, "id">;
};

export class Book extends Base {
	private _isPublic: IsPublic;
	private _profile: BookProfile;

	private constructor(payload: BookData) {
		super({
			id: payload.id,
			createdAt: payload.createdAt,
			updatedAt: payload.updatedAt,
		});

		this._isPublic = payload.isPublic;
		this._profile = payload.profile;
	}

	static async from(payload: BookData): Promise<Book> {
		return new Book({ ...payload });
	}

	static async fromProfileData(payload: BookWithProfileData): Promise<Book> {
		const profile = await BookProfile.from({ ...payload.profile });

		return new Book({ ...payload, profile });
	}

	getIsPublic(): IsPublic {
		return this._isPublic;
	}

	getProfile(): BookProfile {
		return this._profile;
	}

	toPlainObject(): BookData {
		return {
			id: this._id,
			isPublic: this._isPublic,
			profile: this._profile,
		};
	}
}
