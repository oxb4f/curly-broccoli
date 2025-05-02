import type { Description, Title } from "../../book-profile";
import type { Id } from "../../types/id";
import type { ImageUrl } from "../../user";
import { BaseEvent, type EventConstructorPayload } from "../base";
import { READING_TRACKERS_KEY } from "./key";

export type ReadingTrackerStartEventPayload = {
	profile: {
		title: Title;
		imageUrl: ImageUrl;
		description: Description;
	};
	userBookId: Id;
};

export type EventPayload = ReadingTrackerStartEventPayload &
	Omit<EventConstructorPayload, "name">;

export class ReadingTrackerStartEvent extends BaseEvent {
	static _ACTION = `${READING_TRACKERS_KEY}.start`;

	private _payload: ReadingTrackerStartEventPayload;

	constructor(payload: EventPayload) {
		super({ ...payload, name: ReadingTrackerStartEvent._ACTION });

		this._payload = payload;
	}

	toPlainObject(): ReadingTrackerStartEventPayload {
		return this._payload;
	}
}
