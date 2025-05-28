import { and, count, eq, inArray, not, or, sql } from "drizzle-orm";
import { Access, type AccessHashedPayload } from "../../../../entities/access";
import type { Social, User } from "../../../../entities/user";
import type {
	ExistsArgs,
	GetUserDto,
	GetUserFilter,
	ListUserDto,
	ListUserFilter,
	UserUpdateData,
	UsersRepository,
} from "../../../../services/users/repository";
import { accesses, followers, userBooks, users } from "../schema";
import { BaseRepository } from "./base";

export type SelectUser = typeof users.$inferSelect;

export class PgUsersRepository
	extends BaseRepository
	implements UsersRepository
{
	async list(filter: ListUserFilter): Promise<ListUserDto> {
		const total = await this.getTotal();

		let data: ListUserDto["data"] = [];

		if (!total) return { data, total };

		const query = this._connection
			.select({
				id: users.id,
				username: users.username,
				firstName: users.firstName,
				lastName: users.lastName,
				birthday: users.birthday,
				social: users.social,
				imageUrl: users.imageUrl,
				...(Number.isInteger(filter.followedByUserId) && {
					followed: sql<boolean>`EXISTS (
						SELECT 1
						FROM followers
						WHERE followers.user_id = users.id
						AND followers.follower_id = ${filter.followedByUserId}
					)`,
				}),
			})
			.from(users)
			.$dynamic();

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(query, [users], filter.orderDirection, filter.orderField);

		const where = [];

		if (filter.notId) {
			where.push(not(eq(users.id, filter.notId)));
		}

		if (filter.id?.length) {
			where.push(inArray(users.id, filter.id));
		}

		const result = await query.where(and(...where)).execute();

		data = result.map((row) => {
			return {
				id: row.id,
				username: row.username,
				firstName: row.firstName,
				lastName: row.lastName,
				birthday: row.birthday ? new Date(row.birthday) : null,
				social: row.social as Social,
				imageUrl: row.imageUrl,
				followed: row.followed ?? false,
			};
		});

		return {
			data,
			total,
		};
	}

	private async getTotal() {
		const result = await this._connection
			.select({ total: count() })
			.from(users)
			.execute();

		return result[0]?.total ?? 0;
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

		let followersId: number | null = null;
		let numberOfReadBooks = 0;
		let numberOfFollowing = 0;
		let numberOfFollowers = 0;

		if (filter.id) {
			const followersWithFollowings = await this._connection
				.select({
					id: followers.id,
					userId: followers.userId,
					followerId: followers.followerId,
				})
				.from(followers)
				.where(
					or(
						eq(followers.followerId, filter.id),
						eq(followers.userId, filter.id),
					),
				)
				.execute();

			if (filter.followedByUserId) {
				followersId =
					followersWithFollowings.find(
						(follower) =>
							follower.userId === filter.id &&
							follower.followerId === filter.followedByUserId,
					)?.id ?? null;
			}

			numberOfFollowers = followersWithFollowings.filter(
				(follower) => follower.userId === filter.id,
			).length;

			numberOfFollowing = followersWithFollowings.filter(
				(follower) => follower.followerId === filter.id,
			).length;

			numberOfReadBooks =
				(
					await this._connection
						.select({ value: count() })
						.from(userBooks)
						.where(
							and(eq(userBooks.userId, filter.id), eq(userBooks.isRead, true)),
						)
						.execute()
				)[0]?.value ?? 0;
		}

		return {
			...record.users,
			social: record.users.social as Social,
			birthday: record.users.birthday ? new Date(record.users.birthday) : null,
			access: await Access.fromHashed(record.accesses as AccessHashedPayload),
			followed: Number.isInteger(followersId),
			followersId,
			numberOfReadBooks,
			numberOfFollowing,
			numberOfFollowers,
		};
	}

	#buildWhereToGetUser(filter: GetUserFilter) {
		const eqArray = [];

		for (const k of Object.keys(filter) as Array<keyof typeof filter>) {
			if (
				k === "accessId" ||
				filter[k] === undefined ||
				k === "followedByUserId"
			)
				continue;

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
