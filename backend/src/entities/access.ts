import bcrypt from "bcrypt";
import { TokenError, createSigner, createVerifier } from "fast-jwt";

import { Base } from "./base";

const SALT_ROUNDS = 10;

export interface CompleteJwtPayload {
	[k: string]: any;

	accessId: number;
}

type CPayload = {
	id?: number;
	login: string;
	password: string;
	refreshTokens?: Record<string, string>;
};

export type RefreshPayload = {
	refreshId: string;
	secret: string;
	refreshLifetime: number;
};

export type JwtAccessPayload = {
	secret: string;
	jwtAccessLifetime: number;
};

export type AccessPayload = CPayload & RefreshPayload;

export type AccessHashedPayload = CPayload & {
	refreshTokens: Record<string, string>;
};

export type TokensRefreshPayload = RefreshPayload &
	JwtAccessPayload & {
		refresh: string;
	};

export class Access extends Base {
	private _login: string;
	private _password: string;
	private _refreshTokens: Map<string, string>;

	private constructor(payload: CPayload) {
		super(payload.id);

		this._login = payload.login;
		this._password = payload.password;
		this._refreshTokens = payload.refreshTokens
			? new Map(Object.entries(payload.refreshTokens))
			: new Map();
	}

	static async from(payload: AccessPayload): Promise<[Access, string]> {
		const access = new Access({ ...payload });

		await access.setPassword(payload.password);

		const refresh = await access.addOrReplaceRefreshToken(
			payload.refreshId,
			payload.secret,
			payload.refreshLifetime,
		);

		return [access, refresh];
	}

	static async fromHashed(payload: AccessHashedPayload): Promise<Access> {
		return new Access({ ...payload });
	}

	getLogin(): string {
		return this._login;
	}

	getPassword(): string {
		return this._password;
	}

	getRefreshTokens(): Map<string, string> {
		return this._refreshTokens;
	}

	getRefreshToken(id: string): string | undefined {
		return this._refreshTokens.get(id);
	}

	async setPassword(password: string): Promise<void> {
		this._password = await bcrypt.hash(password, SALT_ROUNDS);
	}

	async addOrReplaceRefreshToken(
		id: string,
		secret: string,
		lifetime: number,
	): Promise<string> {
		const refreshToken = await this.generateRefreshToken(secret, lifetime);

		const hashed = await bcrypt.hash(refreshToken, SALT_ROUNDS);

		this._refreshTokens.set(id, hashed);

		return refreshToken;
	}

	deleteRefreshToken(id: string): void {
		this._refreshTokens.delete(id);
	}

	async verifyRefreshToken(id: string, token: string, secret: string) {
		try {
			if (!this._refreshTokens.has(id)) return false;

			const compareResult = await bcrypt.compare(
				token,
				this._refreshTokens.get(id) as string,
			);

			if (!compareResult) return false;

			const verifier = createVerifier({
				key: async () => secret,
				ignoreExpiration: false,
			});

			await verifier(token);

			return true;
		} catch (error) {
			if (error instanceof TokenError) return false;
			throw error;
		}
	}

	async verifyPassword(password: string) {
		return await bcrypt.compare(password, this._password);
	}

	async generateJwtAccess(
		secret: string,
		lifetime: number,
		payload: Record<string, unknown> = {},
	) {
		return await this.#generateJwt(secret, lifetime, {
			...payload,
			accessId: this._id,
		});
	}

	async generateRefreshToken(secret: string, lifetime: number) {
		return await this.#generateJwt(secret, lifetime, { accessId: this._id });
	}

	async #generateJwt(
		secret: string,
		lifetime: number,
		payload: Record<string, unknown>,
	) {
		const signer = createSigner({
			key: async () => secret,
			expiresIn: lifetime,
		});

		return await signer({ ...payload });
	}

	static async verifyAndDecodeJwt(
		token: string,
		secret: string,
		ignoreExpiration = false,
	): Promise<CompleteJwtPayload | null> {
		try {
			const verifier = createVerifier({
				key: async () => secret,
				ignoreExpiration,
			});

			return await verifier(token);
		} catch (error) {
			if (error instanceof TokenError) return null;
			throw error;
		}
	}

	async refresh(payload: TokensRefreshPayload) {
		const verifyResult = await this.verifyRefreshToken(
			payload.refreshId,
			payload.refresh,
			payload.secret,
		);

		if (!verifyResult) return {};

		const [jwtAccess, refreshToken] = await Promise.all([
			this.generateJwtAccess(payload.secret, payload.jwtAccessLifetime),
			this.addOrReplaceRefreshToken(
				payload.refreshId,
				payload.secret,
				payload.refreshLifetime,
			),
		]);

		return { refreshToken, jwtAccess };
	}

	toPlainObject(): Readonly<Omit<CPayload, "password" | "refreshTokens">> {
		return {
			id: this._id,
			login: this._login,
		};
	}
}
