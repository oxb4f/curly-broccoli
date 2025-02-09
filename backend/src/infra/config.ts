import { z } from "zod";
import "dotenv-defaults/config";

export type FileStorageType = "aws-s3";

export interface Config {
	APP_PORT: number;

	POSTGRES_USER: string;
	POSTGRES_PASSWORD: string;
	POSTGRES_DB: string;
	POSTGRES_HOST: string;
	POSTGRES_PORT: number;

	JWT_SECRET: string;
	JWT_ACCESS_LIFETIME: number;

	REFRESH_TOKEN_LIFETIME: number;

	FILE_STORAGE_TYPE: FileStorageType;
	FILE_STORAGE_BASE_RETRIEVE_URL: string;

	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	AWS_REGION: string;
	AWS_S3_ENDPOINT: string;
	FILE_STORAGE_DEFAULT_BUCKET_NAME: string;
}

export class ConfigValidationError extends Error {
	private constructor(message: string) {
		super(message);
		this.name = "ConfigValidationError";
	}

	static from(errors: Record<string, string[]>) {
		const message = Object.entries(errors)
			.map(([field, errors]) => {
				return `${field}: ${errors.map((msg) => msg.toLowerCase()).join(", ")}`;
			})
			.join("\n");

		return new ConfigValidationError(message);
	}
}

export const configSchema = z.object({
	APP_PORT: z.coerce.number().int().positive(),

	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DB: z.string(),
	POSTGRES_HOST: z.string(),
	POSTGRES_PORT: z.coerce.number().int().positive(),

	JWT_SECRET: z.string(),
	JWT_ACCESS_LIFETIME: z.coerce.number(),

	REFRESH_TOKEN_LIFETIME: z.coerce.number(),

	FILE_STORAGE_TYPE: z.enum(["aws-s3"]),
	FILE_STORAGE_BASE_RETRIEVE_URL: z.string().url(),
	FILE_STORAGE_DEFAULT_BUCKET_NAME: z.string(),

	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
	AWS_S3_ENDPOINT: z.string(),
});

export function load(): Config {
	try {
		return configSchema.parse(process.env);
	} catch (error: any) {
		const formattedError = error.format() as Record<
			string,
			{ _errors?: string[] }
		>;
		const transformedErrors: Record<string, string[]> = {};

		for (const [field, errorDetail] of Object.entries(formattedError)) {
			if (Array.isArray(errorDetail._errors)) {
				transformedErrors[field] = errorDetail._errors;
			}
		}

		throw ConfigValidationError.from(transformedErrors);
	}
}
