import { z } from "zod";

export const state = z.string().trim().min(1).max(255).readonly();
