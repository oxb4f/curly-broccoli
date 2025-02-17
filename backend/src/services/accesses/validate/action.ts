import { Access } from "../../../entities/access";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	type InShape,
	type OutShape,
	ValidateDtoIn,
	ValidateDtoOut,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
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

	return ValidateDtoOut.create({
		result: true,
		payload: result,
	});
}, ValidateDtoIn);
