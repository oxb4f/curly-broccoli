import type {
	Access,
	Login,
	Password,
	RefreshTokens,
} from "../../entities/access";
import type { Id } from "../../entities/types/id";
import type {
	Birthday,
	FirstName,
	ImageUrl,
	LastName,
	Social,
	User,
	Username,
} from "../../entities/user";
import type { BaseRepository, OrderDirection } from "../base-repository";
import type { RepositoryTypes } from "../base-repository";

export type ExistsArgs = { username: string; notId?: Id };

export type GetUserFilter = {
	username?: string;
	id?: Id;
	accessId?: Id;
};

export interface GetUserDto {
	id: Id;
	firstName: FirstName;
	lastName: LastName;
	username: Username;
	birthday?: Birthday;
	social: Social;
	imageUrl?: ImageUrl;
	access: Access;
}

export type UserUpdateData = {
	firstName?: FirstName;
	lastName?: LastName;
	username?: Username;
	birthday?: Birthday;
	social?: Social;
	imageUrl?: ImageUrl;
	access?: {
		id?: Id;
		login?: Login;
		password?: Password;
		refreshTokens?: RefreshTokens;
	};
};

export type ListUserFilter = {
	followedByUserId?: Id;
	notId?: Id;
	limit?: number;
	offset?: number;
	orderDirection?: OrderDirection;
	orderField?: string;
};

export type ListUserDto = {
	data: {
		id: Id;
		username: Username;
		firstName: FirstName;
		lastName: LastName;
		birthday: Birthday;
		social: Social;
		imageUrl: ImageUrl;
		followed: boolean;
	}[];
	total: number;
};

export interface UsersRepository
	extends BaseRepository<
		RepositoryTypes<
			User,
			ListUserDto,
			GetUserDto | null,
			ListUserFilter,
			GetUserFilter,
			UserUpdateData
		>
	> {
	create(user: User): Promise<void>;
	update(filter: GetUserFilter, user: UserUpdateData): Promise<void>;
	get(filter: GetUserFilter): Promise<GetUserDto | null>;
	exists(args: ExistsArgs): Promise<boolean>;
	list(filter: ListUserFilter): Promise<ListUserDto>;
}
