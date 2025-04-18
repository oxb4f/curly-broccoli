import { createContext, useContext, useEffect, useState } from 'react';
import {
  getUserFromStorage,
  setUserToStorage,
  removeUserFromStorage
} from '@/services/storage/user';
import { clearEmptyFields } from '../../../utils/dataTransformers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../services/api/user';
import QUERY_KEYS from '../../../constants/queryKeys';

const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  const [hasStoredUser, setHasStoredUser] = useState(Boolean(getUserFromStorage()));
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: QUERY_KEYS.USERS.ALL,
    queryFn: () => getUser(getUserFromStorage()?.id),
    select: (userData) => clearEmptyFields(userData),
    enabled: hasStoredUser,
    refetchOnWindowFocus: false
  });

  console.log(user);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const storeUserSession = (userData) => {
    setUserToStorage(userData);
    setHasStoredUser(true);
    refetch();
  };

  const updateUserSession = (userData) => {
    queryClient.setQueryData(QUERY_KEYS.USERS.ALL, { ...user, ...userData });
  };

  const clearUserSession = () => {
    removeUserFromStorage();
    queryClient.removeQueries({ queryKey: QUERY_KEYS.USERS.ALL });

    setHasStoredUser(false);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        hasStoredUser,
        isPending,
        error,
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
