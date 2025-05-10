import { useState } from 'react';
import BookOthersCatalog from '../components/Catalog';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';
import SearchPanel from '@shared/components/ui/SearchPanel';

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
    <section className="size-full flex flex-col items-center">
      <SearchPanel sortCategories={sortCategories} className="max-w-3xl">
        {(sortParams) => (
          <BookInfiniteQueryWrapper sortParams={sortParams}>
            {(books) => <BookOthersCatalog items={books} />}
          </BookInfiniteQueryWrapper>
        )}
      </SearchPanel>
    </section>
  );
};

export default OthersBooksPage;
