import { beforeEach, describe, expect, mock, test } from "bun:test";
import { ServiceError } from "../../../../src/services/errors/error";
import updateUserService from "../../../../src/services/users/update/action";
import { context, createdUserFixture1 } from "../fixtures";

const fixture = {
	userId: 1,
	accessId: 1,
	firstName: "testuser",
	lastName: "test",
	birthday: new Date(),
	username: "testusername",
	social: {
		telegram: "https://test.example",
		instagram: "https://test.example",
	},
	imageUrl: "https://test.com/test.png",
};

test("Unit test: User Update Service", () => {
	const service = updateUserService;

	beforeEach(() => mock.restore());

	describe("should return valid dto", async () => {
		context.usersRepository.get =
			mock().mockResolvedValueOnce(createdUserFixture1);
		context.usersRepository.exists = mock().mockResolvedValueOnce(null);
		context.usersRepository.update = mock().mockResolvedValueOnce(fixture);

		const dto = await service({ dto: fixture, context: context });

		expect(dto.id).toBeInteger();
		expect(dto.username).toBeString();
		expect(dto.firstName).toBeString();
		expect(dto.lastName).toBeString();
		expect(dto.birthday).toBeDate();
		expect(dto.social).toBeObject();
		expect(dto.social?.telegram).toBeString();
		expect(dto.social?.instagram).toBeString();
		expect(dto.imageUrl).toBeString();
		expect(context.usersRepository.get).toBeCalledTimes(1);
		expect(context.usersRepository.update).toBeCalledTimes(1);
		expect(context.usersRepository.exists).toBeCalledTimes(1);
	});

	describe("should throw an error if user does not exist", async () => {
		context.usersRepository.get = mock().mockResolvedValueOnce(null);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if username is already exist", async () => {
		context.usersRepository.get =
			mock().mockResolvedValueOnce(createdUserFixture1);
		context.usersRepository.exists = mock().mockResolvedValueOnce(true);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if validation was failed", async () => {
		context.usersRepository.get =
			mock().mockResolvedValueOnce(createdUserFixture1);

		await expect(
			service({
				dto: { ...fixture, firstName: "", lastName: "" },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if birthday is invalid", async () => {
		context.usersRepository.get =
			mock().mockResolvedValueOnce(createdUserFixture1);

		await expect(
			service({
				dto: { ...fixture, birthday: "test" as any },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if social is invalid", async () => {
		context.usersRepository.get =
			mock().mockResolvedValueOnce(createdUserFixture1);

		await expect(
			service({
				dto: { ...fixture, social: "test" as any },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});
});
