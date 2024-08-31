import { describe, expect, test } from "bun:test";
import { Access } from "../../../src/entities/access";
import { User } from "../../../src/entities/user";

const fixture = {
	firstName: "test",
	lastName: "test",
	birthday: new Date(),
	social: {
		telegram: "https://test.example",
		instagram: "https://test.example",
	},
	username: "test",
	password: "testPassword123_$",
	jwtAccessLifetime: 100000000,
	refreshId: "1",
	secret: "test",
	refreshLifetime: 100000000,
};

test("Unit test: User Entity", () => {
	describe("fromCredentials", () => {
		describe("should return user with tokens", async () => {
			const result = await User.fromCredentials(fixture);

			expect(result).toBeArrayOfSize(3);
			expect(result[0]).toBeInstanceOf(User);
			expect(result[1]).toBeString();
			expect(result[2]).toBeString();
			expect(result[0].getUsername()).toEqual(fixture.username);
			expect(result[0].getAcesss()).toBeInstanceOf(Access);
			expect(result[0].getId()).toBeInteger();
		});
	});

	describe("login", () => {
		describe("should return access and refresh tokens", async () => {
			const [user] = await User.fromCredentials(fixture);

			const tokens = await user.login(fixture);

			expect(tokens.jwtAccess).toBeString();
			expect(tokens.refreshToken).toBeString();
		});

		describe("should return empty object if password is invalid", async () => {
			const [user] = await User.fromCredentials(fixture);

			const tokens = await user.login({
				...fixture,
				password: "testpassinvalid",
			});

			expect(tokens).toBeEmptyObject();
		});
	});

	describe("from", () => {
		describe("should return user", async () => {
			const [user] = await User.fromCredentials(fixture);

			const result = await User.from({ ...fixture, access: user.getAcesss()! });

			expect(result).toBeInstanceOf(User);
		});
	});

	describe("toPlainObject", () => {
		describe("should create object with specific fields", async () => {
			const [user] = await User.fromCredentials(fixture);

			expect(user.toPlainObject()).toEqual({
				id: user.getId(),
				username: user.getUsername(),
				access: user.getAcesss(),
				firstName: user.getFirstName(),
				lastName: user.getLastName(),
				birthday: user.getBirthday(),
				social: user.getSocial(),
			});
		});
	});

	describe("update", () => {
		describe("should return user with updated data", async () => {
			const [user] = await User.fromCredentials(fixture);

			const birthday = new Date(Date.now() - 86400000);

			const result = await user.update({
				firstName: "testtest",
				lastName: "testtest",
				birthday: birthday,
				social: {
					telegram: "https://test1.example",
					instagram: "https://test1.example",
				},
			});

			expect(result).toBeInstanceOf(User);
			expect(result.getFirstName()).toEqual("testtest");
			expect(result.getLastName()).toEqual("testtest");
			expect(result.getBirthday()).toEqual(birthday);
			expect(result.getSocial()).toEqual({
				telegram: "https://test1.example",
				instagram: "https://test1.example",
			});
		});

		describe("shoud perform partial update", async () => {
			const [user] = await User.fromCredentials(fixture);

			const result = await user.update({
				firstName: "testtest",
				lastName: "testtest",
			});

			expect(result).toBeInstanceOf(User);
			expect(result.getFirstName()).toEqual("testtest");
			expect(result.getLastName()).toEqual("testtest");
			expect(result.getBirthday()).toEqual(fixture.birthday);
			expect(result.getSocial()).toEqual(fixture.social);
		});

		describe("should update to null values", async () => {
			const [user] = await User.fromCredentials(fixture);

			const result = await user.update({
				firstName: null,
				lastName: null,
				birthday: null,
				social: { telegram: null, instagram: null },
			});

			expect(result).toBeInstanceOf(User);
			expect(result.getFirstName()).toBeNull();
			expect(result.getLastName()).toBeNull();
			expect(result.getBirthday()).toBeNull();
			expect(result.getSocial()).toEqual({
				telegram: null,
				instagram: null,
			});
		});

		describe("should pass null value for username", async () => {
			const [user] = await User.fromCredentials(fixture);

			const result = await user.update({
				username: null as any,
				firstName: "testtest",
				lastName: "testtest",
				birthday: fixture.birthday,
				social: fixture.social,
			});

			expect(result).toBeInstanceOf(User);
			expect(result.getUsername()).toEqual(fixture.username);
			expect(result.getFirstName()).toEqual("testtest");
			expect(result.getLastName()).toEqual("testtest");
			expect(result.getBirthday()).toEqual(fixture.birthday);
			expect(result.getSocial()).toEqual(fixture.social);
		});
	});
});
