export class GetPingDtoOut {
	constructor(public readonly pong: string) {}

	toJSON() {
		return Object.assign({}, this);
	}
}
