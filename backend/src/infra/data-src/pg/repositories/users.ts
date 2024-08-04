import { and, count, eq, not } from "drizzle-orm";
import { Access, type AccessHashedPayload } from "../../../../entities/access";
import { User } from "../../../../entities/user";
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
		for (const k of Object.keys(filter) as Array<keyof typeof filter>) {
			eqArray.push(eq(users[k], filter[k]!));
		}

		const result = await this._connection
			.select()
			.from(users)
			.innerJoin(accesses, eq(users.id, accesses.userId))
			.where(and(...eqArray))
			.limit(1)
			.execute();

		const record = result?.[0];

		if (!record?.users?.id) return null;

		return User.from({
			...record.users,
			access: await Access.fromHashed(record.accesses as AccessHashedPayload),
		});
	}
}
