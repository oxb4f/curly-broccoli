import { and, eq } from "drizzle-orm";
import { Access, type AccessHashedPayload } from "../../../../entities/access";
import type {
	AccessesRepository,
	GetAccessFilter,
} from "../../../../services/accesses/repository";
import { accesses, type users } from "../schema";
import { BaseRepository } from "./base";

export type SelectAccess = typeof users.$inferSelect;

export class PgAccessesRepository
	extends BaseRepository
	implements AccessesRepository
{
	async getAccess(filter: GetAccessFilter): Promise<Access | null> {
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

		return Access.fromHashed(record as AccessHashedPayload);
	}

	async updateFromEntity(access: Access): Promise<void> {
		await this._connection
			.update(accesses)
			.set({
				login: access.getLogin(),
				password: access.getPassword(),
				refreshTokens: Object.fromEntries(access.getRefreshTokens().entries()),
			})
			.where(eq(accesses.id, access.getId()))
			.execute();
	}
}
