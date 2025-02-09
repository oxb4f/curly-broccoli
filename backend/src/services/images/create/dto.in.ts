export class CreateImageDtoIn {
	constructor(
		public readonly image: File,
		public readonly bucket?: string,
	) {}
}
