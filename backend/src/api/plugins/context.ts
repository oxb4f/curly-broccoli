import assert from "node:assert/strict";
import { Elysia } from "elysia";
import { getConnection } from "../../infra/data-src/pg/connection";
import { migrateDb } from "../../infra/data-src/pg/migration";
import { PgUsersRepository } from "../../infra/data-src/pg/repositories/users";
import type { Context } from "../../services/context";
import { configPlugin } from "./config";

export const contextPlugin = new Elysia({ name: "contextPlugin" })
	.use(configPlugin)
	.derive({ as: "scoped" }, async ({ config }) => {
		assert(config);

		const dbCredentials = {
			user: config.POSTGRES_USER,
			port: config.POSTGRES_PORT,
			db: config.POSTGRES_DB,
			host: config.POSTGRES_HOST,
			password: config.POSTGRES_PASSWORD,
		};

		const dbConnection = await getConnection(dbCredentials);

		await migrateDb(dbCredentials);

		return {
			context: {
				config,
				usersRepository: new PgUsersRepository(dbConnection),
			} satisfies Context,
		};
	});
