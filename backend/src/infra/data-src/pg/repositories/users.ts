import { and, count, eq, not } from "drizzle-orm";
import { Access, type AccessHashedPayload } from "../../../../entities/access";
import type { Social, User } from "../../../../entities/user";
import type {
	ExistsArgs,
	GetUserDto,
	GetUserFilter,
	UserUpdateData,
	UsersRepository,
} from "../../../../services/users/repository";
import { accesses, users } from "../schema";
import { BaseRepository } from "./base";

export type SelectUser = typeof users.$inferSelect;

export class PgUsersRepository
	extends BaseRepository
	implements UsersRepository
{
	async list(): Promise<never> {
		throw new Error("Not implemented");
	}

	async exists({ username, notId }: ExistsArgs) {
		const eqUsername = eq(users.username, username);
		const where = notId
			? and(eqUsername, not(eq(users.id, notId)))
			: eqUsername;

		const result = await this._connection
			.select({ c: count(users.id) })
			.from(users)
			.where(where);

		if (!result[0]?.c) return false;

		return true;
	}

	async create(user: User) {
		await this._connection.transaction(async (tx) => {
			await tx
				.insert(users)
				.values({
					id: user.getId(),
					firstName: user.getFirstName(),
					lastName: user.getLastName(),
					username: user.getUsername(),
				})
				.execute();

			const access = user.getAcesss();

			if (!access) return;

			await tx
				.insert(accesses)
				.values({
					id: access.getId(),
					login: access.getLogin(),
					password: access.getPassword(),
					refreshTokens: Object.fromEntries(
						access.getRefreshTokens().entries(),
					),
					userId: user.getId(),
				})
				.execute();
		});
	}

	async update(filter: GetUserFilter, data: UserUpdateData) {
		await this._connection.transaction(async (tx) => {
			if (!(filter.accessId || filter.id || filter.username)) return;

			const where = this.#buildWhereToGetUser(filter);

			await tx
				.update(users)
				.set({
					username: data.username,
					firstName: data.firstName,
					lastName: data.lastName,
					birthday: data.birthday?.toUTCString() ?? null,
					social: data.social,
					imageUrl: data.imageUrl,
				})
				.where(where)
				.execute();

			if (!(data.access && (filter.id || filter.accessId))) return;

			await tx
				.update(accesses)
				.set({
					login: data.access.login,
					password: data.access.password,
					refreshTokens: data.access.refreshTokens,
				})
				.where(this.#buildWhereToGetAccess(filter))
				.execute();
		});
	}

	async get(filter: GetUserFilter): Promise<GetUserDto | null> {
		const innerJoinAccessOn = filter.accessId
			? and(eq(accesses.id, filter.accessId), eq(accesses.userId, users.id))
			: eq(accesses.userId, users.id);

		const result = await this._connection
			.select()
			.from(users)
			.innerJoin(accesses, innerJoinAccessOn)
			.where(this.#buildWhereToGetUser(filter))
			.limit(1)
			.execute();

		const record = result?.[0];

		if (!record?.users?.id) return null;

		return {
			...record.users,
			social: record.users.social as Social,
			birthday: record.users.birthday ? new Date(record.users.birthday) : null,
			access: await Access.fromHashed(record.accesses as AccessHashedPayload),
		};
	}

	#buildWhereToGetUser(filter: GetUserFilter) {
		const eqArray = [];

		for (const k of Object.keys(filter) as Array<keyof typeof filter>) {
			if (k === "accessId" || filter[k] === undefined) continue;

			eqArray.push(eq(users[k], filter[k]));
		}

		return and(...eqArray);
	}

	#buildWhereToGetAccess(filter: GetUserFilter) {
		const eqArray = [];

		if (filter.id) {
			eqArray.push(eq(accesses.userId, filter.id));
		}

		if (filter.accessId) {
			eqArray.push(eq(accesses.id, filter.accessId));
		}

		return and(...eqArray);
	}
}
