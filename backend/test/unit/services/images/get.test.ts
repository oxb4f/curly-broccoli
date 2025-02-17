import { beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { FileStorageNotFoundError } from "../../../../src/infra/file-storage/errors/not-found";
import { ServiceError } from "../../../../src/services/errors/error";
import getImageService from "../../../../src/services/images/get/action";
import { context } from "../fixtures";

const fixture = {
	path: "test",
};

test("Unit test: Image Get Service", () => {
	const service = getImageService;

	beforeEach(() => mock.restore());

	describe("should return valid dto", async () => {
		spyOn(context.fileStorage, "get").mockImplementation(
			mock().mockResolvedValue(
				new File([new Uint8Array([1, 2, 3])], "test.png"),
			),
		);

		const dto = await service({ dto: fixture, context: context });

		expect(dto.image).toBeInstanceOf(File);
		expect(context.fileStorage.get).toBeCalledTimes(1);
	});

	describe("should throw an error if validation was failed by incorrect path", async () => {
		await expect(
			service({
				dto: { path: "" },
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if file was not found", async () => {
		spyOn(context.fileStorage, "get").mockRejectedValue(
			new FileStorageNotFoundError("File not found"),
		);

		await expect(
			service({
				dto: {
					...fixture,
				},
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});
});
