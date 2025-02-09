import { beforeEach, describe, expect, mock, test } from "bun:test";
import { ServiceError } from "../../../../src/services/errors/error";
import getUserService from "../../../../src/services/users/get/action";
import { GetUserDtoOut } from "../../../../src/services/users/get/dto.out";
import { context, createdUserFixture1 } from "../fixtures";

const fixture = {
	userId: 1,
	accessId: 1,
};

test("Unit test: User Update Service", () => {
	const service = getUserService;

	beforeEach(() => mock.restore());

	describe("should return valid dto", async () => {
		context.usersRepository.getUser =
			mock().mockResolvedValueOnce(createdUserFixture1);

		const dto = await service({ dto: fixture, context: context });

		expect(dto).toBeInstanceOf(GetUserDtoOut);
		expect(dto.id).toBeInteger();
		expect(dto.username).toBeString();
		expect(dto.firstName).toBeString();
		expect(dto.lastName).toBeString();
		expect(dto.birthday).toBeDate();
		expect(dto.social).toBeObject();
		expect(dto.social.telegram).toBeString();
		expect(dto.social.instagram).toBeString();
		expect(dto.imageUrl).toBeString();
		expect(context.usersRepository.getUser).toBeCalledTimes(1);
	});

	describe("should throw an error if user does not exist", async () => {
		context.usersRepository.getUser = mock().mockResolvedValueOnce(null);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if validation was failed", async () => {
		context.usersRepository.getUser =
			mock().mockResolvedValueOnce(createdUserFixture1);

		await expect(
			service({
				dto: { ...fixture, userId: "test" as any },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});
});
