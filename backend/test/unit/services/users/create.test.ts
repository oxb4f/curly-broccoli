import { beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { User } from "../../../../src/entities/user";
import { ServiceError } from "../../../../src/services/errors/error";
import createUserService from "../../../../src/services/users/create/action";
import { context, createdUserFixture1 } from "../fixtures";

const fixture = {
	username: "testuser",
	password: "testStrong$Pass8",
	refreshId: "1",
};

test("Unit test: User Create Service", () => {
	const service = createUserService;

	beforeEach(() => mock.restore());

	describe("should return valid dto", async () => {
		spyOn(User, "fromCredentials").mockResolvedValue([
			createdUserFixture1,
			"test",
			"test",
		]);

		const dto = await service({ dto: fixture, context: context });

		expect(dto.id).toBeInteger();
		expect(dto.jwt).toBeObject();
		expect(dto.jwt.access).toBeString();
		expect(dto.jwt.refresh).toBeString();
		expect(dto.username).toBeString();
		expect(User.fromCredentials).toBeCalled();
		expect(context.usersRepository.exists).toBeCalled();
		expect(context.usersRepository.createFromEntity).toBeCalled();
	});

	describe("should throw an error if user already exist", async () => {
		spyOn(User, "fromCredentials").mockResolvedValue([
			createdUserFixture1,
			"test",
			"test",
		]);
		spyOn(context.usersRepository, "exists").mockResolvedValueOnce(true);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if validation was failed", async () => {
		spyOn(User, "fromCredentials").mockResolvedValue([
			createdUserFixture1,
			"test",
			"test",
		]);

		await expect(
			service({
				dto: { ...fixture, password: "1", username: "" },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});
});
