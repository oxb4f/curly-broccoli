import BookOthersCatalog from '../components/Catalog';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';

const OthersBooksPage = () => {
  return (
    <BookInfiniteQueryWrapper>
      {(books) => <BookOthersCatalog items={books} />}
    </BookInfiniteQueryWrapper>
  );
};

export default OthersBooksPage;
