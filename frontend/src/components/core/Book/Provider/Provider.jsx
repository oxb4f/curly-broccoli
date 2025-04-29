import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPrivateBook, getPublicBook } from '@/services/api/book';
import QUERY_KEYS from '../../../../constants/queryKeys';
import { useParams } from 'react-router';
import { useSession } from '../../SessionProvider/SessionProvider';

const BookContext = createContext(null);

export const BookProvider = ({ queryKey, children }) => {
  const { bookId: id } = useParams();

  const isPublic = queryKey === QUERY_KEYS.BOOKS.PUBLIC;
  console.log([...queryKey, Number(id)]);
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
  console.log(isOwn);

  return (
    <BookContext.Provider value={{ book, isPending, error, isOwn }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
