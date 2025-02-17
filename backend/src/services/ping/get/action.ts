import { makeService } from "../../make-service";
import {
	GetPingDtoIn,
	GetPingDtoOut,
	type InShape,
	type OutShape,
} from "./dto";

export default makeService<InShape, OutShape>(async ({ dto }) => {
	return GetPingDtoOut.create({
		pong: dto.ping,
	});
}, GetPingDtoIn);
