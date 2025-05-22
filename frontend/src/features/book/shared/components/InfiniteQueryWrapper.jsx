import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getPrivateBooks, getPublicBooks } from '../services/api/book';
import InfiniteQuery from '@app/query/components/InfiniteQuery';
import Spinner from '@shared/components/ui/Spinner';

const BookInfiniteQueryWrapper = ({
  userId,
  isUserLoading,
  children,
  searchTerm = '',
  sortParams = []
}) => {
  console.log(userId);

  if (isUserLoading && userId === undefined) {
    return (
      <div className={'size-full flex flex-col justify-center items-center'}>
        <Spinner className={'size-20 border-8'} />
      </div>
    );
  }

  const queryFn = userId
    ? (offset) => getPrivateBooks(userId, { offset, ...sortParams })
    : (offset) => getPublicBooks({ offset, searchTerm, ...sortParams });

  const queryKeys = userId
    ? [...QUERY_KEYS.BOOKS.PRIVATE, Number(userId)]
    : QUERY_KEYS.BOOKS.PUBLIC;

  const transformData = (data) => data.books;

  const queryOptions = userId ? { enabled: Boolean(userId) } : {};

  return (
    <InfiniteQuery
      callback={queryFn}
      keys={[queryKeys, ...Object.values(sortParams), searchTerm]}
      dataTransformer={transformData}
      options={queryOptions}
      placeholder="No books found"
    >
      {(books) => children(books)}
    </InfiniteQuery>
  );
};

export default BookInfiniteQueryWrapper;
