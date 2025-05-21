import InfiniteQuery from '@app/query/components/InfiniteQuery';
import UserList from '@user/others/components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUserFollowing } from '@features/follows/services/api/follows';
import { useParams } from 'react-router';

const FollowingPage = () => {
  const { userId } = useParams();
  const transformData = (data) => data.following;

  return (
    <section className="size-full">
      <h1 className="py-5 px-3 text-pr-text text-5xl md:text-4xl">Following</h1>
      <InfiniteQuery
        callback={(offset) => getUserFollowing(userId, { offset, limit: 10 })}
        keys={[...QUERY_KEYS.FOLLOWS.FOLLOWING, userId]}
        dataTransformer={transformData}
        offset={10}
      >
        {(users) => <UserList users={users} />}
      </InfiniteQuery>
    </section>
  );
};

export default FollowingPage;
