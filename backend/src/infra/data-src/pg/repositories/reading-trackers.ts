import { and, count, eq, inArray } from "drizzle-orm";
import { ReadingRecord, type State } from "../../../../entities/reading-record";
import type { ReadingTracker } from "../../../../entities/reading-tracker";
import type {
	ExistsArgs,
	GetReadingTrackerFilter,
	ListReadingTrackerDto,
	ListReadingTrackerFilter,
	ReadingTrackerUpdateData,
	ReadingTrackersRepository,
} from "../../../../services/reading-tracker/repository";
import { readingRecords, readingTrackers, userBooks } from "../schema";
import { BaseRepository } from "./base";

export class PgReadingTrackersRepository
	extends BaseRepository
	implements ReadingTrackersRepository
{
	async get(filter: GetReadingTrackerFilter) {
		const where = this.transformObjectIntoEqSequence(filter, readingTrackers);

		if (!where.length) return null;

		const query = this._connection
			.select()
			.from(readingTrackers)
			.where(and(...where))
			.innerJoin(userBooks, eq(readingTrackers.userBookId, userBooks.id))
			.limit(1);

		const result = await query.execute();

		if (!result?.[0]) {
			return null;
		}

		const id = result[0].reading_trackers.id;

		const readingRecordsResult = await this.getReadingRecords([id]);

		return {
			id: result[0].reading_trackers.id,
			userBookId: result[0].reading_trackers.userBookId,
			createdAt: result[0].reading_trackers.createdAt,
			updatedAt: result[0].reading_trackers.updatedAt,
			finishedAt: result[0].reading_trackers.finishedAt,
			state: result[0].reading_trackers.state as State,
			lastResumeAt: result[0].reading_trackers.lastResumeAt,
			readingRecords: await Promise.all(
				readingRecordsResult[id]?.map((record) => ReadingRecord.from(record)) ??
					[],
			),
		};
	}

	async list(filter: ListReadingTrackerFilter): Promise<ListReadingTrackerDto> {
		const total = await this.getTotal(filter);

		const data: ListReadingTrackerDto["data"] = [];

		if (!total) return { data, total };

		const query = this._connection
			.select()
			.from(readingTrackers)
			.innerJoin(
				userBooks,
				and(
					eq(readingTrackers.userBookId, userBooks.id),
					eq(userBooks.id, filter.userBookId),
				),
			)
			.$dynamic();

		if (filter.state) {
			query.where(eq(readingTrackers.state, filter.state));
		}

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(
			query,
			readingTrackers,
			filter.orderDirection,
			filter.orderField,
		);

		const readingTrackersResult = await query.execute();

		const readingRecordsResult = await this.getReadingRecords(
			readingTrackersResult.map((row) => row.reading_trackers.id),
		);

		for (const row of readingTrackersResult) {
			data.push({
				id: row.reading_trackers.id,
				userBookId: row.reading_trackers.userBookId,
				createdAt: row.reading_trackers.createdAt,
				updatedAt: row.reading_trackers.updatedAt,
				finishedAt: row.reading_trackers.finishedAt,
				state: row.reading_trackers.state as State,
				lastResumeAt: row.reading_trackers.lastResumeAt,
				readingRecords: await Promise.all(
					readingRecordsResult[row.reading_trackers.id]?.map((record) =>
						ReadingRecord.from(record),
					) ?? [],
				),
			});
		}

		return {
			data,
			total,
		};
	}

	private async getTotal(filter: ListReadingTrackerFilter) {
		const query = this._connection
			.select({ total: count() })
			.from(readingTrackers)
			.innerJoin(
				userBooks,
				and(
					eq(readingTrackers.userBookId, userBooks.id),
					eq(userBooks.id, filter.userBookId),
				),
			);

		if (filter.state) {
			query.where(eq(readingTrackers.state, filter.state));
		}

		const result = await query.execute();

		return result[0]?.total ?? 0;
	}

	async create(readingTracker: ReadingTracker) {
		await this._connection
			.insert(readingTrackers)
			.values({
				id: readingTracker.getId(),
				userBookId: readingTracker.getUserBookId(),
				finishedAt: readingTracker.getFinishedAt(),
				state: readingTracker.getState(),
				lastResumeAt: readingTracker.getLastResumeAt(),
				createdAt: readingTracker.getCreatedAt(),
				updatedAt: readingTracker.getUpdatedAt(),
			})
			.execute();
	}

	async update(
		filter: GetReadingTrackerFilter,
		readingTracker: ReadingTrackerUpdateData,
	) {
		if (!filter.id) return;

		if (Array.isArray(readingTracker.readingRecords)) {
			await this._connection
				.insert(readingRecords)
				.values(
					readingTracker.readingRecords.map((record) => ({
						id: record.getId(),
						readingTrackerId: record.getReadingTrackerId(),
						duration: record.getDuration(),
						createdAt: record.getCreatedAt(),
					})) ?? [],
				)
				.onConflictDoNothing({ target: readingRecords.id })
				.execute();
		}

		await this._connection
			.update(readingTrackers)
			.set({
				finishedAt: readingTracker.finishedAt,
				state: readingTracker.state,
				lastResumeAt: readingTracker.lastResumeAt,
			})
			.where(eq(readingTrackers.id, filter.id))
			.execute();
	}

	async delete(): Promise<never> {
		throw new Error("Not implemented");
	}

	async exists(args: ExistsArgs): Promise<boolean> {
		const where = this.transformObjectIntoEqSequence(args, readingTrackers);

		if (!where.length) return false;

		const query = this._connection
			.select()
			.from(readingTrackers)
			.where(and(...where))
			.limit(1);

		const result = await query.execute();

		return !!result?.[0];
	}

	private async getReadingRecords(readingTrackerIds: number[]) {
		return (
			await this._connection
				.select()
				.from(readingRecords)
				.where(inArray(readingRecords.readingTrackerId, readingTrackerIds))
				.execute()
		).reduce(
			(acc, record) => {
				acc[record.readingTrackerId] = [
					...(acc[record.readingTrackerId] ?? []),
					record,
				];

				return acc;
			},
			{} as Record<number, (typeof readingRecords.$inferSelect)[]>,
		);
	}
}
