import assert from "node:assert";
import { ServiceError } from "../../../errors/error";
import { makeService } from "../../../make-service";
import { DeleteDtoIn, DeleteDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		accessId: dto.accessId,
	});

	assert(getUserDto, "User not found");

	const userBook = await context.userBooksRepository.get({
		id: dto.bookId,
		userId: getUserDto.id,
	});

	if (!userBook) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "Book not found",
			details: [{ path: ["bookId"], message: "Book not found" }],
		});
	}

	await context.userBooksRepository.delete({
		id: userBook.id,
	});

	return DeleteDtoOut.create({
		id: userBook.id,
	});
}, DeleteDtoIn);
