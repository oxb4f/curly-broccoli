import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getPrivateBooks, getPublicBooks } from '../services/api/book';
import InfiniteQuery from '@app/query/components/InfiniteQuery';

const BookInfiniteQueryWrapper = ({ userId, children, searchTerm = '', sortParams = [] }) => {
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
    >
      {(books) => children(books)}
    </InfiniteQuery>
  );
};

export default BookInfiniteQueryWrapper;
