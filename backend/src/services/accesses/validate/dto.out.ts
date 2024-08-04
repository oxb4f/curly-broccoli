import type { CompleteJwtPayload } from "../../../entities/access";

export class ValidateDtoOut {
	constructor(
		public readonly result: boolean,
		public readonly payload?: CompleteJwtPayload,
	) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
