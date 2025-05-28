import { Client, HttpConnection } from "@elastic/elasticsearch";
import type { Search } from "../../../services/context";
import type {
	BookIndexData,
	BookSearchQuery,
	BookSearchResults,
	UserIndexData,
	UserSearchQuery,
	UserSearchResults,
} from "../../../services/dtos/search";
import type { Config } from "../../config";

type ElasticSearchHit<T> = {
	_index: string;
	_id: string;
	_score: number | null;
	_source: T;
};

type BookDocument = {
	bookId: string;
	title: string;
	author: string;
	description: string;
	genre: string;
	createdAt: string | Date;
};

type UserDocument = {
	userId: string;
	username: string;
	firstName: string;
	lastName: string;
	createdAt: string | Date;
};

export class ElasticSearch implements Search {
	private readonly _client: Client;

	constructor(private readonly _config: Config) {
		this._client = new Client({
			node: this._config.ELASTICSEARCH_URL,
			Connection: HttpConnection,
			auth: {
				username: this._config.ELASTICSEARCH_USERNAME,
				password: this._config.ELASTICSEARCH_PASSWORD,
			},
		});
	}

	async createBookIndex(): Promise<void> {
		if (await this._client.indices.exists({ index: "books" })) {
			return;
		}

		await this._client.indices.create({
			index: "books",
			settings: {
				index: {
					max_ngram_diff: 4,
				},
				analysis: {
					analyzer: {
						ngram_analyzer: {
							type: "custom",
							tokenizer: "standard",
							filter: ["lowercase", "ngram_filter"],
						},
					},
					filter: {
						ngram_filter: {
							type: "ngram",
							min_gram: 4,
							max_gram: 8,
						},
					},
				},
			},
			mappings: {
				properties: {
					bookId: { type: "keyword" },
					title: {
						type: "text",
						fields: {
							ngram: {
								type: "text",
								analyzer: "ngram_analyzer",
							},
						},
					},
					author: {
						type: "text",
						fields: {
							ngram: {
								type: "text",
								analyzer: "ngram_analyzer",
							},
						},
					},
					description: { type: "text" },
					genre: {
						type: "text",
						fields: {
							ngram: {
								type: "text",
								analyzer: "ngram_analyzer",
							},
						},
					},
					createdAt: { type: "date" },
				},
			},
		});
	}

	async createUserIndex(): Promise<void> {
		if (await this._client.indices.exists({ index: "users" })) {
			return;
		}

		await this._client.indices.create({
			index: "users",
			settings: {
				index: {
					max_ngram_diff: 4,
				},
				analysis: {
					analyzer: {
						ngram_analyzer: {
							type: "custom",
							tokenizer: "standard",
							filter: ["lowercase", "ngram_filter"],
						},
					},
					filter: {
						ngram_filter: {
							type: "ngram",
							min_gram: 4,
							max_gram: 8,
						},
					},
				},
			},
			mappings: {
				properties: {
					userId: { type: "keyword" },
					firstName: {
						type: "text",
						fields: {
							ngram: {
								type: "text",
								analyzer: "ngram_analyzer",
							},
						},
					},
					lastName: {
						type: "text",
						fields: {
							ngram: {
								type: "text",
								analyzer: "ngram_analyzer",
							},
						},
					},
					username: {
						type: "text",
						fields: {
							ngram: {
								type: "text",
								analyzer: "ngram_analyzer",
							},
						},
					},
					createdAt: { type: "date" },
				},
			},
		});
	}

	async indexBook(book: BookIndexData): Promise<void> {
		await this._client.index({
			index: "books",
			id: book.bookId,
			refresh: true,
			document: {
				...book,
				createdAt: new Date(),
			},
		});
	}

	async indexUser(user: UserIndexData): Promise<void> {
		await this._client.index({
			index: "users",
			id: user.userId,
			refresh: true,
			document: {
				...user,
				createdAt: new Date(),
			},
		});
	}

	async updateUserIndex(user: UserIndexData): Promise<void> {
		await this._client.update({
			index: "users",
			id: user.userId,
			refresh: true,
			doc: {
				...user,
			},
			upsert: {
				...user,
				createdAt: new Date(),
			},
		});
	}

