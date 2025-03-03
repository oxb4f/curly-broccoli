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
import type { BaseRepository } from "../base-repository";
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

export interface UsersRepository
	extends BaseRepository<
		RepositoryTypes<
			User,
			never,
			GetUserDto | null,
			never,
			GetUserFilter,
			UserUpdateData
		>
	> {
	create(user: User): Promise<void>;
	update(filter: GetUserFilter, user: UserUpdateData): Promise<void>;
	get(filter: GetUserFilter): Promise<GetUserDto | null>;
	exists(args: ExistsArgs): Promise<boolean>;
}
