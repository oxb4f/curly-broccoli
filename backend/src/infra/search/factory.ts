import type { FileStorage } from "../../services/context";
import { load } from "../config";

export function createSearch(): FileStorage {
	const config = load();

	if (config.SEARCH_TYPE === "elastic") {
		return new AwsS3FileStorage(config);
	}

	throw new Error(`Unsupported search type: ${config.SEARCH_TYPE}`);
}
