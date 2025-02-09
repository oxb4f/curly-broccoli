import z from "zod";
import { Access } from "../../../entities/access";
import { jwt } from "../../common/validation/schema";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { ValidateDtoIn } from "./dto.in";
import { ValidateDtoOut } from "./dto.out";

export default makeService<ValidateDtoIn, ValidateDtoOut>(
	async ({ dto, context }) => {
		if (!dto.jwtAccess) {
			ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
				details: [],
				message: "Authorization was failed",
			});
		}

		const [result, ok] = await Access.verifyAndDecodeJwt(
			dto.jwtAccess,
			context.config.JWT_SECRET,
			dto.ignoreExpiration,
		);

		if (!ok) {
			ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
				details: [],
				message: "Authorization was failed",
			});
		}

		return new ValidateDtoOut(true, result);
	},
	z.object({
		jwtAccess: jwt.optional(),
		ignoreExpiration: z.coerce.boolean().optional().default(false),
	}),
);
