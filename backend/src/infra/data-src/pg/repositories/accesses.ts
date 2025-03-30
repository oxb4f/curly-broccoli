import { and, eq } from "drizzle-orm";
import type {
	AccessUpdateData,
	AccessesRepository,
	GetAccessDto,
	GetAccessFilter,
} from "../../../../services/accesses/repository";
import { accesses, type users } from "../schema";
import { BaseRepository } from "./base";

export type SelectAccess = typeof users.$inferSelect;

export class PgAccessesRepository
	extends BaseRepository
	implements AccessesRepository
{
	async list(): Promise<never> {
		throw new Error("Not implemented");
	}

	async create(): Promise<never> {
		throw new Error("Not implemented");
	}

	async get(filter: GetAccessFilter): Promise<GetAccessDto | null> {
		const eqArray = [];
		for (const k of Object.keys(filter) as Array<keyof typeof filter>) {
			eqArray.push(eq(accesses[k], filter[k]!));
		}

		const result = await this._connection
			.select()
			.from(accesses)
			.where(and(...eqArray))
			.limit(1)
			.execute();

		const record = result?.[0];

		if (!record?.id) return null;

		return {
			...record,
			refreshTokens: record.refreshTokens as Record<string, string>,
		};
	}

	async update(filter: GetAccessFilter, data: AccessUpdateData): Promise<void> {
		if (!(filter.id || filter.login)) return;

		const where = filter.id
			? eq(accesses.id, filter.id)
			: eq(accesses.login, filter.login!);

		await this._connection
			.update(accesses)
			.set({
				login: data.login,
				password: data.password,
				refreshTokens: data.refreshTokens,
			})
			.where(where)
			.execute();
	}
}
