import { and, count, eq, not } from "drizzle-orm";
import type { User } from "../../../../entities/user";
import type {
	ExistsArgs,
	UsersRepository,
} from "../../../../services/users/repository";
import { accesses, users } from "../schema";
import { BaseRepository } from "./base";

export type SelectAccess = typeof users.$inferSelect;

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

			if (access) {
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
			}
		});
	}
}
