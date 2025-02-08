import { and, count, eq, not } from "drizzle-orm";
import { Access, type AccessHashedPayload } from "../../../../entities/access";
import { type Social, User } from "../../../../entities/user";
import type {
	ExistsArgs,
	GetUserFilter,
	UsersRepository,
} from "../../../../services/users/repository";
import { accesses, users } from "../schema";
import { BaseRepository } from "./base";

export type SelectUser = typeof users.$inferSelect;

export class PgUsersRepository
	extends BaseRepository
	implements UsersRepository
{
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

	async createFromEntity(user: User) {
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

	async updateFromEntity(user: User) {
		await this._connection.transaction(async (tx) => {
			await tx
				.update(users)
				.set({
					username: user.getUsername(),
					firstName: user.getFirstName(),
					lastName: user.getLastName(),
					birthday: user.getBirthday()?.toUTCString() ?? null,
					social: user.getSocial(),
					imageUrl: user.getImageUrl(),
				})
				.where(eq(users.id, user.getId()))
				.execute();

			const access = user.getAcesss();

			if (!access) return;

			await tx
				.update(accesses)
				.set({
					login: access.getLogin(),
					password: access.getPassword(),
					refreshTokens: Object.fromEntries(
						access.getRefreshTokens().entries(),
					),
				})
				.where(eq(accesses.userId, user.getId()))
				.execute();
		});
	}

	async getUser(filter: GetUserFilter): Promise<User | null> {
		const eqArray = [];

		const innerJoinQuery = [eq(users.id, accesses.userId)];

		for (const k of Object.keys(filter) as Array<keyof typeof filter>) {
			if (k === "accessId") {
				if (filter[k]) innerJoinQuery.push(eq(accesses.id, filter[k]));

				continue;
			}

			eqArray.push(eq(users[k], filter[k]!));
		}

		const result = await this._connection
			.select()
			.from(users)
			.innerJoin(accesses, and(...innerJoinQuery))
			.where(and(...eqArray))
			.limit(1)
			.execute();

		const record = result?.[0];

		if (!record?.users?.id) return null;

		return User.from({
			...record.users,
			social: record.users.social as Social,
			birthday: record.users.birthday ? new Date(record.users.birthday) : null,
			access: await Access.fromHashed(record.accesses as AccessHashedPayload),
		});
	}
}
