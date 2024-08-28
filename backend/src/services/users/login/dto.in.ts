import type { Password, Username } from "../../../entities/user";

export class LoginDtoIn {
	constructor(
		public readonly username: Required<Username>,
		public readonly password: Required<Password>,
		public readonly refreshId: string,
	) {}
}
