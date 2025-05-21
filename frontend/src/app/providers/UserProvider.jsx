import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getUser } from '@user/shared/services/api/user';
import ROUTES from '@app/router/constants/routes';
import { getUserFollowersCount } from '@features/follows/services/api/follows';
import QUERY_KEYS from '@app/query/constants/queryKeys';

const UserContext = createContext(null);

export const UserProvider = ({ queryKey, children }) => {
  const { userId: id } = useParams();

  const {
    data: user,
    isPending,
    error
  } = useQuery({
    queryKey: [...queryKey, Number(id)],
    queryFn: () => getUser(id),
    enabled: Boolean(id)
  });

  const { data: followsCount, isFollowsCountPending } = useQuery({
    queryKey: [...queryKey, Number(id), ...QUERY_KEYS.FOLLOWS.COUNT],
    queryFn: () => getUserFollowersCount(id),
    enabled: !isPending && Boolean(user),
    refetchOnWindowFocus: false
  });

  const navigate = useNavigate();

  if (!user && !isPending) navigate(ROUTES.MAIN.PROFILE);

  return (
    <UserContext.Provider
      value={{
        user: { ...user, stats: { ...followsCount } },
        isPending: isPending || isFollowsCountPending,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
