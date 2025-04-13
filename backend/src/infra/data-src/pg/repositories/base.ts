import { type SQL, asc, desc, eq, getTableColumns } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { PgSelect } from "drizzle-orm/pg-core/query-builders/select.types";
import type { OrderDirection } from "../../../../services/base-repository";
import type { Connection } from "../connection";

export const ORDER_DIRECTION_MAP = {
	asc: asc,
	desc: desc,
} as const;

export type MaybeEmptyValue<T> = undefined | null | T;

export abstract class BaseRepository {
	constructor(protected _connection: Connection) {}

	protected addOrder<T extends PgSelect>(
		qb: T,
		table: PgTable<any>,
		orderDirection?: MaybeEmptyValue<OrderDirection>,
		orderField?: MaybeEmptyValue<string>,
	): T {
		if (!(orderDirection && orderField)) return qb;

		const tableColumns = getTableColumns(table);
		const column = tableColumns[orderField as keyof typeof tableColumns];
		if (!column) return qb;

		return qb.orderBy(ORDER_DIRECTION_MAP[orderDirection](column));
	}

	protected addLimit<T extends PgSelect>(
		qb: T,
		limit?: MaybeEmptyValue<number>,
	): T {
		if (!limit) return qb;

		return qb.limit(limit);
	}

	protected addOffset<T extends PgSelect>(
		qb: T,
		offset?: MaybeEmptyValue<number>,
	): T {
		if (!offset) return qb;

		return qb.offset(offset);
	}

	protected transformObjectIntoEqSequence(
		object: Record<string, any>,
		table: PgTable<any>,
	): Array<SQL> {
		const tableColumns = getTableColumns(table);

		return Object.entries(object)
			.map(([key, value]) => {
				const column = tableColumns[key as keyof typeof tableColumns];

				if (!column) return null;

				return eq(column, value);
			})
			.filter(Boolean) as Array<SQL>;
	}
}
