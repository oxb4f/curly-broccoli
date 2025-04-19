import BookInfo from '../../../components/core/Book/Info/Info';
import BookPhoto from '../../../components/core/Book/Photo/Photo';
import BookStats from '../../../components/stats/Book/Book';
import { useParams } from 'react-router';
import Navigation from '../../../components/core/Navigation/Navigation';
import ROUTES from '../../../constants/routes';
import BookRating from '../../../components/core/Book/Rating/Rating';
import BookCatalog from '../../../components/core/Book/Catalog/Catalog';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import Spinner from '../../../components/core/Spinner/Spinner';
import InfiniteQuery from '../../../components/core/InfiniteQuery/InfiniteQuery';
import { getPublicBooks } from '../../../services/api/book';

const SearchPage = () => {
  const transformData = (data) => data.books;

  return (
    <section className="flex-col size-full">
      <InfiniteQuery
        callback={(offset) => getPublicBooks({ offset })}
        keys={['books', 'public']}
        dataTransformer={transformData}
      >
        {(data) => <BookCatalog items={data} />}
      </InfiniteQuery>
    </section>
  );
};

export default SearchPage;
