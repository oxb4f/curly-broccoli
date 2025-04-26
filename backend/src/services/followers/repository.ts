import type { CreatedAt, UpdatedAt } from "../../entities/base";
import type { Follower } from "../../entities/follower";
import type { Id } from "../../entities/types/id";
import type {
	FirstName,
	ImageUrl,
	LastName,
	Username,
} from "../../entities/user";
import type { BaseRepository, OrderDirection } from "../base-repository";
import type { RepositoryTypes } from "../base-repository";

export type ExistsArgs = {
	id?: Id;
	userId?: Id;
	followerId?: Id;
};

export type GetFollowerFilter = {
	userId?: Id;
	followerId?: Id;
	id?: Id;
};

export interface GetFollowerDto {
	id: Id;
	userId: Id;
	followerId: Id;
	createdAt: CreatedAt;
	updatedAt: UpdatedAt;
}

export type FollowerUpdateData = {
	userId?: Id;
	followerId?: Id;
};

export type ListFollowerFilter = {
	followerId?: Id;
	userId?: Id;
	limit?: number;
	offset?: number;
	orderDirection?: OrderDirection;
	orderField?: string;
};

export type ListFollowerDto = {
	data: {
		id: Id;
		user: {
			id: Id;
			username: Username;
			firstName: FirstName;
			lastName: LastName;
			imageUrl: ImageUrl;
		};
		follower: {
			id: Id;
			username: Username;
			firstName: FirstName;
			lastName: LastName;
			imageUrl: ImageUrl;
		};
		createdAt: CreatedAt;
		updatedAt: UpdatedAt;
	}[];
	total: number;
};

export type CountFollowerFilter = {
	userId?: Id;
	followerId?: Id;
};

export type CountFollowerDto = {
	followersCount: number;
	followingCount: number;
};

export interface FollowersRepository
	extends BaseRepository<
		RepositoryTypes<
			Follower,
			ListFollowerDto,
			GetFollowerDto | null,
			ListFollowerFilter,
			GetFollowerFilter,
			FollowerUpdateData
		>
	> {
	create(follower: Follower): Promise<void>;
	update(
		filter: GetFollowerFilter,
		follower: FollowerUpdateData,
	): Promise<void>;
	get(filter: GetFollowerFilter): Promise<GetFollowerDto | null>;
	exists(args: ExistsArgs): Promise<boolean>;
	list(filter: ListFollowerFilter): Promise<ListFollowerDto>;
	delete(filter: GetFollowerFilter): Promise<void>;
	count(filter: CountFollowerFilter): Promise<CountFollowerDto>;
}
