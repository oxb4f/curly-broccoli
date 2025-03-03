import { z } from "zod";

export const title = z.string().trim().min(1).max(255).readonly();

export const description = z.string().trim().min(1).max(1000).readonly();

export const author = z.string().trim().min(1).max(255).readonly();

export const genre = z.string().trim().min(1).max(255).readonly();

export const numberOfPages = z.number().int().min(1).max(100_000).readonly();

export const isbn = z.string().trim().min(1).max(255).readonly();
