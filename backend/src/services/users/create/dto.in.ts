export class CreateUserDtoIn {
	constructor(
		public readonly username: string,
		public readonly password: string,
		public readonly refreshId: string,
	) {}
}
