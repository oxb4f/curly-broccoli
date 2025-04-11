import * as userApi from '../services/api/user';
import { uploadImage } from '../services/api/image';
import { useNavigate } from 'react-router';
import ROUTES from '../constants/routes';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';

const useUserService = () => {
  const navigate = useNavigate();
  const { user, storeUserSession, updateUserSession, clearUserSession } = useSession();

  const authenticate = async (apiMethod, inputData) => {
    const response = await apiMethod(inputData);
    storeUserSession(response);
    navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const signIn = async (inputData) => {
    await authenticate(userApi.signInUser, inputData);
  };

  const signUp = async (inputData) => {
    await authenticate(userApi.createUser, inputData);
  };

  const changeInfo = async (inputData) => {
    const response = await userApi.changeUserInfo(user.id, inputData);
    console.log(response);

    updateUserSession(response);
    navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const changePhoto = async (inputData) => {
    const imageUrl = await uploadImage(inputData);
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
