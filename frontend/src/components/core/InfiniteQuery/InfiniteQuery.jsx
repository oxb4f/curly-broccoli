import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const InfiniteQuery = ({ callback, keys, dataTransformer, children, step = 20 }) => {
  let { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: keys,
    queryFn: ({ pageParam }) => callback(pageParam),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const cursor = lastPageParam + Number(step);

      if (lastPage.total <= cursor) return;

      return cursor;
    },
    select: (data) => data.pages.flatMap(dataTransformer),
    initialPageParam: 0,
    gcTime: 0
  });

  const lastElementRef = useIntersectionObserver(fetchNextPage, [hasNextPage]);
  console.dir(data);

  return (
    <div className={`relative flex-col ${isLoading ? 'size-full' : ''}`}>
      {typeof children === 'function' ? children(data) : children}
      <div
        ref={lastElementRef}
        className={`size-full p-4 flex justify-center items-center bg-pr-bg-main ${
          isLoading ? 'absolute inset-0' : ''
        }`}
      >
        {(isLoading || isFetchingNextPage) && (
          <Spinner className={isLoading ? 'size-20 border-8' : 'size-4'} />
        )}
      </div>
    </div>
  );
};

export default InfiniteQuery;
