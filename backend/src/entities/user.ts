import assert from "node:assert/strict";
import { Access, type JwtAccessPayload, type RefreshPayload } from "./access";
import { Base } from "./base";

type FirstName = string | null | undefined;
type LastName = string | null | undefined;

type CPayload = {
	id?: number;
	firstName: FirstName;
	lastName: LastName;
	username: string;
};

export type UserWithCredentialsPayload = CPayload &
	RefreshPayload &
	JwtAccessPayload & {
		password: string;
	};

export type UserPayload = CPayload & {
	access: Access;
};

export type LoginPayload = RefreshPayload &
	JwtAccessPayload & {
		password: string;
	};

export type UpdatePayload = {
	firstName?: FirstName;
	lastName?: LastName;
	username?: string;
};

export class User extends Base {
	private _username: string;
	private _access?: Access;
	private _firstName: FirstName;
	private _lastName: LastName;

	private constructor(payload: CPayload) {
		super(payload.id);

		this._username = payload.username;
		this._firstName = payload.firstName;
		this._lastName = payload.lastName;
	}

	static async fromCredentials(
		payload: UserWithCredentialsPayload,
	): Promise<[User, string, string]> {
		const [access, refreshToken, jwtAccess] = await Access.from({
			...payload,
			login: payload.username,
		});

		const user = new User({ ...payload });

		user.setAccess(access);

		return [user, jwtAccess, refreshToken];
	}

	static async from(payload: UserPayload): Promise<User> {
		const user = new User({ ...payload });

		user.setAccess(payload.access);

		return user;
	}

	async login(payload: LoginPayload) {
		const access = this.getAcesss();

		assert(access);

		const verifyResult = await access.verifyPassword(payload.password);

		if (!verifyResult) return {};

		const [jwtAccess, refreshToken] = await Promise.all([
			access.generateJwtAccess(payload.secret, payload.jwtAccessLifetime),
			access.addOrReplaceRefreshToken(
				payload.refreshId,
				payload.secret,
				payload.refreshLifetime,
			),
		]);

		return { jwtAccess, refreshToken };
	}

	async update(payload: UpdatePayload) {
		const { firstName, lastName, username } = payload;

		if (firstName || firstName === null) this.setFirstName(firstName);
		if (lastName || lastName === null) this.setLastName(lastName);
		if (username) this.setUsername(username);

		return this;
	}

	private setAccess(access: Access) {
		this._access = access;
	}

	private setFirstName(firstName: FirstName) {
		this._firstName = firstName;
	}

	private setLastName(lastName: LastName) {
		this._lastName = lastName;
	}

	private setUsername(username: string) {
		this._username = username;
	}

	getUsername(): string {
		return this._username;
	}

	getAcesss(): Access | undefined {
		return this._access;
	}

	getFirstName(): FirstName {
		return this._firstName;
	}

	getLastName(): LastName {
		return this._lastName;
	}

	toPlainObject(): Readonly<CPayload & { access?: Access }> {
		return {
			id: this._id,
			firstName: this._firstName,
			lastName: this._lastName,
			username: this._username,
			access: this._access,
		};
	}
}
