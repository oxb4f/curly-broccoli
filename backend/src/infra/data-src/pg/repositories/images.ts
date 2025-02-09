import type { Image } from "../../../../entities/image";
import type { ImagesRepository } from "../../../../services/images/repository";
import { images } from "../schema";
import { BaseRepository } from "./base";

export class PgImagesRepository
	extends BaseRepository
	implements ImagesRepository
{
	async createFromEntity(image: Image) {
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
