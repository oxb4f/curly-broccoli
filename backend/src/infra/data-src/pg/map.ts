import { PgAccessesRepository } from "./repositories/accesses";
import { PgBooksRepository } from "./repositories/books";
import { PgFollowersRepository } from "./repositories/followers";
import { PgImagesRepository } from "./repositories/images";
import { PgReadingTrackersRepository } from "./repositories/reading-trackers";
import { PgUserBooksRepository } from "./repositories/user-books";
import { PgUsersRepository } from "./repositories/users";

const MAP = {
	users: PgUsersRepository,
	books: PgBooksRepository,
	user_books: PgUserBooksRepository,
	reading_trackers: PgReadingTrackersRepository,
	followers: PgFollowersRepository,
	accesses: PgAccessesRepository,
	images: PgImagesRepository,
};

export function mapTableToRepostory(
	table: keyof typeof MAP,
): (typeof MAP)[keyof typeof MAP] {
	return MAP[table];
}
