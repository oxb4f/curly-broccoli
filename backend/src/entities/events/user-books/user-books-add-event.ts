import type { Title } from "../../book-profile";
import type { Id } from "../../types/id";
import type { ImageUrl } from "../../user";
import { BaseEvent, type EventConstructorPayload } from "../base";
import { USER_BOOKS_KEY } from "./key";

export type UserBooksAddEventPayload = {
	profile: {
		title: Title;
		imageUrl: ImageUrl;
	};
	userBookId: Id;
};

export type EventPayload = UserBooksAddEventPayload &
	Omit<EventConstructorPayload, "name">;

export class UserBooksAddEvent extends BaseEvent {
	static _ACTION = `${USER_BOOKS_KEY}.add`;

	private _payload: UserBooksAddEventPayload;

	constructor(payload: EventPayload) {
		super({ ...payload, name: UserBooksAddEvent._ACTION });

		this._payload = payload;
	}

	toPlainObject(): UserBooksAddEventPayload {
		return this._payload;
	}
}
