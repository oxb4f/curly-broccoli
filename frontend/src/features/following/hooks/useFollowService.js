import { useQueryClient } from '@tanstack/react-query';
import * as followersApi from '../services/api/followers';
import useNavigatedMutation from '@app/query/hooks/useNavigatedMutation';
import QUERY_KEYS from '@app/query/constants/queryKeys';

const useFollowService = (user) => {
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

export default useFollowService;
