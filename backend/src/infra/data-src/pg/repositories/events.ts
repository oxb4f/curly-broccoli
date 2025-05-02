import { and, count, eq } from "drizzle-orm";
import type {
	ListEventsDto,
	ListEventsFilter,
} from "../../../../services/events/repository";
import type { EventsRepository } from "../../../../services/events/repository";
import { events, users } from "../schema";
import { BaseRepository } from "./base";

export class PgEventsRepository
	extends BaseRepository
	implements EventsRepository
{
	create(): Promise<never> {
		throw new Error("Method not implemented.");
	}

	update(): Promise<never> {
		throw new Error("Method not implemented.");
	}

	get(): Promise<never> {
		throw new Error("Method not implemented.");
	}

	async list(filter: ListEventsFilter): Promise<ListEventsDto> {
		const total = await this.getTotal(filter);

		let data: ListEventsDto["data"] = [];

		if (!total) return { data, total };

		const query = this._connection
			.select()
			.from(events)
			.innerJoin(users, eq(users.id, events.fromUserId))
			.where(and(...this.transformObjectIntoEqSequence(filter, events)))
			.$dynamic();

		this.addLimit(query, filter.limit);
		this.addOffset(query, filter.offset);
		this.addOrder(query, events, filter.orderDirection, filter.orderField);

		const result = await query.execute();

		data = result.map((row) => {
			return {
				id: row.events.id,
				name: row.events.name,
				payload: row.events.payload,
				toUserId: row.events.toUserId,
				fromUser: {
				    id: row.users.id,
                    username: row.users.username,
                    firstName: row.users.firstName,
                    lastName: row.users.lastName,
                    imageUrl: row.users.imageUrl,
				},
				createdAt: row.events.createdAt,
			};
		});

		return {
			data,
			total,
		};
	}

	private async getTotal(filter: ListEventsFilter) {
		const result = await this._connection
			.select({ count: count() })
			.from(events)
			.where(and(...this.transformObjectIntoEqSequence(filter, events)))
			.execute();

		return result[0]?.count ?? 0;
	}
}
