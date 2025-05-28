import { makeService } from "../../../make-service";
import { FiltersDtoOut, type OutShape } from "./dto";

export default makeService<any, OutShape>(async ({ context }) => {
    const filters = await context.booksRepository.getFilters();

    return FiltersDtoOut.create({
        genres: filters.genres,
        authors: filters.authors,
        numberOfPagesMin: filters.numberOfPagesMin,
        numberOfPagesMax: filters.numberOfPagesMax,
        total: filters.total,
    });
});
