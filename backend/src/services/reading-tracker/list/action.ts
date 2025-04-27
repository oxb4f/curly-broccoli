import assert from "node:assert";
import { ReadingTracker, type State } from "../../../entities/reading-tracker";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

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

	const { data, total } = await context.readingTrackersRepository.list({
		userBookId: dto.userBookId,
		state: dto.state as State,
		limit: dto.limit,
		offset: dto.offset,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
	});

	return ListDtoOut.create({
		trackers: data.map((readingTracker) => ({
			id: readingTracker.id,
			userBookId: readingTracker.userBookId,
			state: readingTracker.state,
			finishedAt: readingTracker.finishedAt,
			createdAt: readingTracker.createdAt,
			readingRecords: ReadingTracker.sortReadingRecords(
				readingTracker.readingRecords,
			).map((readingRecord) => ({
				id: readingRecord.getId(),
				createdAt: readingRecord.getCreatedAt(),
				duration: readingRecord.getDuration(),
			})),
		})),
		total,
	});
}, ListDtoIn);
