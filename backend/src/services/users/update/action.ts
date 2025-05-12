import { User } from "../../../entities/user";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	type InShape,
	type OutShape,
	UpdateUserDtoIn,
	UpdateUserDtoOut,
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

	if (dto.username) {
		const isUsersWithSameUsernameExist = await context.usersRepository.exists({
			username: dto.username,
			notId: user.getId(),
		});

		if (isUsersWithSameUsernameExist) {
			ServiceError.throw(ServiceError.ERROR_TYPE.DUPLICATED, {
				message: "User not found",
				details: [
					{
						path: ["username"],
						message: "User already exists with this username",
					},
				],
			});
		}
	}

	await user.update(dto);

	await context.usersRepository.update(
		{
			id: user.getId(),
		},
		{
			username: user.getUsername(),
			firstName: user.getFirstName(),
			lastName: user.getLastName(),
			birthday: user.getBirthday(),
			social: user.getSocial(),
			imageUrl: user.getImageUrl(),
		},
	);

	await context.search.updateUserIndex({
		userId: String(user.getId()),
		username: user.getUsername(),
		firstName: user.getFirstName() ?? "",
		lastName: user.getLastName() ?? "",
	});

	return UpdateUserDtoOut.create({
		id: user.getId(),
		username: user.getUsername(),
		firstName: user.getFirstName(),
		lastName: user.getLastName(),
		birthday: user.getBirthday(),
		social: user.getSocial(),
		imageUrl: user.getImageUrl(),
	});
}, UpdateUserDtoIn);
