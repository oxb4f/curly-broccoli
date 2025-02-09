import crypto from "node:crypto";
import { Base } from "./base";

export type Path = string;

type CPayload = {
	id?: number;
	path: Path;
};

type BucketPayload = {
	bucket?: string;
	extension?: string;
};

export type ImagePayload = CPayload & {};

export class Image extends Base {
	private _path: Path;

	private constructor(payload: CPayload) {
		super(payload.id);

		this._path = payload.path;
	}

	static async from(payload: CPayload): Promise<Image> {
		return new Image(payload);
	}

	static async fromBucket(payload?: BucketPayload): Promise<Image> {
		const path = `${payload?.bucket ? `${payload.bucket}/` : ""}${Image.generateRandomUUID()}${payload?.extension ? `.${payload.extension}` : ""}`;

		return new Image({ path });
	}

	static generateRandomUUID(): Path {
		return crypto.randomUUID();
	}

	getPath(): Path {
		return this._path;
	}

	toPlainObject(): Readonly<{ id: number; path: Path }> {
		return {
			id: this._id,
			path: this._path,
		};
	}
}
