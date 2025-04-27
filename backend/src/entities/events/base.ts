import { Base, type ConstructorPayload } from "../base";
import type { Id } from "../types/id";

export type EventConstructorPayload = Omit<
	ConstructorPayload & {
		name: string;
		toUserId: Id;
		fromUserId: Id;
	},
	"id"
>;

abstract class BaseEvent extends Base {
	private _name: string;
	private _toUserId: Id;
	private _fromUserId: Id;

	getName(): string {
		return this._name;
	}

	getToUserId(): Id {
		return this._toUserId;
	}

	getFromUserId(): Id {
		return this._fromUserId;
	}

	protected constructor(payload: EventConstructorPayload) {
		super({ ...payload });

		this._name = payload.name;
		this._toUserId = payload.toUserId;
		this._fromUserId = payload.fromUserId;
	}
}

export { BaseEvent };
