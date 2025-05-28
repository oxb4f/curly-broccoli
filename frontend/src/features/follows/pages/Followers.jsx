import InfiniteQuery from '@app/query/components/InfiniteQuery';
import UserList from '@user/others/components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUserFollowers } from '@features/follows/services/api/follows';
import { useParams } from 'react-router';

const FollowersPage = () => {
  const { userId } = useParams();
  const transformData = (data) => data.followers;

  return (
    <main className="main content-rows-[auto_1fr]">
      <h1 className="py-5 px-3 text-pr-text text-5xl md:text-4xl">Followers</h1>
      <InfiniteQuery
        callback={(offset) => getUserFollowers(userId, { offset, limit: 10 })}
        keys={[...QUERY_KEYS.FOLLOWS.FOLLOWERS, userId]}
        dataTransformer={transformData}
        offset={10}
      >
        {(users) => <UserList users={users} />}
      </InfiniteQuery>
    </main>
  );
};

export default FollowersPage;
