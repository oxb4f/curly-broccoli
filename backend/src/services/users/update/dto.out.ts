import type {
	Birthday,
	FirstName,
	ImageUrl,
	LastName,
	Social,
	Username,
} from "../../../entities/user";

export class UpdateUserDtoOut {
	constructor(
		public readonly id: number,
		public readonly username: Username,
		public readonly firstName: FirstName,
		public readonly lastName: LastName,
		public readonly birthday: Birthday,
		public readonly social: Social,
		public readonly imageUrl: ImageUrl,
	) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
