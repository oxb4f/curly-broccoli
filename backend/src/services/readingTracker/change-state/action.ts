import assert from "node:assert";
import { EntityValidationError } from "../../../entities/errors/validation";
import { ReadingTracker } from "../../../entities/readingTracker";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	ChangeStateDtoIn,
	ChangeStateDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

function catchEntityErrors(error: any): never {
	if (error instanceof EntityValidationError) {
		ServiceError.throw(ServiceError.ERROR_TYPE.CONFLICT, {
			message: error.message,
			details: [{ path: ["state"], message: "Invalid state" }],
		});
	}

	throw error;
}

async function makeAction(
	action: "pause" | "resume" | "finish",
	readingTracker: ReadingTracker,
) {
	try {
		await readingTracker[action]();
	} catch (error) {
		catchEntityErrors(error);
	}
}

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const userBook = await context.userBooksRepository.get({
		id: dto.userBookId,
		userId: getUserDto.id,
	});

	if (!userBook) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "User book not found",
			details: [{ path: ["userBookId"], message: "User book not found" }],
		});
	}

	const readingTrackerDto = await context.readingTrackersRepository.get({
		id: dto.readingTrackerId,
		userBookId: userBook.id,
	});

	if (!readingTrackerDto) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Reading tracker not found",
			details: [
				{ path: ["readingTrackerId"], message: "Reading tracker not found" },
			],
		});
	}

	const readingTracker = await ReadingTracker.from(readingTrackerDto);

	await makeAction(dto.action, readingTracker);

	await context.readingTrackersRepository.update(
		{
			id: readingTrackerDto.id,
		},
		{
			finishedAt: readingTracker.getFinishedAt(),
			state: readingTracker.getState(),
			lastResumeAt: readingTracker.getLastResumeAt(),
			readingRecords: readingTracker.getReadingRecords(),
		},
	);

	return ChangeStateDtoOut.create({
		id: readingTracker.getId(),
		userBookId: readingTracker.getUserBookId(),
		state: readingTracker.getState(),
		createdAt: readingTracker.getCreatedAt(),
		finishedAt: readingTracker.getFinishedAt(),
		readingRecords: readingTracker.getReadingRecords().map((readingRecord) => ({
			id: readingRecord.getId(),
			createdAt: readingRecord.getCreatedAt(),
			duration: readingRecord.getDuration(),
		})),
	});
}, ChangeStateDtoIn);
