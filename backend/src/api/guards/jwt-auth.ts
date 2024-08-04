import assert from "node:assert/strict";
import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";
import { factory as createValidateServiceFactory } from "../../services/accesses/validate/action";
import { ValidateDtoIn } from "../../services/accesses/validate/dto.in";
import { contextPlugin } from "../plugins/context";

export function createJwtAuthGuard(ignoreExpiration = false) {
	return new Elysia({ name: "jwtAuthGuard" })
		.decorate("validateService", createValidateServiceFactory())
		.use(contextPlugin)
		.use(bearer())
		.onBeforeHandle(
			{ as: "global" },
			async ({ bearer, validateService, context }) => {
				assert(context, `Invalid guard args: context ${!!context}`);

				await validateService({
					dto: new ValidateDtoIn(bearer, ignoreExpiration),
					context,
				});
			},
		);
}
