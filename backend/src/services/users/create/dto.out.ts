import type {
	Birthday,
	FirstName,
	LastName,
	Social,
	Username,
} from "../../../entities/user";

export class CreateUserDtoOut {
	constructor(
		public readonly id: number,
		public readonly username: Username,
		public readonly firstName: FirstName,
		public readonly lastName: LastName,
		public readonly birthday: Birthday,
		public readonly social: Social,
		public readonly accessId: number,
		public readonly jwt: { access: string; refresh: string },
	) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
