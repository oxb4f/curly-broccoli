export class RefreshDtoIn {
	constructor(
		public readonly refreshId: string,
		public readonly accessId: number,
		public readonly refresh: string,
	) {}
}
