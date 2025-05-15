import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from '@shared/components/ui/Spinner';
import useIntersectionObserver from '@shared/hooks/useIntersectionObserver';

const InfiniteQuery = ({
  callback,
  keys,
  dataTransformer,
  children,
  offset = 15,
  initialOffset = 0,
  parameters = [],
  options = {}
}) => {
  console.log(parameters);

  let { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [...keys, ...parameters],
    queryFn: ({ pageParam }) => callback(pageParam),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const cursor = lastPageParam + Number(offset);

      if (lastPage.total <= cursor) return;

      return cursor;
    },
    select: (data) => data.pages.flatMap(dataTransformer),
    initialPageParam: initialOffset,
    gcTime: 0,
    ...options
  });

  const lastElementRef = useIntersectionObserver(fetchNextPage, [hasNextPage]);

  return (
    <div className={`relative flex-col size-full ${isLoading ? 'size-full' : ''}`}>
      {!data ? null : typeof children === 'function' ? children(data) : children}
      <div
        ref={lastElementRef}
        className={`w-full h-auto flex justify-center items-center bg-transparent ${
          isLoading ? 'absolute inset-0' : isFetchingNextPage ? 'py-4' : ''
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
