import BookPublicCatalog from '../../../components/core/Book/Public/Catalog/Catalog';
import BookInfiniteQueryWrapper from '../../../components/core/Book/InfiniteQueryWrapper/InfiniteQueryWrapper';

const SearchPage = () => {
  return (
    <section className="flex-col size-full">
      <BookInfiniteQueryWrapper>
        {(books) => <BookPublicCatalog items={books} />}
      </BookInfiniteQueryWrapper>
    </section>
  );
};

export default SearchPage;
