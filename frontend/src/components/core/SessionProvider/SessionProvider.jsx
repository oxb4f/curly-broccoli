import { createContext, useContext, useEffect, useState } from 'react';
import {
  getUserFromStorage,
  setUserToStorage,
  removeUserFromStorage
} from '@/services/storage/user';
import { clearEmptyFields } from '../../../utils/dataTransformers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../services/api/user';

const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  // const [user, setUser] = useState(getUserFromStorage());
  const [hasStoredUser, setHasStoredUser] = useState(Boolean(getUserFromStorage()));

  const queryClient = useQueryClient();
  const {
    data: user,
    isPending,
    error
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    select: (userData) => clearEmptyFields(userData),
    enabled: hasStoredUser,
    refetchOnWindowFocus: false
  });

  console.log(user);

  useEffect(() => {
    if (user) {
      // const clearedUser = clearEmptyFields(user);
      console.log(user);
      // clearEmptyFields(user);
      // setUserToStorage(clearedUser);
      // queryClient.setQueryData(['user'], clearedUser);
    }
  }, [user]);

  const storeUserSession = (userData) => {
    setUserToStorage(userData);
    setHasStoredUser(true);
  };

  const updateUserSession = (userData) => {
    queryClient.setQueryData(['user'], { ...user, ...userData });
    console.log(queryClient.getQueryData());
  };

  const clearUserSession = () => {
    removeUserFromStorage();
    queryClient.removeQueries({ queryKey: ['user'] });
    setHasStoredUser(false);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
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
