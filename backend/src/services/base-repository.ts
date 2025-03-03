export type RepositoryTypes<
	Entity,
	ListResponse = Record<string, any> | Promise<never> | never,
	GetResponse = Entity | Record<string, any> | null | Promise<never>,
	ListFilter = Record<string, any> | null | undefined,
	GetFilter = Record<string, any> | null | undefined,
	UpdateData = Partial<Entity> | Record<string, any> | undefined,
> = {
	entity: Entity;
	listResponse: ListResponse;
	getResponse: GetResponse;
	listFilter: ListFilter;
	getFilter: GetFilter;
	updateData: UpdateData;
};

export interface BaseRepository<T extends RepositoryTypes<any>> {
	create(data: T["entity"]): Promise<void>;
	update(filter: T["getFilter"], data: T["updateData"]): Promise<void>;
	list(filter: T["listFilter"]): Promise<T["listResponse"]>;
	get(filter: T["getFilter"]): Promise<T["getResponse"]>;
}
