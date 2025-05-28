import { makeService } from "../../../make-service";
import { FiltersDtoIn, FiltersDtoOut, type InShape, type OutShape } from "./dto";

export default makeService<InShape, OutShape>(async ({ dto, context }) => {
    const filters = await context.userBooksRepository.getFilters({ userId: dto.userId });

    return FiltersDtoOut.create({
        genres: filters.genres,
        authors: filters.authors,
        numberOfPagesMin: filters.numberOfPagesMin,
        numberOfPagesMax: filters.numberOfPagesMax,
        total: filters.total,
    });
}, FiltersDtoIn);
