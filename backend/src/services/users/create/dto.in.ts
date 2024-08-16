import type { Password, Username } from "../../../entities/user";

export class CreateUserDtoIn {
	constructor(
		public readonly username: Required<Username>,
		public readonly password: Required<Password>,
		public readonly refreshId: string,
	) {}
}
