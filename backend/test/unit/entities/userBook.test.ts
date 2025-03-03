import { describe, expect, test } from "bun:test";
import { Book } from "../../../src/entities/book";
import { BookProfile } from "../../../src/entities/bookProfile";
import { UserBook } from "../../../src/entities/userBook";

const fixture = {
	profile: {
		title: "Test profile",
		description: "Test description",
		imageUrl: "http://testimageurl.example",
		numberOfPages: 100,
		author: "Test",
		genre: "Fiction",
		isbn: "ISB1024",
	},
	isFavorite: true,
	isRead: true,
	rating: 5,
	review: "Test review",
};

test("Unit test: UserBook Entity", () => {
	describe("from", () => {
		describe("should return user book from profile data", async () => {
			const result = await UserBook.from({
				...fixture,
				profile: await BookProfile.from(fixture.profile),
			});

			expect(result).toBeInstanceOf(UserBook);
			expect(result.getId()).toBeNumber();
			expect(result.getIsFavorite()).toStrictEqual(true);
			expect(result.getIsRead()).toStrictEqual(true);
			expect(result.getRating()).toEqual(5);
			expect(result.getReview()).toEqual("Test review");
			expect(result.getProfile()?.getId()).toBeNumber();
			expect(result.getProfile()?.getTitle()).toEqual(fixture.profile.title);
			expect(result.getProfile()?.getDescription()).toEqual(
				fixture.profile.description,
			);
			expect(result.getProfile()?.getIsbn()).toEqual(fixture.profile.isbn);
		});

		describe("should return user book from book data", async () => {
			const result = await UserBook.from({
				isFavorite: true,
				isRead: true,
				rating: 5,
				review: "Test review",
				profile: await BookProfile.from(fixture.profile),
			});

			expect(result).toBeInstanceOf(UserBook);
			expect(result.getIsFavorite()).toStrictEqual(true);
			expect(result.getIsRead()).toStrictEqual(true);
			expect(result.getRating()).toEqual(5);
			expect(result.getReview()).toEqual("Test review");
			expect(result.getProfile()?.getId()).toBeNumber();
			expect(result.getProfile()?.getTitle()).toEqual(fixture.profile.title);
			expect(result.getProfile()?.getDescription()).toEqual(
				fixture.profile.description,
			);
			expect(result.getProfile()?.getIsbn()).toEqual(fixture.profile.isbn);
		});

		describe("should add profile from book", async () => {
			const result = await UserBook.from({
				isFavorite: true,
				isRead: true,
				rating: 5,
				review: "Test review",
				book: await Book.from({
					profile: await BookProfile.from(fixture.profile),
					isPublic: true,
				}),
			});

			expect(result).toBeInstanceOf(UserBook);
			expect(result.getIsFavorite()).toStrictEqual(true);
			expect(result.getIsRead()).toStrictEqual(true);
			expect(result.getRating()).toEqual(5);
			expect(result.getReview()).toEqual("Test review");
			expect(result.getProfile()?.getId()).toBeNumber();
			expect(result.getProfile()?.getTitle()).toEqual(fixture.profile.title);
			expect(result.getProfile()?.getDescription()).toEqual(
				fixture.profile.description,
			);
			expect(result.getProfile()?.getIsbn()).toEqual(fixture.profile.isbn);
		});
	});

	describe("update", () => {
		describe("should update user book", async () => {
			const result = await UserBook.from({
				...fixture,
				profile: await BookProfile.from(fixture.profile),
			});

			const newProfile = await BookProfile.from({
				...fixture.profile,
				title: "New title",
			});

			await result.update({
				profile: newProfile.toPlainObject(),
				isFavorite: false,
				isRead: false,
				rating: 4,
				review: "Updated review",
			});

			expect(result).toBeInstanceOf(UserBook);
			expect(result.getId()).toBeNumber();
			expect(result.getIsFavorite()).toStrictEqual(false);
			expect(result.getIsRead()).toStrictEqual(false);
			expect(result.getRating()).toEqual(4);
			expect(result.getReview()).toEqual("Updated review");
			expect(result.getProfile()?.getId()).toBeNumber();
			expect(result.getProfile()?.getTitle()).toEqual(newProfile.getTitle());
		});

		describe("should update values to null", async () => {
			const result = await UserBook.from({
				...fixture,
				profile: await BookProfile.from(fixture.profile),
			});

			await result.update({
				rating: null,
				review: null,
			});

			expect(result).toBeInstanceOf(UserBook);
			expect(result.getId()).toBeNumber();
			expect(result.getIsFavorite()).toStrictEqual(fixture.isFavorite);
			expect(result.getIsRead()).toStrictEqual(fixture.isRead);
			expect(result.getRating()).toEqual(null);
			expect(result.getReview()).toEqual(null);
			expect(result.getProfile()?.getId()).toBeNumber();
		});
	});

	describe("toPlainObject", () => {
		describe("should create object with specific fields", async () => {
			const result = await UserBook.from({
				...fixture,
				profile: await BookProfile.from(fixture.profile),
			});

			expect(result.toPlainObject()).toEqual({
				id: result.getId(),
				isFavorite: result.getIsFavorite(),
				isRead: result.getIsRead(),
				rating: result.getRating(),
				review: result.getReview(),
				profile: expect.any(BookProfile as any),
			});
		});
	});

	describe("getBook", () => {
		describe("should return book if it exists", async () => {
			const result = await UserBook.from({
				...fixture,
				profile: undefined,
				book: await Book.from({
					profile: await BookProfile.from(fixture.profile),
					isPublic: true,
				}),
			});

			expect(result.getBook()).toEqual(expect.any(Book as any));
		});
	});
});
