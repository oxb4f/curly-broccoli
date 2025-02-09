import {
	bigint,
	date,
	index,
	json,
	pgTable,
	varchar,
} from "drizzle-orm/pg-core";

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
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	birthday: date("birthday", { mode: "string" }),
	social: json("social"),
	imageUrl: varchar("image_url", { length: 255 }),
});

export const images = pgTable("images", {
	id: bigint("id", { mode: "number" }).primaryKey(),
	path: varchar("path", { length: 255 }).notNull().unique(),
});
