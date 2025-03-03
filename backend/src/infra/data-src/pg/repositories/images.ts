import type { Image } from "../../../../entities/image";
import type { ImagesRepository } from "../../../../services/images/repository";
import { images } from "../schema";
import { BaseRepository } from "./base";

export class PgImagesRepository
	extends BaseRepository
	implements ImagesRepository
{
	async get(): Promise<never> {
		throw new Error("Not implemented");
	}

	async update(): Promise<never> {
		throw new Error("Not implemented");
	}

	async list(): Promise<never> {
		throw new Error("Not implemented");
	}

	async create(image: Image) {
		await this._connection.transaction(async (tx) => {
			await tx
				.insert(images)
				.values({
					id: image.getId(),
					path: image.getPath(),
				})
				.execute();
		});
	}
}
