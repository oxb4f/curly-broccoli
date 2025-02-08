import z from "zod";
import type { Context } from "../../context";
import { makeService } from "../../make-service";
import type { GetImageDtoIn } from "./dto.in";
import { GetImageDtoOut } from "./dto.out";

async function get({
	dto,
	context,
}: {
	dto: GetImageDtoIn;
	context: Context;
}) {
	const image = await context.fileStorage.get({ path: dto.path });

	return new GetImageDtoOut(image);
}

export function factory() {
	return makeService(get, z.object({ path: z.string() }));
}
