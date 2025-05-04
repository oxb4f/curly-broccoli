import { createContext, useContext, useEffect, useState } from 'react';
import {
  getUserFromStorage,
  setUserToStorage,
  removeUserFromStorage
} from '@shared/services/storage/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@user/shared/services/api/user';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUserFollowersCount } from '@following/services/api/followers';

const SessionContext = createContext(null);

export default function SessionProvider({ queryKey, children }) {
  const [credentials, setCredentials] = useState(getUserFromStorage());
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    error
  } = useQuery({
    queryKey,
    queryFn: () => getUser(credentials?.id),
    enabled: Boolean(credentials),
    refetchOnWindowFocus: false
  });

  const { data: followingStats, isFollowingStatsPending } = useQuery({
    queryKey: [...queryKey, 'followingStats'],
    queryFn: () => getUserFollowersCount(credentials?.id),
    enabled: !isPending && Boolean(user),
    refetchOnWindowFocus: false
  });

  console.log(followingStats);

  console.log(user);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const storeUserSession = (userCredentials) => {
    setUserToStorage(userCredentials);
    setCredentials(userCredentials);
    queryClient.invalidateQueries(QUERY_KEYS.USERS.OWN);
  };

  const updateUserSession = (userData) => {
    queryClient.setQueryData(QUERY_KEYS.USERS.OWN, (oldUserData) => ({
      ...oldUserData,
      ...userData
    }));
  };

  const clearUserSession = () => {
    removeUserFromStorage();
    setCredentials(null);
    queryClient.removeQueries(QUERY_KEYS.USERS.OWN);
  };

  return (
    <SessionContext.Provider
      value={{
        user: { ...user, stats: { ...followingStats } },
        isPending: isPending || isFollowingStatsPending,
        error,
        hasCredentials: Boolean(credentials),
        storeUserSession,
        updateUserSession,
        clearUserSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
