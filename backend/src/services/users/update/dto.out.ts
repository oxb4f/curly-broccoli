export class UpdateDtoOut {
	constructor(
		public readonly id: number,
		public readonly username: string,
		public readonly firstName: string | null,
		public readonly lastName: string | null,
	) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
