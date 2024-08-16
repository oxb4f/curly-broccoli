export class UpdateDtoIn {
	constructor(
		public readonly accessId: number,
		public readonly userId: number,
		public readonly username?: string,
		public readonly firstName?: string | null,
		public readonly lastName?: string | null,
	) {}
}
