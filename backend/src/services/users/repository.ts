import type { User } from "../../entities/user";

export type ExistsArgs = { username: string; notId?: number };
export type GetUserFilter = {
	username?: string;
	id?: number;
	accessId?: number;
};

export interface UsersRepository {
	createFromEntity(user: User): Promise<void>;
	updateFromEntity(user: User): Promise<void>;
	getUser(filter: GetUserFilter): Promise<User | null>;
	exists(args: ExistsArgs): Promise<boolean>;
}
