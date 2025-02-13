import * as userApi from '../services/api/user';
import { useNavigate } from 'react-router';
import ROUTES from '../constants/routes';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';

const useUserService = () => {
  let navigate = useNavigate();
  const { storeUserSession, updateUserSession, clearUserSession } = useSession();

  const authenticateUser = async (apiMethod, userData) => {
    const response = await apiMethod(userData);
    storeUserSession(response);
    navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const signIn = async (userData) => {
    await authenticateUser(userApi.signInUser, userData);
  };

  const signUp = async (userData) => {
    await authenticateUser(userApi.createUser, userData);
  };

  const changeInfo = async (userData) => {
    const response = await userApi.changeUserInfo(userData);
    console.log(response);

    updateUserSession(response);
    navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const changePhoto = async (userData) => {
    const imageUrl = await userApi.uploadPhoto(userData);
    console.log(imageUrl);
    await changeInfo(imageUrl);
    navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const logOut = () => {
    clearUserSession();
    navigate(ROUTES.AUTH.ROOT, { replace: true });
  };

  return { signIn, signUp, logOut, changeInfo, changePhoto };
};

export default useUserService;
