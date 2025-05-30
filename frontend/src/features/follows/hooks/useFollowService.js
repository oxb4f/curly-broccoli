import { useQueryClient } from '@tanstack/react-query';
import * as followsApi from '../services/api/follows';
import useNavigatedMutation from '@app/query/hooks/useNavigatedMutation';
import QUERY_KEYS from '@app/query/constants/queryKeys';

const useFollowService = (user) => {
  const queryClient = useQueryClient();

  const { mutateAsync: follow, isPending: isFollowPending } = useNavigatedMutation({
    mutationFn: () => followsApi.followUser(user.id),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.USERS.OWN, ({ stats, ...rest }) => ({
        ...rest,
        stats: {
          ...stats,
          followingCount: stats.followingCount + 1
        }
      }));

      queryClient.setQueryData([...QUERY_KEYS.USERS.OTHERS, user.id], ({ stats, ...rest }) => ({
        ...rest,
        ...data,
        stats: {
          ...stats,
          followersCount: stats.followersCount + 1
        }
      }));
    }
  });

  const { mutateAsync: unfollow, isPending: isUnfollowPending } = useNavigatedMutation({
    mutationFn: () => followsApi.unfollowUser(user.followersId),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.USERS.OWN, ({ stats, ...rest }) => ({
        ...rest,
        stats: {
          ...stats,
          followingCount: stats.followingCount - 1
        }
      }));

      queryClient.setQueryData([...QUERY_KEYS.USERS.OTHERS, user.id], ({ stats, ...rest }) => ({
        ...rest,
        ...data,
        stats: {
          ...stats,
          followersCount: stats.followersCount - 1
        }
      }));
    }
  });

  return {
    follow,
    unfollow,
    isFollowPending,
    isUnfollowPending
  };
};

export default useFollowService;
