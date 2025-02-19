import { getFromStorage, setToStorage, removeFromStorage } from './storage';

const USER_KEY = 'jwt';

export const getJWTFromStorage = () => getFromStorage(USER_KEY);
export const setJWTToStorage = (data) => setToStorage({ name: USER_KEY, value: data });
export const removeJWTFromStorage = () => removeFromStorage(USER_KEY);
