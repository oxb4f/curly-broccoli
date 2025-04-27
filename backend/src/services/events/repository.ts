import type { CreatedAt } from "../../entities/base";
import type { BaseEvent } from "../../entities/events/base";
import type { Id } from "../../entities/types/id";
import type { BaseRepository, OrderDirection } from "../base-repository";
import type { RepositoryTypes } from "../base-repository";

export type ListEventsFilter = {
	toUserId: Id;
	fromUserId?: Id;
	limit?: number;
	offset?: number;
	orderDirection?: OrderDirection;
	orderField?: string;
};

export type ListEventsDto = {
	data: {
		id: Id;
		name: string;
		payload: any;
		toUserId: Id;
		fromUserId: Id;
		createdAt: CreatedAt;
	}[];
	total: number;
};

export interface EventsRepository
	extends BaseRepository<
		RepositoryTypes<
			BaseEvent,
			ListEventsDto,
			never,
			ListEventsFilter,
			never,
			never
		>
	> {
	create(): Promise<never>;
	update(): Promise<never>;
	get(): Promise<never>;
	list(filter: ListEventsFilter): Promise<ListEventsDto>;
}
