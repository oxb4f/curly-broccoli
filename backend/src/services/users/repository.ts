import type { User } from "../../entities/user";

export type ExistsArgs = { username: string; notId?: number };

export interface UsersRepository {
	createFromEntity(user: User): Promise<void>;
	exists(args: ExistsArgs): Promise<boolean>;
}
