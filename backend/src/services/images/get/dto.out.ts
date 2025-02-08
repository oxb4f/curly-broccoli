export class GetImageDtoOut {
	constructor(public readonly image: File) {}

	public toJSON() {
		return {
			image: this.image,
		};
	}
}
