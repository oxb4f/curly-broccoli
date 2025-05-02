import type { BaseEvent } from "../../entities/events/base";
import type { EventDispatcher } from "../../services/context";
import type { Connection } from "../data-src/pg/connection";
import { events } from "../data-src/pg/schema";

export class DbEventDispatcher implements EventDispatcher {
	constructor(private readonly _connection: Connection) {}

	async dispatch(event: BaseEvent): Promise<void> {
		await this._connection
			.insert(events)
			.values({
				id: event.getId(),
				name: event.getName(),
				payload: event.toPlainObject(),
				toUserId: event.getToUserId(),
				fromUserId: event.getFromUserId(),
			})
			.execute();
	}
}
