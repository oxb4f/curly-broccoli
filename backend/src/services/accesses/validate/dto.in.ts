export class ValidateDtoIn {
	constructor(
		public readonly jwtAccess?: string,
		public readonly ignoreExpiration?: boolean,
	) {}
}
