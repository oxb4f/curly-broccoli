export class CreateUserDtoOut {
	constructor(
		public readonly id: number,
		public readonly username: string,
		public readonly jwt: { access: string; refresh: string },
	) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
