import { describe, expect, test } from "bun:test";
import { createSigner } from "fast-jwt";
import { Access } from "../../../src/entities/access";

const fixture = {
	login: "test",
	password: "testPassword123_$",
	jwtAccessLifetime: 100000000,
	refreshId: "1",
	secret: "test",
	refreshLifetime: 100000000,
};

test("Unit test: Access Entity", () => {
	describe("from", () => {
		describe("should return access and refresh tokens", async () => {
			const result = await Access.from(fixture);

			expect(result).toBeArrayOfSize(3);
			expect(result[0]).toBeInstanceOf(Access);
			expect(result[1]).toBeString();
			expect(result[2]).toBeString();
			expect(result[0].getLogin()).toEqual(fixture.login);
			expect(result[0].getPassword()).not.toEqual(fixture.password);
			expect(result[0].getPassword()).toBeString();
			expect(result[0].getRefreshTokens()).toBeInstanceOf(Map);
			expect(
				Array.from(result[0].getRefreshTokens().entries()),
			).toBeArrayOfSize(1);
		});

		describe("should set id from args", async () => {
			const result = await Access.from({ ...fixture, id: 1 });

			expect(result[0].getId()).toEqual(1);
		});

		describe("should set refresh tokens from args", async () => {
			const result = await Access.from({
				...fixture,
				refreshTokens: { test: "token" },
			});

			expect(result[0].getRefreshTokens().get("test")).toEqual("token");
		});
	});

	describe("verifyRefreshToken", () => {
		describe("should return true for correct refresh token", async () => {
			const [access, refresh] = await Access.from(fixture);

			const result = await access.verifyRefreshToken(
				fixture.refreshId,
				refresh,
				fixture.secret,
			);

			expect(result).toEqual(true);
		});

		describe("should return false for invalid refresh token", async () => {
			const [access] = await Access.from(fixture);

			const result = await access.verifyRefreshToken(
				fixture.refreshId,
				"test",
				fixture.secret,
			);

			expect(result).toEqual(false);
		});

		describe("should return false for invalid refresh id", async () => {
			const [access, refresh] = await Access.from(fixture);

			const result = await access.verifyRefreshToken(
				"invalid",
				refresh,
				fixture.secret,
			);

			expect(result).toEqual(false);
		});

		describe("should return false for invalid secret", async () => {
			const [access, refresh] = await Access.from(fixture);

			const result = await access.verifyRefreshToken(
				fixture.refreshId,
				refresh,
				"invalid",
			);

			expect(result).toEqual(false);
		});
	});

	describe("verifyAndDecodeJwt", () => {
		describe("should return true for correct jwt", async () => {
			const [, , jwt] = await Access.from(fixture);

			const [result, ok] = await Access.verifyAndDecodeJwt(jwt, fixture.secret);

			expect(result).toBeObject();
			expect(ok).toEqual(true);
		});

		describe("should return false for correct jwt", async () => {
			const [result, ok] = await Access.verifyAndDecodeJwt(
				"12345",
				fixture.secret,
			);

			expect(result).toBeNull();
			expect(ok).toEqual(false);
		});

		describe("should return true for expired jwt if ignoreExpiration was passed", async () => {
			const signer = createSigner({
				key: async () => fixture.secret,
				expiresIn: 1,
			});

			const jwt = await signer({});

			const [result, ok] = await Access.verifyAndDecodeJwt(
				jwt,
				fixture.secret,
				true,
			);

			expect(result).toBeObject();
			expect(ok).toEqual(true);
		});
	});

	describe("refresh", () => {
		describe("should return new tokens", async () => {
			const [access, refresh] = await Access.from(fixture);

			const result = await access.refresh({
				refresh,
				refreshId: fixture.refreshId,
				refreshLifetime: fixture.refreshLifetime,
				jwtAccessLifetime: fixture.jwtAccessLifetime,
				secret: fixture.secret,
			});

			expect(result.jwtAccess).toBeString();
			expect(result.refreshToken).toBeString();
		});

		describe("should return empty object if refresh is invalid", async () => {
			const [access] = await Access.from(fixture);

			const result = await access.refresh({
				refresh: "invalid",
				refreshId: fixture.refreshId,
				refreshLifetime: fixture.refreshLifetime,
				jwtAccessLifetime: fixture.jwtAccessLifetime,
				secret: fixture.secret,
			});

			expect(result).toBeEmptyObject();
		});
	});

	describe("verifyPassword", () => {
		describe("should return true for correct password", async () => {
			const [access] = await Access.from(fixture);

			const result = await access.verifyPassword(fixture.password);

			expect(result).toEqual(true);
		});

		describe("should return false for invalid password", async () => {
			const [access] = await Access.from(fixture);

			const result = await access.verifyPassword("testpass");

			expect(result).toEqual(false);
		});
	});

	describe("fromHashed", () => {
		describe("should create correct access", async () => {
			const [access] = await Access.from(fixture);

			const accessFromHashed = await Access.fromHashed({
				id: access.getId(),
				refreshTokens: Object.fromEntries(access.getRefreshTokens().entries()),
				login: access.getLogin(),
				password: access.getPassword(),
			});

			expect(accessFromHashed).toBeInstanceOf(Access);
			expect(accessFromHashed.getId()).toEqual(access.getId());
			expect(accessFromHashed.getLogin()).toEqual(access.getLogin());
			expect(accessFromHashed.getPassword()).toEqual(access.getPassword());
			expect(accessFromHashed.getRefreshTokens()).toBeInstanceOf(Map);
			expect(
				Array.from(accessFromHashed.getRefreshTokens().entries()),
			).toBeArrayOfSize(1);
		});
	});

	describe("toPlainObject", () => {
		describe("should create object with specific fields", async () => {
			const [access] = await Access.from(fixture);

			expect(access.toPlainObject()).toEqual({
				id: access.getId(),
				login: access.getLogin(),
			});
		});
	});
});
