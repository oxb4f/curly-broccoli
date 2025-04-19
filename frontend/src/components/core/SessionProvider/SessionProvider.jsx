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
  const [credentials, setCredentials] = useState(getUserFromStorage());
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    error
  } = useQuery({
    queryKey: QUERY_KEYS.USERS.ALL,
    queryFn: () => getUser(credentials?.id),
    select: (userData) => clearEmptyFields(userData),
    enabled: Boolean(credentials),
    refetchOnWindowFocus: false
  });

  console.log(user);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const storeUserSession = (userCredentials) => {
    setUserToStorage(userCredentials);
    setCredentials(userCredentials);
    queryClient.invalidateQueries(QUERY_KEYS.USERS.ALL);
  };

  const updateUserSession = (userData) => {
    queryClient.setQueryData(QUERY_KEYS.USERS.ALL, (oldUserData) => ({
      ...oldUserData,
      ...userData
    }));
  };

  const clearUserSession = () => {
    removeUserFromStorage();
    setCredentials(null);
    queryClient.removeQueries({ queryKey: QUERY_KEYS.USERS.ALL });
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
