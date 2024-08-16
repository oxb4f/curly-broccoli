import assert from "node:assert/strict";
import { Access, type JwtAccessPayload, type RefreshPayload } from "./access";
import { Base } from "./base";

export type FirstName = string | null | undefined;
export type LastName = string | null | undefined;
export type Birthday = Date | null | undefined;
export type Username = string;
export type Password = string;
export type Social = Partial<Record<"telegram" | "instagram", string | null>>;

type CPayload = {
	id?: number;
	firstName: FirstName;
	lastName: LastName;
	username: Username;
	birthday: Birthday;
	social: Social;
};

export type UserWithCredentialsPayload = CPayload &
	RefreshPayload &
	JwtAccessPayload & {
		password: Password;
	};

export type UserPayload = CPayload & {
	access: Access;
};

export type LoginPayload = RefreshPayload &
	JwtAccessPayload & {
		password: Password;
	};

export type UpdatePayload = {
	firstName?: FirstName;
	lastName?: LastName;
	username?: Username;
	birthday?: Birthday;
	social?: Social;
};

export class User extends Base {
	private _username: Username;
	private _access?: Access;
	private _firstName: FirstName;
	private _lastName: LastName;
	private _birthday: Birthday;
	private _social: Social;

	private constructor(payload: CPayload) {
		super(payload.id);

		this._username = payload.username;
		this._firstName = payload.firstName;
		this._lastName = payload.lastName;
		this._birthday = payload.birthday;
		this._social = payload.social;
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
		const { firstName, lastName, username, birthday, social } = payload;

		if (firstName || firstName === null) this.setFirstName(firstName);
		if (lastName || lastName === null) this.setLastName(lastName);
		if (birthday || birthday === null) this.setBirthday(birthday);
		if (social || social === null) this.setSocial(social);
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

	private setUsername(username: Username) {
		this._username = username;
	}

	private setBirthday(birthday: Birthday) {
		this._birthday = birthday;
	}

	private setSocial(social: Social) {
		this._social = social;
	}

	getSocial(): Social {
		return this._social;
	}

	getBirthday(): Birthday {
		return this._birthday;
	}

	getUsername(): Username {
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
			birthday: this._birthday,
			social: this._social,
			access: this._access,
		};
	}
}
