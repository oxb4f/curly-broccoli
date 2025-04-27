import { Base, type CreatedAt, type UpdatedAt } from "./base";
import { EntityValidationError } from "./errors/validation";
import { ReadingRecord } from "./reading-record";
import type { Id, MaybeNumberId } from "./types/id";

export const STATE = {
	READING: "reading",
	FINISHED: "finished",
	PAUSED: "paused",
} as const;

export type State = (typeof STATE)[keyof typeof STATE];
export type FinishedAt = Date | undefined | null;
export type LastResumeAt = Date | undefined | null;

interface ReadingTrackerData {
	id?: MaybeNumberId;
	userBookId: Id;
	finishedAt?: FinishedAt;
	state?: State;
	readingRecords?: ReadingRecord[];
	createdAt?: CreatedAt;
	updatedAt?: UpdatedAt;
	lastResumeAt?: LastResumeAt;
}

export class ReadingTracker extends Base {
	private _userBookId: Id;
	private _finishedAt?: FinishedAt;
	private _lastResumeAt?: LastResumeAt;
	private _state: State;
	private _readingRecords: ReadingRecord[];

	private constructor(payload: ReadingTrackerData) {
		super({
			id: payload.id,
			createdAt: payload.createdAt,
			updatedAt: payload.updatedAt,
		});

		this._userBookId = payload.userBookId;
		this._finishedAt = payload.finishedAt ?? null;
		this._state = payload.state ?? "reading";
		this._readingRecords = payload.readingRecords ?? [];
		this._lastResumeAt = payload.lastResumeAt ?? null;
	}

	static async from(payload: ReadingTrackerData): Promise<ReadingTracker> {
		return new ReadingTracker({ ...payload });
	}

	getUserBookId(): Id {
		return this._userBookId;
	}

	getFinishedAt(): FinishedAt {
		return this._finishedAt;
	}

	getState(): State {
		return this._state;
	}

	async pause() {
		if (this._state !== STATE.READING) {
			throw new EntityValidationError("Tracker is not in reading state");
		}

		this._state = STATE.PAUSED;
		this._finishedAt = new Date();

		await this._addReadingRecord();

		this._updatedAt = new Date();
	}

	resume() {
		if (this._state !== STATE.PAUSED) {
			throw new EntityValidationError("Tracker is not in paused state");
		}

		this._state = STATE.READING;
		this._finishedAt = null;
		this._lastResumeAt = new Date();

		this._updatedAt = new Date();
	}

	async finish() {
		if (
			![STATE.READING, STATE.PAUSED].includes(
				this._state as "reading" | "paused",
			)
		) {
			throw new EntityValidationError(
				"Tracker is not in reading or paused state",
			);
		}

		const oldState = this._state;

		this._state = STATE.FINISHED;
		this._finishedAt = new Date();

		if (oldState !== STATE.PAUSED) {
			await this._addReadingRecord();
		}

		this._updatedAt = new Date();
	}

	private async _addReadingRecord() {
		if (!this._finishedAt) return;

		const duration =
			this._finishedAt.getTime() -
			(this._lastResumeAt?.getTime() ?? this._createdAt.getTime());

		const readingRecord = await ReadingRecord.from({
			readingTrackerId: this._id,
			duration,
		});

		this._readingRecords.push(readingRecord);
	}

	getReadingRecords(): ReadingRecord[] {
		return ReadingTracker.sortReadingRecords(this._readingRecords);
	}

	getLastResumeAt(): LastResumeAt {
		return this._lastResumeAt;
	}

	static sortReadingRecords(readingRecords: ReadingRecord[]): ReadingRecord[] {
		return readingRecords.sort(
			(a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime(),
		);
	}

	toPlainObject(): ReadingTrackerData & {
		createdAt: Date;
		updatedAt: Date;
	} {
		return {
			id: this._id,
			userBookId: this._userBookId,
			createdAt: this._createdAt,
			updatedAt: this._updatedAt,
			finishedAt: this._finishedAt,
			state: this._state,
		};
	}
}
