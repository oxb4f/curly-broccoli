import type { Id } from "../../types/id";
import type { FirstName, ImageUrl, LastName, Username } from "../../user";
import { BaseEvent, type EventConstructorPayload } from "../base";
import { FOLLOWERS_KEY } from "./key";

export type FollowersCreateEventPayload = {
	user: {
		id: Id;
		firstName: FirstName;
		lastName: LastName;
		username: Username;
		imageUrl: ImageUrl;
	};
};

export type EventPayload = FollowersCreateEventPayload &
	Omit<EventConstructorPayload, "name">;

export class FollowersCreateEvent extends BaseEvent {
	static _ACTION = `${FOLLOWERS_KEY}.create`;

	private _payload: FollowersCreateEventPayload;

	constructor(payload: EventPayload) {
		super({ ...payload, name: FollowersCreateEvent._ACTION });

		this._payload = payload;
	}

	toPlainObject(): FollowersCreateEventPayload {
		return this._payload;
	}
}
