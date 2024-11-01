import { bigint, index, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const accesses = pgTable(
	"accesses",
	{
		id: bigint("id", { mode: "number" }).notNull().primaryKey(),
		login: varchar("login", { length: 128 }).notNull(),
		password: varchar("password", { length: 64 }).notNull(),
		refreshTokens: json("refresh_tokens").notNull(),
		userId: bigint("user_id", { mode: "number" })
			.notNull()
			.references(() => users.id),
	},
	(accesses) => ({
		loginUserIdIdx: index("login_user_idx").on(accesses.login, accesses.userId),
	}),
);

export const users = pgTable("users", {
	id: bigint("id", { mode: "number" }).primaryKey(),
	username: varchar("username", { length: 128 }).notNull().unique(),
});
