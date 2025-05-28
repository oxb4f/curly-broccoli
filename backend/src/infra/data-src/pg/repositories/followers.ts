import { and, count, eq } from "drizzle-orm";
import type { Follower } from "../../../../entities/follower";
import type {
	CountFollowerDto,
	CountFollowerFilter,
	ExistsArgs,
	FollowersRepository,
	GetFollowerFilter,
	ListFollowerDto,
	ListFollowerFilter,
} from "../../../../services/followers/repository";
import { followers, users } from "../schema";
import { BaseRepository } from "./base";

export class PgFollowersRepository
	extends BaseRepository
	implements FollowersRepository
{
	async get(filter: GetFollowerFilter) {
		const where = this.transformObjectIntoEqSequence(filter, followers);

		if (!where.length) return null;

		const query = this._connection
			.select()
			.from(followers)
			.where(and(...where))
			.limit(1);

		const result = await query.execute();

		if (!result?.[0]) {
			return null;
		}

		return {
			id: result[0].id,
			userId: result[0].userId,
			followerId: result[0].followerId,
			createdAt: result[0].createdAt,
			updatedAt: result[0].updatedAt,
		};
	}

	async list(filter: ListFollowerFilter): Promise<ListFollowerDto> {
		const total = await this.getTotal(filter);

		const data: ListFollowerDto["data"] = [];

		if (!total) return { data, total };

		const query = this._connection
			.select()
			.from(followers)
			.innerJoin(users, eq(followers.userId, users.id))
			.where(
				and(
					...this.transformObjectIntoEqSequence(
						{
							userId: filter.userId,
							followerId: filter.followerId,
						},
						followers,
					),
				),
			)
			.$dynamic();

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(query, [followers], filter.orderDirection, filter.orderField);

		const followersResult = await query.execute();

		for (const row of followersResult) {
			const follower = await this._connection
				.select()
				.from(users)
				.where(eq(users.id, row.followers.followerId))
				.limit(1);

			if (!follower[0]) {
				continue;
			}

			data.push({
				id: row.followers.id,
				user: {
					id: row.users.id,
					username: row.users.username,
					firstName: row.users.firstName,
					lastName: row.users.lastName,
					imageUrl: row.users.imageUrl,
				},
				follower: {
					id: follower[0].id,
					username: follower[0].username,
					firstName: follower[0].firstName,
					lastName: follower[0].lastName,
					imageUrl: follower[0].imageUrl,
				},
				createdAt: row.followers.createdAt,
				updatedAt: row.followers.updatedAt,
			});
		}

		return {
			data,
			total,
		};
	}

	private async getTotal(filter: ListFollowerFilter) {
		const query = this._connection
			.select({ total: count() })
			.from(followers)
			.where(
				and(
					...this.transformObjectIntoEqSequence(
						{
							userId: filter.userId,
							followerId: filter.followerId,
						},
						followers,
					),
				),
			);

		const result = await query.execute();

		return result[0]?.total ?? 0;
	}

	async create(follower: Follower) {
		await this._connection
			.insert(followers)
			.values({
				id: follower.getId(),
				userId: follower.getUserId(),
				followerId: follower.getFollowerId(),
				createdAt: follower.getCreatedAt(),
				updatedAt: follower.getUpdatedAt(),
			})
			.execute();
	}

	async update(): Promise<never> {
		throw new Error("Not implemented");
	}

	async delete(filter: GetFollowerFilter): Promise<void> {
		const where = this.transformObjectIntoEqSequence(filter, followers);

		if (!where.length) return;

		await this._connection
			.delete(followers)
			.where(and(...where))
			.execute();
	}

	async exists(args: ExistsArgs): Promise<boolean> {
		const where = this.transformObjectIntoEqSequence(args, followers);

		if (!where.length) return false;

		const query = this._connection
			.select()
			.from(followers)
			.where(and(...where))
			.limit(1);

		const result = await query.execute();

		return !!result?.[0];
	}

	async count(filter: CountFollowerFilter): Promise<CountFollowerDto> {
		return {
			followersCount: filter.userId
				? await this.getTotal({
						userId: filter.userId,
					})
				: 0,
			followingCount: filter.followerId
				? await this.getTotal({
						followerId: filter.followerId,
					})
				: 0,
		};
	}
}
