import BookPublicCatalog from '../components/Catalog';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';

const PublicBooksPage = () => {
  return (
    <section className="flex-col size-full">
      <BookInfiniteQueryWrapper>
        {(books) => <BookPublicCatalog items={books} />}
      </BookInfiniteQueryWrapper>
    </section>
  );
};

export default PublicBooksPage;
