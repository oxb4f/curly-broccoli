import InfiniteQuery from '@app/query/components/InfiniteQuery';
import UserList from '../components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers } from '@user/shared/services/api/user';

const OtherUsersPage = () => {
  const transformData = (data) => data.users;

  return (
    <section className="flex-col size-full">
      <InfiniteQuery
        callback={getUsers}
        keys={QUERY_KEYS.USERS.OTHERS}
        dataTransformer={transformData}
      >
        {(users) => <UserList users={users} />}
      </InfiniteQuery>
    </section>
  );
};

export default OtherUsersPage;
