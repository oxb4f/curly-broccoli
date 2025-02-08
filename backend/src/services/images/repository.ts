import type { Image } from "../../entities/image";

export interface ImagesRepository {
	createFromEntity(image: Image): Promise<void>;
}
