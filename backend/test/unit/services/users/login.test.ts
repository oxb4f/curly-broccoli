import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { User } from "../../../../src/entities/user";
import { ServiceError } from "../../../../src/services/errors/error";
import { factory } from "../../../../src/services/users/login/action";
import { LoginDtoOut } from "../../../../src/services/users/login/dto.out";
import { context, createdUserFixture1 } from "../fixtures";

const fixture = {
	username: "testuser",
	password: "testStrong$Pass8",
	refreshId: "1",
};

test("Unit test: User Login Service", () => {
	const service = factory();

	afterEach(() => mock.restore());

	describe("should return valid dto", async () => {
		User.prototype.login = mock().mockResolvedValueOnce({
			jwtAccess: "test",
			refreshToken: "test",
		});

		spyOn(context.usersRepository, "getUser").mockResolvedValueOnce(
			createdUserFixture1,
		);

		const dto = await service({ dto: fixture, context: context });

		expect(dto).toBeInstanceOf(LoginDtoOut);
		expect(dto.id).toBeInteger();
		expect(dto.jwt).toBeObject();
		expect(dto.jwt.access).toBeString();
		expect(dto.jwt.refresh).toBeString();
		expect(dto.username).toBeString();
		expect(User.prototype.login).toBeCalledTimes(1);
		expect(context.usersRepository.getUser).toBeCalledTimes(1);
		expect(context.usersRepository.updateFromEntity).toBeCalledTimes(1);
	});

	describe("should throw auth error if user does not exist", async () => {
		spyOn(context.usersRepository, "getUser").mockResolvedValueOnce(null);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw auth error if password does not match", async () => {
		User.prototype.login = mock().mockResolvedValueOnce({});

		spyOn(context.usersRepository, "getUser").mockResolvedValueOnce(
			createdUserFixture1,
		);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if validation was failed", async () => {
		User.prototype.login = mock().mockResolvedValueOnce({
			jwtAccess: "test",
			refreshToken: "test",
		});

		spyOn(context.usersRepository, "getUser").mockResolvedValueOnce(
			createdUserFixture1,
		);

		await expect(
			service({
				dto: { ...fixture, username: "", password: "" },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});
});