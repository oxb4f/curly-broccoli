import z from "zod";
import { makeService } from "../../make-service";
import type { GetPingDtoIn } from "./dto.in";
import { GetPingDtoOut } from "./dto.out";

async function create({
	dto,
}: {
	dto: GetPingDtoIn;
}) {
	return new GetPingDtoOut(dto.ping);
}

export function factory() {
	return makeService(
		create,
		z.object({
			ping: z.string().max(128),
		}),
	);
}
