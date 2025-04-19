import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPrivateBook, getPublicBook } from '@/services/api/book';
import QUERY_KEYS from '@/constants/queryKeys';
import { Outlet, useParams } from 'react-router';

const BookContext = createContext(null);

export const BookProviderPage = () => {
  const { context, bookId: id } = useParams();

  const isPublic = context === 'public';
  const queryKey = [...(isPublic ? QUERY_KEYS.BOOKS.PUBLIC : QUERY_KEYS.BOOKS.PRIVATE), id];

  const {
    data: book,
    isPending,
    error
  } = useQuery({
    queryKey,
    queryFn: () => (isPublic ? getPublicBook(id) : getPrivateBook(id)),
    enabled: Boolean(id)
  });

  return (
    <BookContext.Provider value={{ book, isPending, error, isPublic }}>
      <Outlet />
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
