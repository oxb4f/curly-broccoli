import type { Id, MaybeNumberId } from "./types/id";

export type CreatedAt = Date | undefined;
export type UpdatedAt = Date | undefined;

export abstract class Base {
	protected _id: Id;
	protected _createdAt: Date;
	protected _updatedAt: Date;

	abstract toPlainObject(): Record<string, any>;

	protected constructor({id, createdAt, updatedAt}: {id: MaybeNumberId, createdAt: CreatedAt, updatedAt: UpdatedAt}) {
		this._id = id ?? Base._generateUniqueId();
		this._createdAt = createdAt ?? new Date();
		this._updatedAt = updatedAt ?? new Date();
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

	getCreatedAt() {
		return this._createdAt;
	}

	getUpdatedAt() {
		return this._updatedAt;
	}
}
