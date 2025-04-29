import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPrivateBook, getPublicBook } from '@/services/api/book';
import QUERY_KEYS from '@/constants/queryKeys';
import { useNavigate, useParams } from 'react-router';
import { getUser } from '../../../../services/api/user';
import ROUTES from '../../../../constants/routes';

const UserContext = createContext(null);

export const UserProvider = ({ queryKey, children }) => {
  const { userId: id } = useParams();

  // const isPublic = queryKey === QUERY_KEYS.BOOKS.PUBLIC;
  console.log([...queryKey, Number(id)]);

  const {
    data: user,
    isPending,
    error
  } = useQuery({
    queryKey: [...queryKey, Number(id)],
    queryFn: () => getUser(id),
    enabled: Boolean(id)
  });

  const navigate = useNavigate();

  if (!user && !isPending) navigate(ROUTES.MAIN.PROFILE);

  return <UserContext.Provider value={{ user, isPending, error }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
