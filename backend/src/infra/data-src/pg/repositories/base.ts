import type { Connection } from "../connection";

export abstract class BaseRepository {
	constructor(protected _connection: Connection) {}
}
