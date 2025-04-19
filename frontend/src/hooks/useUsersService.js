import * as userApi from '../services/api/user';
import { uploadImage } from '../services/api/image';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import useNavigatedMutation from './useNavigatedMutation';

const useUserService = () => {
  const { user, storeUserSession, updateUserSession, clearUserSession } = useSession();

  const { mutateAsync: signIn } = useNavigatedMutation({
    mutationFn: userApi.signInUser,
    onSuccess: storeUserSession
  });

  const { mutateAsync: signUp } = useNavigatedMutation({
    mutationFn: userApi.createUser,
    onSuccess: storeUserSession
  });

  const { mutateAsync: changeInfo } = useNavigatedMutation({
    mutationFn: (inputData) => userApi.changeUserInfo(user.id, inputData),
    onSuccess: updateUserSession
  });

  const { mutateAsync: changePhoto } = useNavigatedMutation({
    mutationFn: uploadImage,
    onSuccess: changeInfo
  });

  const logOut = () => {
    clearUserSession();
  };

  return {
    signIn,
    signUp,
    logOut,
    changeInfo,
    changePhoto
  };
};

export default useUserService;
