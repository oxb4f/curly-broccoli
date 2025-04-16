import BookInfo from '../../../components/core/Book/Info/Info';
import BookPhoto from '../../../components/core/Book/Photo/Photo';
import BookStats from '../../../components/stats/Book/Book';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useBookService from '../../../hooks/useBookService';
import Navigation from '../../../components/core/Navigation/Navigation';
import ROUTES from '../../../constants/routes';
import BookRating from '../../../components/core/Book/Rating/Rating';
import BookCatalog from '../../../components/core/Book/Catalog/Catalog';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import Spinner from '../../../components/core/Spinner/Spinner';
import InfiniteQuery from '../../../components/core/InfiniteQuery/InfiniteQuery';

const SearchPage = () => {
  const { getAll } = useBookService();

  const transformData = (data) => data.books;

  return (
    <section className="flex-col">
      <InfiniteQuery
        callback={(offset) => getAll(true, { offset })}
        keys={['books', 'public']}
        dataTransformer={transformData}
      >
        {(data) => <BookCatalog items={data} />}
      </InfiniteQuery>
    </section>
  );
};

export default SearchPage;
