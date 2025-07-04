import assert from "node:assert/strict";
import { Elysia } from "elysia";
import { getConnection } from "../../infra/data-src/pg/connection";
import { PgAccessesRepository } from "../../infra/data-src/pg/repositories/accesses";
import { PgBooksRepository } from "../../infra/data-src/pg/repositories/books";
import { PgEventsRepository } from "../../infra/data-src/pg/repositories/events";
import { PgFollowersRepository } from "../../infra/data-src/pg/repositories/followers";
import { PgImagesRepository } from "../../infra/data-src/pg/repositories/images";
import { PgReadingTrackersRepository } from "../../infra/data-src/pg/repositories/reading-trackers";
import { PgUserBooksRepository } from "../../infra/data-src/pg/repositories/user-books";
import { PgUsersRepository } from "../../infra/data-src/pg/repositories/users";
import { DbEventDispatcher } from "../../infra/event-dispatcher/dispatcher";
import { createStorage } from "../../infra/file-storage/factory";
import { defaultServiceLogger } from "../../infra/logger";
import { createSearch } from "../../infra/search/factory";
import type { Context } from "../../services/context";
import { configPlugin } from "./config";

export const contextPlugin = new Elysia({ name: "contextPlugin" })
	.use(configPlugin)
	.derive({ as: "global" }, async ({ config }) => {
		assert(config);

		const dbCredentials = {
			user: config.POSTGRES_USER,
			port: config.POSTGRES_PORT,
			db: config.POSTGRES_DB,
			host: config.POSTGRES_HOST,
			password: config.POSTGRES_PASSWORD,
		};

		const dbConnection = await getConnection(dbCredentials);

		return {
			context: {
				config,
				usersRepository: new PgUsersRepository(dbConnection),
				accessesRepository: new PgAccessesRepository(dbConnection),
				imagesRepository: new PgImagesRepository(dbConnection),
				booksRepository: new PgBooksRepository(dbConnection),
				userBooksRepository: new PgUserBooksRepository(dbConnection),
				readingTrackersRepository: new PgReadingTrackersRepository(
					dbConnection,
				),
				followersRepository: new PgFollowersRepository(dbConnection),
				eventsRepository: new PgEventsRepository(dbConnection),
				fileStorage: createStorage(),
				eventDispatcher: new DbEventDispatcher(dbConnection),
				logger: defaultServiceLogger,
				search: await createSearch(),
			} satisfies Context,
		};
	});
