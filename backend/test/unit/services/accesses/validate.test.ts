import { afterEach, describe, expect, mock, test } from "bun:test";
import { Access } from "../../../../src/entities/access";
import { factory } from "../../../../src/services/accesses/validate/action";
import { ValidateDtoOut } from "../../../../src/services/accesses/validate/dto.out";
import { ServiceError } from "../../../../src/services/errors/error";
import { context } from "../fixtures";

const fixture = {
	jwtAccess: "token",
};

test("Unit test: Access Validate Service", () => {
	const service = factory();

	afterEach(() => mock.restore());

	describe("should return valid dto", async () => {
		Access.verifyAndDecodeJwt = mock().mockResolvedValueOnce([
			{ accessId: 1 },
			true,
		]);

		const dto = await service({ dto: fixture, context: context });

		expect(dto).toBeInstanceOf(ValidateDtoOut);
		expect(dto.result).toBeBoolean();
		expect(dto.payload).toBeObject();
		expect(dto.payload).toContainKey("accessId");
		expect(Access.verifyAndDecodeJwt).toBeCalledTimes(1);
	});

	describe("should throw an error if jwtAccess equals to false value", async () => {
		await expect(
			service({ dto: { ...fixture, jwtAccess: undefined }, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if validation was failed", async () => {
		Access.verifyAndDecodeJwt = mock().mockResolvedValueOnce([{}, false]);

		await expect(
			service({ dto: fixture, context: context }),
		).rejects.toBeInstanceOf(ServiceError);
		expect(Access.verifyAndDecodeJwt).toBeCalledTimes(1);
	});
});
