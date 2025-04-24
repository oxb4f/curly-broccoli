import { Base, type CreatedAt, type UpdatedAt } from "./base";
import type { Id, MaybeNumberId } from "./types/id";

interface FollowerData {
	id?: MaybeNumberId;
	userId: Id;
	followerId: Id;
	createdAt?: CreatedAt;
	updatedAt?: UpdatedAt;
}

export class Follower extends Base {
	private _userId: Id;
	private _followerId: Id;

	private constructor(payload: FollowerData) {
		super({
			id: payload.id,
			createdAt: payload.createdAt,
			updatedAt: payload.updatedAt,
		});

		this._userId = payload.userId;
		this._followerId = payload.followerId;
	}

	static async from(payload: FollowerData): Promise<Follower> {
		return new Follower({ ...payload });
	}

	getUserId(): Id {
		return this._userId;
	}

	getFollowerId(): Id {
		return this._followerId;
	}

	toPlainObject(): FollowerData {
		return {
			id: this._id,
			userId: this._userId,
			followerId: this._followerId,
		};
	}
}
