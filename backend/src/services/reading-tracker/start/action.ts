import assert from "node:assert";
import { ReadingTracker, STATE } from "../../../entities/reading-tracker";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import { CreateDtoIn, CreateDtoOut, type InShape, type OutShape } from "./dto";
import { followersEventsFactory } from "../../events/factories/followers-events";
import { ReadingTrackerStartEvent } from "../../../entities/events/reading-trackers/reading-tracker-start-event";

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
			message: "Book not found",
			details: [{ path: ["userBookId"], message: "Book not found" }],
		});
	}

	const isStartedReadingTrackerExists =
		await context.readingTrackersRepository.exists({
			userBookId: userBook.id,
			state: STATE.READING,
		});

	if (isStartedReadingTrackerExists) {
		ServiceError.throwConflict("Reading tracker already started");
	}

	await followersEventsFactory({
		userId: getUserDto.id,
		context,
		eventGeneratorFn: ({ follower, user }) =>
			new ReadingTrackerStartEvent({
				toUserId: follower.id,
				fromUserId: user.id,
				profile: {
					title: userBook.profile.title,
					imageUrl: userBook.profile.imageUrl,
					description: userBook.profile.description,
				},
				userBookId: userBook.id,
			}),
	});

	const readingTracker = await ReadingTracker.from({
		userBookId: userBook.id,
	});

	await context.readingTrackersRepository.create(readingTracker);

	return CreateDtoOut.create({
		id: readingTracker.getId(),
		userBookId: userBook.id,
		state: readingTracker.getState(),
		finishedAt: readingTracker.getFinishedAt(),
		createdAt: readingTracker.getCreatedAt(),
		readingRecords: readingTracker.getReadingRecords().map((readingRecord) => ({
			id: readingRecord.getId(),
			createdAt: readingRecord.getCreatedAt(),
			duration: readingRecord.getDuration(),
		})),
	});
}, CreateDtoIn);
