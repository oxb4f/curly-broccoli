import type { MaybeNumberId } from "./types/id";

export abstract class Base {
	protected _id: number;

	abstract toPlainObject(): Record<string, any>;

	protected constructor(id: MaybeNumberId) {
		this._id = id ?? this._generateUniqueId();
	}

	private _generateUniqueId() {
		const timestamp = Date.now().toString().slice(-6);
		const randomNum = Math.floor(Math.random() * 100000);

		const uniqueId = `${timestamp}${randomNum}`;

		return Number(uniqueId);
	}

	getId() {
		return this._id;
	}
}
