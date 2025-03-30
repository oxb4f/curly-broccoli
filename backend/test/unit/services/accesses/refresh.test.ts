import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { Access } from "../../../../src/entities/access";
import refreshAccessService from "../../../../src/services/accesses/refresh/action";
import { ServiceError } from "../../../../src/services/errors/error";
import { context, createdAccessFixture1 } from "../fixtures";

const fixture = {
	refresh: "testuser",
	accessId: 1,
	refreshId: "1",
};

test("Unit test: Access Refresh Service", () => {
	const service = refreshAccessService;

	afterEach(() => mock.restore());

	describe("should return valid dto", async () => {
		Access.prototype.refresh = mock().mockResolvedValueOnce({
			jwtAccess: "test",
			refreshToken: "test",
		});

		spyOn(context.accessesRepository, "get").mockResolvedValueOnce(
			createdAccessFixture1,
		);

		const dto = await service({ dto: fixture, context: context });

		expect(dto.jwt).toBeObject();
		expect(dto.jwt.access).toBeString();
		expect(dto.jwt.refresh).toBeString();
		expect(context.accessesRepository.get).toBeCalledTimes(1);
		expect(context.accessesRepository.update).toBeCalledTimes(1);
	});

	describe("should throw an error if access does not exist", async () => {
		spyOn(context.accessesRepository, "get").mockResolvedValueOnce(null);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if refresh was failed", async () => {
		Access.prototype.refresh = mock().mockResolvedValueOnce({});

		spyOn(context.accessesRepository, "get").mockResolvedValueOnce(
			createdAccessFixture1,
		);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});
});
