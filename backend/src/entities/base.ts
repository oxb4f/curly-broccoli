import type { Id, MaybeNumberId } from "./types/id";

export abstract class Base {
	protected _id: Id;

	abstract toPlainObject(): Record<string, any>;

	protected constructor(id: MaybeNumberId) {
		this._id = id ?? Base._generateUniqueId();
	}

	protected static _generateUniqueId() {
		const timestamp = Date.now().toString().slice(-6);
		const randomNum = Math.floor(Math.random() * 100000);

		const uniqueId = `${timestamp}${randomNum}`;

		return Number(uniqueId);
	}

	getId() {
		return this._id;
	}
}
