import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getPrivateBooks, getPublicBooks } from '../services/api/book';
import InfiniteQuery from '@app/query/components/InfiniteQuery';

const BookInfiniteQueryWrapper = ({ userId, children }) => {
  const queryFn = userId
    ? (offset) => getPrivateBooks(userId, { offset })
    : (offset) => getPublicBooks({ offset });

  const queryKeys = userId
    ? [...QUERY_KEYS.BOOKS.PRIVATE, Number(userId)]
    : QUERY_KEYS.BOOKS.PUBLIC;

  const transformData = (data) => data.books;

  const queryOptions = userId ? { enabled: Boolean(userId) } : {};

  return (
    <InfiniteQuery
      callback={queryFn}
      keys={queryKeys}
      dataTransformer={transformData}
      options={queryOptions}
    >
      {(books) => children(books)}
    </InfiniteQuery>
  );
};

export default BookInfiniteQueryWrapper;
