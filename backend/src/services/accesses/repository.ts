import type { Access } from "../../entities/access";

export type GetAccessFilter = { login?: string; id?: number };

export interface AccessesRepository {
	getAccess(filter: GetAccessFilter): Promise<Access | null>;
	updateFromEntity(access: Access): Promise<void>;
}
