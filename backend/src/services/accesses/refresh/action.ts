import z from "zod";
import { id, jwt, refreshId } from "../../common/validation/schema";
import type { Context } from "../../context";
import { ServiceError } from "../../errors/error";
import { makeService } from "../../make-service";
import type { RefreshDtoIn } from "./dto.in";
import { RefreshDtoOut } from "./dto.out";

async function refresh({
	dto,
	context,
}: {
	dto: RefreshDtoIn;
	context: Context;
}) {
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

	return new RefreshDtoOut({
		access: result.jwtAccess,
		refresh: result.refreshToken,
	});
}

export function factory() {
	return makeService(
		refresh,
		z.object({
			refresh: jwt,
			refreshId,
			accessId: id,
		}),
	);
}
