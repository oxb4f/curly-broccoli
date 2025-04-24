import type { Config } from "../infra/config";
import type { AccessesRepository } from "./accesses/repository";
import type { BooksRepository } from "./books/repository";
import type { UserBooksRepository } from "./books/repository";
import type { ImagesRepository } from "./images/repository";
import type { ReadingTrackersRepository } from "./readingTracker/repository";
import type { UsersRepository } from "./users/repository";

export type FileStoragePutPayload = {
	file: File;
	bucket?: string;
	name?: string;
	path?: string;
};

export type FileStorageGetPayload = {
	path?: string;
	bucket?: string;
	name?: string;
};

export interface FileStorage {
	put(payload: FileStoragePutPayload): Promise<void>;
	get(payload: FileStorageGetPayload): Promise<File>;
}

export interface Context {
	config: Config;
	fileStorage: FileStorage;
	usersRepository: UsersRepository;
	accessesRepository: AccessesRepository;
	imagesRepository: ImagesRepository;
	booksRepository: BooksRepository;
	userBooksRepository: UserBooksRepository;
	readingTrackersRepository: ReadingTrackersRepository;
}
