import type { FileStorage } from "../../services/context";
import { load } from "../config";
import { AwsS3FileStorage } from "./aws-s3/storage";

export function createStorage(): FileStorage {
	const config = load();

	if (config.FILE_STORAGE_TYPE === "aws-s3") {
		return new AwsS3FileStorage(config);
	}

	throw new Error(`Unsupported storage type: ${config.FILE_STORAGE_TYPE}`);
}
