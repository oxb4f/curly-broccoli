import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from '@shared/components/ui/Spinner';
import useIntersectionObserver from '@shared/hooks/useIntersectionObserver';

const InfiniteQuery = ({
  callback,
  keys,
  dataTransformer,
  children,
  placeholder = '',
  offset = 15,
  initialOffset = 0,
  options = {},
  className = ''
}) => {
  console.log(keys);

  let { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: keys,
    queryFn: ({ pageParam }) => callback(pageParam),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const cursor = lastPageParam + Number(offset);

      if (lastPage.total < cursor) return;

      return cursor;
    },
    select: (data) => data.pages.flatMap(dataTransformer),
    initialPageParam: initialOffset,
    gcTime: 0,
    ...options
  });

  const lastElementRef = useIntersectionObserver({ deps: [hasNextPage], onEnter: fetchNextPage });

  return (
    <div
      className={`size-full grid grid-rows-[1fr_auto] ${
        isLoading ? 'grid-rows-[0fr_1fr]' : ''
      } ${className}`}
    >
      {data && !data?.length && !isLoading ? (
        <div className="size-full flex justify-center items-center description text-center">
          {placeholder}
        </div>
      ) : !data ? null : typeof children === 'function' ? (
        children(data)
      ) : (
        children
      )}
      <div
        ref={lastElementRef}
        className={`w-full h-auto flex justify-center items-center bg-transparent ${
          isFetchingNextPage ? 'py-4' : ''
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
