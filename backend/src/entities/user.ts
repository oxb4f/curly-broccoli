import { Access, type JwtAccessPayload, type RefreshPayload } from "./access";
import { Base } from "./base";

type CPayload = {
	id?: number;
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

export class User extends Base {
	private _username: string;
	private _access?: Access;

	private constructor(payload: CPayload) {
		super(payload.id);

		this._username = payload.username;
	}

	static async fromCredentials(
		payload: UserWithCredentialsPayload,
	): Promise<[User, string, string]> {
		const [access, refreshToken] = await Access.from({
			...payload,
			login: payload.username,
		});

		const user = new User({ ...payload });

		user.setAccess(access);

		const jwtAccess = await access.generateJwtAccess(
			payload.secret,
			payload.jwtAccessLifetime,
			{ userId: user.getId() },
		);

		return [user, jwtAccess, refreshToken];
	}

	static async from(payload: UserPayload): Promise<User> {
		const user = new User({ ...payload });

		user.setAccess(payload.access);

		return user;
	}

	private setAccess(access: Access) {
		this._access = access;
	}

	getUsername(): string {
		return this._username;
	}

	getAcesss(): Access | undefined {
		return this._access;
	}

	toPlainObject(): Readonly<CPayload & { access?: Access }> {
		return {
			id: this._id,
			username: this._username,
			access: this._access,
		};
	}
}
