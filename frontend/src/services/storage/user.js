import { getFromStorage, setToStorage, removeFromStorage } from './storage';

const USER_KEY = 'user';

export const getUserFromStorage = () => getFromStorage(USER_KEY);
export const setUserToStorage = (data) => setToStorage({ name: USER_KEY, value: data });
export const removeUserFromStorage = () => removeFromStorage(USER_KEY);
