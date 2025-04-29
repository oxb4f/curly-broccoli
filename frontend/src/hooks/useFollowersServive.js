import { useQueryClient } from '@tanstack/react-query';
import * as followersApi from '../services/api/followers';
import useNavigatedMutation from './useNavigatedMutation';
import QUERY_KEYS from '../constants/queryKeys';

const useFollowersService = (user) => {
  const queryClient = useQueryClient();

  const { mutateAsync: follow } = useNavigatedMutation({
    mutationFn: () => followersApi.followUser(user.id),
    onSuccess: (data) => {
      queryClient.setQueryData([...QUERY_KEYS.USERS.OTHERS, user.id], (oldFollowers) => ({
        ...oldFollowers,
        ...data
      }));
    }
  });

  const { mutateAsync: unfollow } = useNavigatedMutation({
    mutationFn: () => followersApi.unfollowUser(user.followersId),
    onSuccess: (data) => {
      queryClient.setQueryData([...QUERY_KEYS.USERS.OTHERS, user.id], (oldFollowers) => ({
        ...oldFollowers,
        ...data
      }));
    }
  });

  return {
    follow,
    unfollow
  };
};

export default useFollowersService;
