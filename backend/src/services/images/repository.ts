import type { Image } from "../../entities/image";
import type { BaseRepository, RepositoryTypes } from "../base-repository";

export interface ImagesRepository
	extends BaseRepository<RepositoryTypes<Image>> {
	create(image: Image): Promise<void>;
}
