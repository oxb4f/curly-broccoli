import UserOverview from '@user/shared/components/Overview';
import { useSession } from '@app/providers/SessionProvider';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';
import BookOwnCatalog from '@book/own/components/Catalog';
import BookOwnCatalogControls from '@book/own/components/CatalogControls';
import FiltersContainer from '@shared/components/ui/FiltersContainer';
import { useState } from 'react';
import useIntersectionObserver from '@shared/hooks/useIntersectionObserver';

const OwnProfilePage = () => {
  const { user, isPending } = useSession();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const filters = [
    {
      name: 'genre',
      legend: 'Genre:',
      options: [
        {
          value: 'horror',
          label: 'Horror'
        },
        {
          value: 'fiction',
          label: 'Fiction'
        }
      ]
    },
    {
      name: 'author',
      legend: 'Author:',
      options: [
        {
          value: 'William Shakespeare',
          label: 'William Shakespeareeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        },
        {
          value: 'Agatha Christie',
          label: 'Agatha Christie'
        },
        {
          value: 'Barbara Cartland',
          label: 'Barbara Cartland'
        },
        {
          value: 'Danielle Steel',
          label: 'Danielle Steel'
        },
        {
          value: 'Harold Robbins',
          label: 'Harold Robbins'
        },
        {
          value: 'Georges Simenon',
          label: 'Georges Simenon'
        },
        {
          value: 'J. K. Rowling',
          label: 'J. K. Rowling'
        },
        {
          value: 'Eiichiro Oda',
          label: 'Eiichiro Oda'
        },
        {
          value: 'Enid Blyton',
          label: 'Enid Blyton'
        }
      ]
    }
  ];

  const handleChange = (event) =>
    setFilterValues((prev) => {
      const currentValue = event.target.value;
      const currentArray = prev[event.target.name] ?? [];
      const updatedArray = [...currentArray];

      if (currentArray.includes(currentValue)) {
        return {
          ...prev,
          [event.target.name]: currentArray.filter((item) => item !== currentValue)
        };
      } else {
        updatedArray.push(currentValue);
        return {
          ...prev,
          [event.target.name]: updatedArray
        };
      }
    });

  const headerRef = useIntersectionObserver({
    onLeave: () => {
      setIsFiltersOpen(false);
    },
    rootMargin: '370px 0px 0px 0px'
  });

  const handleFiltersOpen = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  return (
    <main className="main content-rows-[auto_auto_auto_1fr]">
      <header ref={headerRef} className="flex justify-center">
        <UserOverview user={user} isLoading={isPending} className="flex flex-col gap-2" isOwn />
      </header>

      <BookOwnCatalogControls openFilters={handleFiltersOpen} />
      <FiltersContainer
        className="layout-full-width sticky top-0 z-10 bg-pr-bg-main/80"
        filters={filters}
        values={filterValues}
        onChange={handleChange}
        isOpen={isFiltersOpen}
      />

      <BookInfiniteQueryWrapper userId={user?.id} isUserLoading={isPending}>
        {(books) => <BookOwnCatalog items={books} className="py-4" />}
      </BookInfiniteQueryWrapper>
    </main>
  );
};

export default OwnProfilePage;
