import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import {
	type InShape,
	type OutShape,
	RefreshDtoIn,
	RefreshDtoOut,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
	const access = await context.accessesRepository.getAccess({
		id: dto.accessId,
	});

	if (!access) {
		ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
			details: [],
			message: "Refresh was failed",
		});
	}

	const result = await access.refresh({
		refresh: dto.refresh,
		refreshId: dto.refreshId,
		refreshLifetime: context.config.REFRESH_TOKEN_LIFETIME,
		secret: context.config.JWT_SECRET,
		jwtAccessLifetime: context.config.JWT_ACCESS_LIFETIME,
	});

	if (!(result?.jwtAccess && result?.refreshToken)) {
		ServiceError.throw(ServiceError.ERROR_TYPE.AUTH, {
			details: [],
			message: "Refresh was failed",
		});
	}

	await context.accessesRepository.updateFromEntity(access);

	return RefreshDtoOut.create({
		jwt: {
			access: result.jwtAccess,
			refresh: result.refreshToken,
		},
	});
}, RefreshDtoIn);
