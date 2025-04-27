import assert from "node:assert/strict";
import { makeService } from "../../make-service";
import { type InShape, ListDtoIn, ListDtoOut, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto);

	const events = await context.eventsRepository.list({
		toUserId: getUserDto.id,
		fromUserId: dto.fromUserId,
		limit: dto.limit,
		offset: dto.offset,
		orderDirection: dto.orderDirection,
		orderField: dto.orderField,
	});

	return ListDtoOut.create({
		data: events.data.map((event) => ({
			id: event.id,
			name: event.name,
			payload: event.payload,
			toUserId: event.toUserId,
			fromUserId: event.fromUserId,
			createdAt: event.createdAt,
		})),
		total: events.total,
	});
}, ListDtoIn);
