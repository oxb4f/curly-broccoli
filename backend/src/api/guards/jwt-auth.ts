import assert from "node:assert/strict";
import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";
import { factory as createValidateServiceFactory } from "../../services/accesses/validate/action";
import { ValidateDtoIn } from "../../services/accesses/validate/dto.in";
import type { ValidateDtoOut } from "../../services/accesses/validate/dto.out";
import { contextPlugin } from "../plugins/context";

export function createJwtAuthGuard(ignoreExpiration = false) {
	return new Elysia({ name: "jwtAuthGuard" })
		.state("jwtAuthGuardPayload", {} as ValidateDtoOut)
		.decorate("validateService", createValidateServiceFactory())
		.use(contextPlugin)
		.use(bearer())
		.onBeforeHandle(
			{ as: "global" },
			async ({ bearer, validateService, context, store }) => {
				assert(context, `Invalid guard args: context ${!!context}`);

				const result = await validateService({
					dto: new ValidateDtoIn(bearer, ignoreExpiration),
					context,
				});

				store.jwtAuthGuardPayload = result;
			},
		);
}
