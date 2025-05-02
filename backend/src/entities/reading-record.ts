import { Base, type CreatedAt, type UpdatedAt } from "./base";
import type { Id, MaybeNumberId } from "./types/id";

export type IsPublic = boolean;
export type State = "reading" | "finished" | "paused";
export type Duration = number;
export type NumberOfPages = number;

interface ReadingRecordData {
	id?: MaybeNumberId;
	readingTrackerId: Id;
	duration: Duration;
	createdAt?: CreatedAt;
	updatedAt?: UpdatedAt;
}

export class ReadingRecord extends Base {
	private _readingTrackerId: Id;
	private _duration: Duration;

	private constructor(payload: ReadingRecordData) {
		super({
			id: payload.id,
			createdAt: payload.createdAt,
			updatedAt: payload.updatedAt,
		});

		this._readingTrackerId = payload.readingTrackerId;
		this._duration = payload.duration;
	}

	static async from(payload: ReadingRecordData): Promise<ReadingRecord> {
		return new ReadingRecord({ ...payload });
	}

	getReadingTrackerId(): Id {
		return this._readingTrackerId;
	}

	getDuration(): Duration {
		return this._duration;
	}

	toPlainObject(): ReadingRecordData {
		return {
			id: this._id,
			readingTrackerId: this._readingTrackerId,
			duration: this._duration,
		};
	}
}
