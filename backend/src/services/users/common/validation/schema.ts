import { z } from "zod";
import { url } from "../../../common/validation/schema";

export const firstName = z.string().trim().min(1).max(255);

export const lastName = z.string().trim().min(1).max(255);

export const social = z.object({
	telegram: url.optional().nullable(),
	instagram: url.optional().nullable(),
});
