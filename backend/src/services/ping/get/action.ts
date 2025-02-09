import z from "zod";
import { makeService } from "../../make-service";
import { GetPingDtoOut } from "./dto.out";

export default makeService(
	async ({ dto }) => {
		return new GetPingDtoOut(dto.ping);
	},
	z.object({ ping: z.string().max(128) }),
);
