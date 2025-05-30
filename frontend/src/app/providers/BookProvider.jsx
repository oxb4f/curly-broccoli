import { createContext, useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getPrivateBook, getPublicBook } from '@book/shared/services/api/book';
import { useSession } from './SessionProvider';

const BookContext = createContext(null);

export const BookProvider = ({ queryKey, isPublic, children }) => {
  const { bookId: id } = useParams();
  const { user: sessionUser, isPending: isSessionUserPending } = useSession();

  const {
    data: book,
    isPending: isBookPending,
    error
  } = useQuery({
    queryKey: [...queryKey, Number(id)],
    queryFn: () => (isPublic ? getPublicBook(id) : getPrivateBook(id)),
    enabled: Boolean(id)
  });

  const isPending = isBookPending || isSessionUserPending;
  const isOwn = !isPending && book.userId === sessionUser?.id;

  return (
    <BookContext.Provider value={{ book, isPending, error, isOwn }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext) ?? {};
