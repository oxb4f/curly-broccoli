import { z } from "zod";

export const id = z.coerce.number().int().safe().positive().readonly();

export const refreshId = z.string().trim().max(255).readonly();

export const username = z.string().trim().min(1).max(128).readonly();

export const password = z.string().trim().min(8).max(128).readonly();

export const jwt = z.string().trim().min(1).max(255).readonly();

export const dateString = z.string().date().readonly();

export const date = z.coerce.date().readonly();

export const url = z.string().trim().url().readonly();
