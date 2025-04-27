import { describe, expect, test } from "bun:test";
import { Book } from "../../../src/entities/book";
import { BookProfile } from "../../../src/entities/book-profile";

const fixture = {
	isPublic: true,
	profile: {
		title: "Test profile",
		description: "Test description",
		imageUrl: "http://testimageurl.example",
		numberOfPages: 100,
		author: "Test",
		genre: "Fiction",
		isbn: "ISB1024",
	},
};

test("Unit test: Book Entity", () => {
	describe("from", () => {
		describe("should return book from profile data", async () => {
			const result = await Book.fromProfileData(fixture);

			expect(result).toBeInstanceOf(Book);
			expect(result.getIsPublic()).toStrictEqual(true);
			expect(result.getId()).toBeNumber();
			expect(result.getProfile().getId()).toBeNumber();
			expect(result.getProfile().getTitle()).toEqual(fixture.profile.title);
			expect(result.getProfile().getDescription()).toEqual(
				fixture.profile.description,
			);
			expect(result.getProfile().getIsbn()).toEqual(fixture.profile.isbn);
		});

		describe("should return book from book data", async () => {
			const result = await Book.from({
				isPublic: true,
				profile: await BookProfile.from(fixture.profile),
			});

			expect(result).toBeInstanceOf(Book);
			expect(result.getIsPublic()).toStrictEqual(true);
			expect(result.getId()).toBeNumber();
			expect(result.getProfile().getId()).toBeNumber();
			expect(result.getProfile().getTitle()).toEqual(fixture.profile.title);
			expect(result.getProfile().getDescription()).toEqual(
				fixture.profile.description,
			);
			expect(result.getProfile().getIsbn()).toEqual(fixture.profile.isbn);
		});
	});

	describe("toPlainObject", () => {
		describe("should create object with specific fields", async () => {
			const result = await Book.fromProfileData(fixture);

			expect(result.toPlainObject()).toEqual({
				id: result.getId(),
				isPublic: result.getIsPublic(),
				profile: expect.any(BookProfile as any),
			});
		});
	});
});
