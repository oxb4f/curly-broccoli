import { z } from "zod";

export const id = z.coerce.number().int().safe().positive().readonly();

export const refreshId = z.string().trim().max(255).readonly();

export const username = z.string().trim().min(1).max(128).readonly();

export const password = z.string().trim().min(8).max(128).readonly();

export const jwt = z.string().trim().min(1).max(255).readonly();

export const dateString = z.string().date().readonly();

export const date = z.coerce.date().readonly();

export const url = z.string().trim().url().readonly();

export const limit = z.coerce.number().int().safe().min(1).max(200).readonly();

export const offset = z.coerce.number().int().safe().min(0).readonly();

export const orderDirection = z.enum(["asc", "desc"]).readonly().default("asc");

export const orderField = z.enum(["id", "createdAt", "updatedAt"]);

export function getEnumValues<
	T extends z.ZodEnum<any>,
	K extends keyof T["Values"],
>(enumType: T) {
	return Object.values(enumType.Values) as Array<K>;
}
