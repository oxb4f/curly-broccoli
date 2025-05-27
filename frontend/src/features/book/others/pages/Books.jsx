import BookOthersCatalog from '../components/Catalog';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';
import { quickSearchPublicBooks } from '@book/shared/services/api/book';
import SearchPanel from '@shared/components/ui/SearchPanel';
import BookOthersList from '../components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';

const OthersBooksPage = () => {
  const sortCategories = [
    {
      name: 'orderDirection',
      label: 'Direction',
      value: 'desc',
      options: [
        { value: 'desc', label: 'Last created' },
        { value: 'asc', label: 'First created' }
      ]
    },
    {
      name: 'orderField',
      label: 'Sort by',
      value: 'createdAt',
      options: [
        { value: 'createdAt', label: 'Creating' },
        { value: 'updatedAt', label: 'Updating' }
      ]
    }
  ];

  return (
    <section className="flex flex-col pt-10 items-center">
      <SearchPanel
        className="max-w-3xl"
        sortCategories={sortCategories}
        searchQueryOptions={{
          queryFn: (value) => quickSearchPublicBooks({ term: value }),
          queryKey: QUERY_KEYS.BOOKS.PUBLIC,
          select: (data) => data.books
        }}
        renderSearchResults={(books) => (
          <BookOthersList
            variant="inline"
            items={books}
            className="px-2 py-6"
            itemsClassName="rounded-2xl hover:bg-pr-main/10"
          />
        )}
        renderSortResults={(searchParams) => (
          <BookInfiniteQueryWrapper
            searchTerm={searchParams.searchTerm}
            sortParams={searchParams.sort}
          >
            {(books) => <BookOthersCatalog items={books} className="size-full" />}
          </BookInfiniteQueryWrapper>
        )}
      />
    </section>
  );
};

export default OthersBooksPage;
