export class LoginDtoIn {
	constructor(
		public readonly username: string,
		public readonly password: string,
		public readonly refreshId: string,
	) {}
}
