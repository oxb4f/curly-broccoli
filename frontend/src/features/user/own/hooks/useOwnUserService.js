import * as userApi from '../../shared/services/api/user';
import { uploadImage } from '@shared/services/api/image';
import { useSession } from '@app/providers/SessionProvider';
import useNavigatedMutation from '@app/query/hooks/useNavigatedMutation';

const useOwnUserService = () => {
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

export default useOwnUserService;
