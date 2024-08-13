import { mock } from "bun:test";
import { User } from "../../../src/entities/user";

export const context = {
	usersRepository: {
		createFromEntity: mock(),
		updateFromEntity: mock(),
		getUser: mock(),
		exists: mock(),
	},
	accessesRepository: { getAccess: mock(), updateFromEntity: mock() },
	config: {
		APP_PORT: 8080,

		POSTGRES_USER: "test",
		POSTGRES_PASSWORD: "test",
		POSTGRES_DB: "test",
		POSTGRES_HOST: "test",
		POSTGRES_PORT: 12345,

		JWT_SECRET: "secret",
		JWT_ACCESS_LIFETIME: 100000000000,

		REFRESH_TOKEN_LIFETIME: 100000000000,
	},
};

export const userFixture1 = {
	username: "test",
	password: "testPassword123_$",
	jwtAccessLifetime: 100000000,
	refreshId: "1",
	secret: "test",
	refreshLifetime: 100000000,
};

export const [createdUserFixture1] = await User.fromCredentials(userFixture1);
export const createdAccessFixture1 = createdUserFixture1.getAcesss();
