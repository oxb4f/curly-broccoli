import type { Access, Login, Password } from "../../entities/access";
import type { Id } from "../../entities/types/id";
import type { BaseRepository, RepositoryTypes } from "../base-repository";

export type GetAccessFilter = { login?: string; id?: Id };

export interface GetAccessDto {
	id: Id;
	login: Login;
	password: Password;
	refreshTokens: Record<string, string>;
}

export type AccessUpdateData = {
	login?: Login;
	password?: Password;
	refreshTokens?: Record<string, string>;
};

export interface AccessesRepository
	extends BaseRepository<
		RepositoryTypes<
			Access,
			never,
			GetAccessDto | null,
			never,
			GetAccessFilter,
			AccessUpdateData
		>
	> {
	create(access: Access): Promise<void>;
	update(filter: GetAccessFilter, data: AccessUpdateData): Promise<void>;
}
