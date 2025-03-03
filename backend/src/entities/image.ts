import crypto from "node:crypto";
import { Base } from "./base";
import type { MaybeNumberId } from "./types/id";

export type ImagePath = string;

interface ImageData {
	id: MaybeNumberId;
	path: ImagePath;
}

interface ImageBucketData {
	bucket?: string;
	extension?: string;
}

export class Image extends Base {
	private _path: ImagePath;

	private constructor(payload: ImageData) {
		super(payload.id);
		this._path = payload.path;
	}

	static async from(payload: ImageData): Promise<Image> {
		return new Image({ ...payload });
	}

	static async fromBucket(payload?: ImageBucketData): Promise<Image> {
		const path = `${payload?.bucket ? `${payload.bucket}/` : ""}${Image.generateRandomUUID()}${payload?.extension ? `.${payload.extension}` : ""}`;

		return new Image({ path, id: undefined });
	}

	static generateRandomUUID(): ImagePath {
		return crypto.randomUUID();
	}

	getPath(): ImagePath {
		return this._path;
	}

	toPlainObject(): ImageData {
		return {
			id: this._id,
			path: this._path,
		};
	}
}
