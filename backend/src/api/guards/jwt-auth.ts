import assert from "node:assert/strict";
import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";
import validateService from "../../services/accesses/validate/action";
import type { OutShape } from "../../services/accesses/validate/dto";
import { contextPlugin } from "../plugins/context";

export function createJwtAuthGuard(ignoreExpiration = false) {
	return new Elysia({ name: "jwtAuthGuard" })
		.state("jwtAuthGuardPayload", {} as OutShape)
		.decorate("validateService", validateService)
		.use(contextPlugin)
		.use(bearer())
		.onBeforeHandle(
			{ as: "global" },
			async ({ bearer, validateService, context, store }) => {
				assert(context, `Invalid guard args: context ${!!context}`);

				const result = await validateService({
					dto: { jwtAccess: bearer, ignoreExpiration },
					context,
				});

				store.jwtAuthGuardPayload = result;
			},
		);
}