	async searchBooks(query: BookSearchQuery): Promise<BookSearchResults> {
		const searchBody: any = {
			query: {
				bool: {
					should: [],
				},
			},
			size: query.size ? query.size : 5,
			sort: ["_score", { createdAt: "desc" }],
		};

		if (query.term) {
			searchBody.query.bool.should.push({
				multi_match: {
					query: query.term,
					fields: [
						"title^3",
						"title.ngram^1.5",
						"author^2",
						"author.ngram^1",
						"description",
						"genre^1.5",
						"genre.ngram^0.75",
					],
					type: "best_fields",
					operator: "or",
					tie_breaker: 0.3,
					fuzziness: "AUTO",
				},
			});
		}

		if (query.title) {
			searchBody.query.bool.should.push({
				match: { title: { query: query.title, boost: 3 } },
			});
		}

		if (query.author) {
			searchBody.query.bool.should.push({
				match: { author: { query: query.author, boost: 2 } },
			});
		}

		if (query.description) {
			searchBody.query.bool.should.push({
				match: { description: query.description },
			});
		}

		if (query.genre) {
			searchBody.query.bool.should.push({ match: { genre: query.genre } });
		}

		if (searchBody.query.bool.should.length === 0) {
			searchBody.query = { match_all: {} };
		}

		const response = await this._client.search({
			index: "books",
			body: searchBody,
		});

		const hits = (response.hits?.hits || []) as Array<
			ElasticSearchHit<BookDocument>
		>;

		const totalValue =
			typeof response.hits?.total === "number"
				? response.hits.total
				: (response.hits?.total as any)?.value || 0;

		return {
			items: hits.map((hit) => ({
				id: hit._source.bookId,
				score: hit._score || 0,
				title: hit._source.title,
				author: hit._source.author,
				description: hit._source.description,
				genre: hit._source.genre,
				createdAt:
					hit._source.createdAt instanceof Date
						? hit._source.createdAt
						: new Date(hit._source.createdAt),
			})),
			total: totalValue,
			took: response.took || 0,
		} as BookSearchResults;
	}

	async searchUsers(query: UserSearchQuery): Promise<UserSearchResults> {
		const searchBody: any = {
			query: {
				bool: {
					should: [] as any[],
				},
			},
			size: query.size ? query.size : 5,
			sort: ["_score", { createdAt: "desc" }],
		};

		if (query.term) {
			searchBody.query.bool.should.push({
				multi_match: {
					query: query.term,
					fields: [
						"username^3",
						"username.ngram^1.5",
						"firstName^2",
						"firstName.ngram^1",
						"lastName^2",
						"lastName.ngram^1",
					],
					fuzziness: "AUTO",
					type: "best_fields",
					operator: "or",
					tie_breaker: 0.3,
				},
			});
		}

		if (query.username) {
			searchBody.query.bool.should.push({
				match: { username: { query: query.username, boost: 3 } },
			});
		}

		if (query.firstName) {
			searchBody.query.bool.should.push({
				match: { firstName: { query: query.firstName, boost: 2 } },
			});
		}

		if (query.lastName) {
			searchBody.query.bool.should.push({
				match: { lastName: { query: query.lastName, boost: 2 } },
			});
		}

		if (searchBody.query.bool.should.length === 0) {
			searchBody.query = { match_all: {} };
		}

		const response = await this._client.search({
			index: "users",
			body: searchBody,
		});

		const hits = (response.hits?.hits || []) as Array<
			ElasticSearchHit<UserDocument>
		>;

		const totalValue =
			typeof response.hits?.total === "number"
				? response.hits.total
				: (response.hits?.total as any)?.value || 0;

		return {
			items: hits.map((hit) => ({
				id: hit._source.userId,
				score: hit._score || 0,
				username: hit._source.username,
				firstName: hit._source.firstName,
				lastName: hit._source.lastName,
				createdAt:
					hit._source.createdAt instanceof Date
						? hit._source.createdAt
						: new Date(hit._source.createdAt),
			})),
			total: totalValue,
			took: response.took || 0,
		} as UserSearchResults;
	}
}
