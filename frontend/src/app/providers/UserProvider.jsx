import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getUser } from '@user/shared/services/api/user';
import ROUTES from '@app/router/constants/routes';

const UserContext = createContext(null);

export const UserProvider = ({ queryKey, children }) => {
  const { userId: id } = useParams();

  // const isPublic = queryKey === QUERY_KEYS.BOOKS.PUBLIC;

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
