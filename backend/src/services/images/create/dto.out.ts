export class CreateImageDtoOut {
	constructor(public readonly url: string) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
