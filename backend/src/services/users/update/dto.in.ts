import type {
	Birthday,
	FirstName,
	LastName,
	Social,
	Username,
} from "../../../entities/user";

export class UpdateUserDtoIn {
	constructor(
		public readonly accessId: number,
		public readonly userId: number,
		public readonly username?: Username,
		public readonly firstName?: FirstName,
		public readonly lastName?: LastName,
		public readonly birthday?: Birthday,
		public readonly social?: Social,
	) {}
}
