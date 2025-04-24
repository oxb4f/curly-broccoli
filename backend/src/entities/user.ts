import assert from "node:assert/strict";
import { Access, type JwtAccessPayload, type RefreshPayload } from "./access";
import { Base, type CreatedAt, type UpdatedAt } from "./base";
import type { MaybeNumberId } from "./types/id";

export type FirstName = string | null | undefined;
export type LastName = string | null | undefined;
export type Birthday = Date | null | undefined;
export type Username = string;
export type Password = string;
export type Social = Partial<Record<"telegram" | "instagram", string | null>>;
export type ImageUrl = string | null | undefined;

interface UserProfileData {
	id?: MaybeNumberId;
	firstName?: FirstName;
	lastName?: LastName;
	username: Username;
	birthday?: Birthday;
	social?: Social;
	imageUrl?: ImageUrl;
	access?: Access;
	createdAt?: CreatedAt;
	updatedAt?: UpdatedAt;
}

type UserProfileUpdateData = Partial<Omit<UserProfileData, "id" | "access">>;

export type UserWithCredentialsPayload = UserProfileData &
	RefreshPayload &
	JwtAccessPayload & {
		password: Password;
	};

export type UserPayload = UserProfileData & {
	access: Access;
};

export type LoginPayload = RefreshPayload &
	JwtAccessPayload & {
		password: Password;
	};

export class User extends Base {
	private _username: Username;
	private _access?: Access;
	private _firstName: FirstName;
	private _lastName: LastName;
	private _birthday: Birthday;
	private _social: Social;
	private _imageUrl: ImageUrl;

	private constructor(payload: UserProfileData) {
		super({
			id: payload.id,
			createdAt: payload.createdAt,
			updatedAt: payload.updatedAt,
		});

		this._username = payload.username;
		this._firstName = payload.firstName ?? null;
		this._lastName = payload.lastName ?? null;
		this._birthday = payload.birthday ?? null;
		this._social = payload.social ?? {};
		this._imageUrl = payload.imageUrl ?? null;
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

	async update(payload: UserProfileUpdateData) {
		const { firstName, lastName, username, birthday, social, imageUrl } =
			payload;

		if (firstName || firstName === null) this.setFirstName(firstName);
		if (lastName || lastName === null) this.setLastName(lastName);
		if (birthday || birthday === null) this.setBirthday(birthday);
		if (social || social === null) this.setSocial(social);
		if (imageUrl || imageUrl === null) this.setImageUrl(imageUrl);
		if (username) this.setUsername(username);

		this._updatedAt = new Date();

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

	getImageUrl(): ImageUrl {
		return this._imageUrl;
	}

	setImageUrl(imageUrl: ImageUrl) {
		this._imageUrl = imageUrl;
	}

	toPlainObject(): UserProfileData {
		return {
			id: this._id,
			firstName: this._firstName,
			lastName: this._lastName,
			username: this._username,
			birthday: this._birthday,
			social: this._social,
			imageUrl: this._imageUrl,
			access: this._access,
		};
	}
}
