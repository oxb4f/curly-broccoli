export class RefreshDtoOut {
	constructor(public readonly jwt: { access: string; refresh: string }) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
