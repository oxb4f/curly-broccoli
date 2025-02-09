import { describe, expect, test } from "bun:test";
import { Image } from "../../../src/entities/image";

const fixture = {
	bucket: "test",
	extension: "png",
	path: "test/test.png",
};

test("Unit test: Image Entity", () => {
	describe("from", () => {
		describe("should return image from bucket", async () => {
			const result = await Image.fromBucket(fixture);

			expect(result).toBeInstanceOf(Image);
			expect(result.getPath()).toBeString();
		});

		describe("should return image from path", async () => {
			const result = await Image.from({ ...fixture, id: 1 });

			expect(result.getId()).toEqual(1);
			expect(result.getPath()).toEqual(fixture.path);
		});
	});

	describe("generateRandomUUID", () => {
		describe("should return random uuid", async () => {
			const result = await Image.generateRandomUUID();

			expect(result).toBeString();
		});
	});

	describe("toPlainObject", () => {
		describe("should create object with specific fields", async () => {
			const image = await Image.fromBucket(fixture);

			expect(image.toPlainObject()).toEqual({
				id: image.getId(),
				path: image.getPath(),
			});
		});
	});
});
