import { createContext, useContext, useEffect, useState } from 'react';
import {
  getUserFromStorage,
  setUserToStorage,
  removeUserFromStorage
} from '@shared/services/storage/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@user/shared/services/api/user';
import QUERY_KEYS from '@app/query/constants/queryKeys';

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
        user,
        isPending,
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
