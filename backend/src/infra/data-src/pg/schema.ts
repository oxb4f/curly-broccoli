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
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" })
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => new Date()),
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
		bookId: bigint("book_id", { mode: "number" })
			.references(() => books.id)
			.notNull(),
		userId: bigint("user_id", { mode: "number" })
			.references(() => users.id)
			.notNull(),
		bookProfileId: bigint("book_profile_id", { mode: "number" })
			.references(() => bookProfiles.id)
			.notNull(),
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

export const readingTrackers = pgTable(
	"reading_trackers",
	{
		...base,
		finishedAt: timestamp("finished_at", { mode: "date" }),
		state: varchar("state", { length: 255 }).notNull(),
		userBookId: bigint("user_book_id", { mode: "number" })
			.references(() => userBooks.id)
			.notNull(),
		lastResumeAt: timestamp("last_resume_at", { mode: "date" }),
	},
	(readingTrackers) => [
		index("state_user_book_idx").on(
			readingTrackers.state,
			readingTrackers.userBookId,
		),
	],
);

export const readingRecords = pgTable("reading_records", {
	...base,
	readingTrackerId: bigint("reading_tracker_id", { mode: "number" })
		.references(() => readingTrackers.id)
		.notNull(),
	duration: integer("duration").notNull(),
});

export const followers = pgTable(
	"followers",
	{
		...base,
		userId: bigint("user_id", { mode: "number" })
			.references(() => users.id)
			.notNull(),
		followerId: bigint("follower_id", { mode: "number" })
			.references(() => users.id)
			.notNull(),
	},
	(followers) => [
		index("user_follower_idx").on(followers.userId, followers.followerId),
	],
);

export const events = pgTable(
	"events",
	{
		...base,
		name: varchar("name", { length: 255 }).notNull(),
		payload: json("payload").notNull(),
		toUserId: bigint("to_user_id", { mode: "number" })
			.references(() => users.id)
			.notNull(),
		fromUserId: bigint("from_user_id", { mode: "number" })
			.references(() => users.id)
			.notNull(),
	},
	(events) => [index("name_to_user_id_idx").on(events.name, events.toUserId)],
);
