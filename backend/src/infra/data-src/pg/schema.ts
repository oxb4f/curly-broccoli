import {
	bigint,
	boolean,
	date,
	index,
	integer,
	json,
	pgTable,
	text,
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

export const books = pgTable("books", {
	...base,
	bookProfileId: bigint("book_profile_id", { mode: "number" }).references(
		() => bookProfiles.id,
	),
	isPublic: boolean("is_public").notNull().default(false),
});

export const bookProfiles = pgTable("book_profiles", {
	...base,
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description"),
	author: varchar("author", { length: 255 }).notNull(),
	genre: varchar("genre", { length: 255 }),
	numberOfPages: integer("number_of_pages").notNull(),
	isbn: varchar("isbn", { length: 255 }),
	imageUrl: varchar("image_url", { length: 255 }),
});

export const userBooks = pgTable(
	"user_books",
	{
		...base,
		bookId: bigint("book_id", { mode: "number" }).references(() => books.id),
		userId: bigint("user_id", { mode: "number" }).references(() => users.id),
		bookProfileId: bigint("book_profile_id", { mode: "number" }).references(
			() => bookProfiles.id,
		),
		isFavorite: boolean("is_favorite").notNull().default(false),
		isRead: boolean("is_read").notNull().default(false),
		rating: integer("rating"),
		review: text("review"),
	},
	(userBooks) => [
		index("book_user_idx").on(userBooks.bookId, userBooks.userId),
		index("favorite_user_idx").on(userBooks.isFavorite, userBooks.userId),
	],
);
