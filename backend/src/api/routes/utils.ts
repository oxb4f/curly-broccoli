import crypto from "node:crypto";

export function generateUserAgentHash(userAgent?: string) {
	return crypto
		.createHash("sha256")
		.update(userAgent ?? "default")
		.digest("base64");
}
