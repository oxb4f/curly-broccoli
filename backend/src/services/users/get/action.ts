import { User } from "../../../entities/user";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	GetUserDtoIn,
	GetUserDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const getUserDto = await context.usersRepository.get({
		id: dto.userId,
		accessId: dto.accessId,
	});

	if (!getUserDto) {
		ServiceError.throw(ServiceError.ERROR_TYPE.NOT_FOUND, {
			message: "User not found",
			details: [{ path: ["userId"], message: "User not found" }],
		});
	}

	const user = await User.from(getUserDto);

	return GetUserDtoOut.create({
		id: user.getId(),
		username: user.getUsername(),
		firstName: user.getFirstName(),
		lastName: user.getLastName(),
		birthday: user.getBirthday(),
		social: user.getSocial(),
		imageUrl: user.getImageUrl(),
	});
}, GetUserDtoIn);
