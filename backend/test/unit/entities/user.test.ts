import { describe, expect, test } from "bun:test";
import { Access } from "../../../src/entities/access";
import { User } from "../../../src/entities/user";

const fixture = {
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
			});
		});
	});
});
