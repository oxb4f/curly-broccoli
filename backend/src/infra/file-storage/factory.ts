import { S3Client } from "bun";
import type { FileStorage } from "../../services/context";
import { load } from "../config";
import { AwsS3FileStorage } from "./aws-s3/storage";

export function createStorage(): FileStorage {
	const config = load();

	if (config.FILE_STORAGE_TYPE === "aws-s3") {
		return new AwsS3FileStorage(
			new S3Client({
				region: config.AWS_REGION,
				endpoint: config.AWS_S3_ENDPOINT,
				accessKeyId: config.AWS_ACCESS_KEY_ID,
				secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
			}),
		);
	}

	throw new Error(`Unsupported storage type: ${config.FILE_STORAGE_TYPE}`);
}
