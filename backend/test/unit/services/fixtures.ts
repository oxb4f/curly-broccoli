import { mock } from "bun:test";
import { Image } from "../../../src/entities/image";
import { User } from "../../../src/entities/user";
import type { Context } from "../../../src/services/context";

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

		FILE_STORAGE_TYPE: "aws-s3",
		FILE_STORAGE_BASE_RETRIEVE_URL: "http://localhost:8080/images",
		FILE_STORAGE_DEFAULT_BUCKET_NAME: "files",

		AWS_ACCESS_KEY_ID: "minio",
		AWS_SECRET_ACCESS_KEY: "pass",
		AWS_REGION: "us-east-1",
		AWS_S3_ENDPOINT: "http://minio:9000",
	},
	imagesRepository: {
		createFromEntity: mock(),
	},
	fileStorage: {
		put: mock(),
		get: mock().mockImplementation(() =>
			Promise.resolve(new File([], "test.png", { type: "image/png" })),
		),
	},
} satisfies Context;

export const userFixture1 = {
	firstName: "John",
	lastName: "Doe",
	username: "test",
	password: "testPassword123_$",
	birthday: new Date("1990-01-01"),
	social: {
		telegram: "https://t.me/test",
		instagram: "https://www.instagram.com/test",
	},
	imageUrl: "https://test.com/test.png",
	jwtAccessLifetime: 100000000,
	refreshId: "1",
	secret: "test",
	refreshLifetime: 100000000,
};

export const imageFixture1 = {
	bucket: "test",
	extension: "png",
};

export const [createdUserFixture1] = await User.fromCredentials(userFixture1);
export const createdAccessFixture1 = createdUserFixture1.getAcesss();
export const createdImageFixture1 = await Image.fromBucket(imageFixture1);
