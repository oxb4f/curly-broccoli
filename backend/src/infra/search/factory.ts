import type { Search } from "../../services/context";
import { load } from "../config";
import { ElasticSearch } from "./elastic/search";

export async function createSearch(): Promise<Search | never> {
	const config = load();

	if (config.SEARCH_TYPE === "elastic") {
		const elasticSearch = new ElasticSearch(config);

		await elasticSearch.createBookIndex();
		await elasticSearch.createUserIndex();

		return elasticSearch;
	}

	throw new Error(`Unsupported search type: ${config.SEARCH_TYPE}`);
}
