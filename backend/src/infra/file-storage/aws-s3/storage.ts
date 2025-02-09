import assert from "node:assert";
import type { S3Client } from "bun";
import type {
	FileStorage,
	FileStorageGetPayload,
	FileStoragePutPayload,
} from "../../../services/context";
import { FileStorageNotFoundError } from "../errors/not-found";

export class AwsS3FileStorage implements FileStorage {
	constructor(private readonly _s3: S3Client) {}

	makePathFromName(name: string, bucket?: string): string {
		return `${bucket ? `${bucket}/` : ""}${name ?? ""}`;
	}

	makePath(name?: string, bucket?: string, path?: string): string {
		if (path) {
			return path;
		}

		if (name) {
			return this.makePathFromName(name, bucket);
		}

		assert(false, "path or name is required");
	}

	async put({
		file,
		bucket,
		name,
		path,
	}: FileStoragePutPayload): Promise<void> {
		const s3File = this._s3.file(this.makePath(name, bucket, path), { bucket });

		await s3File.write(file, {
			type: file.type,
			acl: "public-read",
		});
	}

	async get({ path, bucket, name }: FileStorageGetPayload): Promise<File> {
		const s3Path = this.makePath(name, bucket, path);

		try {
			const exists = await this._s3.exists(s3Path);

			if (!exists) {
				throw new FileStorageNotFoundError("File not found");
			}
		} catch (error: any) {
			throw new FileStorageNotFoundError(error.message);
		}

		const s3File = this._s3.file(s3Path, { bucket });

		return new File([await s3File.bytes()], s3Path, {
			type: s3File.type,
		});
	}
}
