import { beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { Image } from "../../../../src/entities/image";
import { ServiceError } from "../../../../src/services/errors/error";
import createImageService from "../../../../src/services/images/create/action";
import { context, createdImageFixture1 } from "../fixtures";

const fixture = {
	image: new File([new Uint8Array([1, 2, 3])], "test.png", {
		type: "image/png",
	}),
	bucket: "test",
};

test("Unit test: Image Create Service", () => {
	const service = createImageService;

	beforeEach(() => mock.restore());

	describe("should return valid dto", async () => {
		spyOn(Image, "fromBucket").mockResolvedValue(createdImageFixture1);
		spyOn(context.imagesRepository, "create").mockImplementation(
			(() => {}) as any,
		);
		spyOn(context.fileStorage, "put").mockImplementation((() => {}) as any);

		const dto = await service({ dto: fixture, context: context });

		expect(dto.url).toBeString();
		expect(Image.fromBucket).toBeCalledTimes(1);
		expect(context.imagesRepository.create).toBeCalledTimes(1);
		expect(context.fileStorage.put).toBeCalledTimes(1);
	});

	describe("should throw an error if validation was failed by incorrect image", async () => {
		await expect(
			service({
				dto: {
					...fixture,
					image: new File([new Uint8Array([1, 2, 3])], "bin.bin", {
						type: "application/octet-stream",
					}),
				},
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});

	describe("should throw an error if validation was failed by incorrect size", async () => {
		await expect(
			service({
				dto: {
					...fixture,
					image: new File([], "image.png", {
						type: "image/png",
					}),
				},
				context: context,
			}),
		).rejects.toBeInstanceOf(ServiceError);
	});
});
