import type { ReadingRecord, State } from "../../entities/readingRecord";
import type { FinishedAt, LastResumeAt, ReadingTracker } from "../../entities/readingTracker";
import type { CreatedAt, UpdatedAt } from "../../entities/base";
import type { Id } from "../../entities/types/id";
import type { BaseRepository, OrderDirection } from "../base-repository";
import type { RepositoryTypes } from "../base-repository";

export type ExistsArgs = {
	id?: Id;
	userBookId?: Id;
	state?: State;
	finishedAt?: FinishedAt;
};

export type GetReadingTrackerFilter = {
	userBookId?: Id;
	id?: Id;
	state?: State;
	finishedAt?: FinishedAt;
};

export interface GetReadingTrackerDto {
	id: Id;
	userBookId: Id;
	createdAt: CreatedAt;
	updatedAt: UpdatedAt;
	finishedAt: FinishedAt;
	state: State;
	lastResumeAt: LastResumeAt;
	readingRecords: ReadingRecord[];
}

export type ReadingTrackerUpdateData = {
	state?: State;
	finishedAt?: FinishedAt;
	lastResumeAt?: LastResumeAt;
	readingRecords?: ReadingRecord[];
};

export type ListReadingTrackerFilter = {
	userBookId: Id;
	state?: State;
	limit?: number;
	offset?: number;
	orderDirection?: OrderDirection;
	orderField?: string;
};

export type ListReadingTrackerDto = {
	data: {
		id: Id;
		userBookId: Id;
		createdAt: CreatedAt;
		updatedAt: UpdatedAt;
		finishedAt: FinishedAt;
		state: State;
		lastResumeAt: LastResumeAt;
		readingRecords: ReadingRecord[];
	}[];
	total: number;
};

export interface ReadingTrackersRepository
	extends BaseRepository<
		RepositoryTypes<
			ReadingTracker,
			ListReadingTrackerDto,
			GetReadingTrackerDto | null,
			ListReadingTrackerFilter,
			GetReadingTrackerFilter,
			ReadingTrackerUpdateData
		>
	> {
	create(readingTracker: ReadingTracker): Promise<void>;
	update(
		filter: GetReadingTrackerFilter,
		readingTracker: ReadingTrackerUpdateData,
	): Promise<void>;
	get(filter: GetReadingTrackerFilter): Promise<GetReadingTrackerDto | null>;
	exists(args: ExistsArgs): Promise<boolean>;
	list(filter: ListReadingTrackerFilter): Promise<ListReadingTrackerDto>;
}
