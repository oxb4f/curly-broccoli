import assert from "node:assert";
import { S3Client } from "bun";
import type {
	FileStorage,
	FileStorageGetPayload,
	FileStoragePutPayload,
} from "../../../services/context";
import type { Config } from "../../config";
import { FileStorageDeniedError } from "../errors/denied";
import { FileStorageNotFoundError } from "../errors/not-found";

export class AwsS3FileStorage implements FileStorage {
	constructor(private readonly _config: Config) {}

	private prepareS3Client(bucket: string): S3Client {
		return new S3Client({
			bucket,
			region: this._config.AWS_REGION,
			endpoint: this._config.AWS_S3_ENDPOINT,
			accessKeyId: this._config.AWS_ACCESS_KEY_ID,
			secretAccessKey: this._config.AWS_SECRET_ACCESS_KEY,
		});
	}
	async put({
		file,
		bucket,
		name,
		path,
	}: FileStoragePutPayload): Promise<void> {
		try {
			const { name: s3Name, bucket: s3Bucket } = this.getNameAndBucket({
				path,
				bucket,
				name,
			});

			await this.prepareS3Client(s3Bucket).write(s3Name, await file.bytes(), {
				type: file.type,
				acl: "public-read",
			});
		} catch (error: any) {
			this.catchError(error);
		}
	}

	async get({ path, bucket, name }: FileStorageGetPayload): Promise<File> {
		try {
			const { name: s3Name, bucket: s3Bucket } = this.getNameAndBucket({
				path,
				bucket,
				name,
			});

			const client = this.prepareS3Client(s3Bucket);

			const exists = await client.exists(s3Name);

			if (!exists) {
				throw new FileStorageNotFoundError("File not found");
			}

			const s3File = client.file(s3Name, { bucket: s3Bucket });

			return new File([await s3File.bytes()], s3Name, {
				type: s3File.type,
			});
		} catch (error: any) {
			this.catchError(error);
		}
	}

	private getNameAndBucket({
		path,
		bucket,
		name,
	}: { path?: string; bucket?: string; name?: string }): {
		name: string;
		bucket: string;
	} {
		if (path) {
			return {
				name: path.slice(path.lastIndexOf("/") + 1),
				bucket: path.slice(0, path.lastIndexOf("/")),
			};
		}

		assert(bucket, "bucket is required");
		assert(name, "name is required");

		return { name, bucket };
	}

	private catchError(error: any): never {
		if (error.name !== "S3Error") throw error;

		if (error.code === "NoSuchBucket")
			throw new FileStorageNotFoundError(error.message);

		throw new FileStorageDeniedError(error.message);
	}
}
