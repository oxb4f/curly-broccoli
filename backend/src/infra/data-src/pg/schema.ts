import {
	bigint,
	date,
	index,
	json,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const base = {
	id: bigint("id", { mode: "number" }).notNull().primaryKey(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" })
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => new Date().toISOString()),
};

export const accesses = pgTable(
	"accesses",
	{
		...base,
		login: varchar("login", { length: 128 }).notNull(),
		password: varchar("password", { length: 64 }).notNull(),
		refreshTokens: json("refresh_tokens").notNull(),
		userId: bigint("user_id", { mode: "number" })
			.notNull()
			.references(() => users.id),
	},
	(accesses) => [index("login_user_idx").on(accesses.login, accesses.userId)],
);

export const users = pgTable("users", {
	...base,
	username: varchar("username", { length: 128 }).notNull().unique(),
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	birthday: date("birthday", { mode: "string" }),
	social: json("social"),
	imageUrl: varchar("image_url", { length: 255 }),
});

export const images = pgTable("images", {
	...base,
	path: varchar("path", { length: 255 }).notNull().unique(),
});
