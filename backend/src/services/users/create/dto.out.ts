export class CreateUserDtoOut {
	constructor(
		public readonly id: number,
		public readonly username: string,
		public readonly firstName: string | null,
		public readonly lastName: string | null,
		public readonly accessId: number,
		public readonly jwt: { access: string; refresh: string },
	) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
