import InfiniteQuery from '../../../components/core/InfiniteQuery/InfiniteQuery';
import UserList from '../../../components/core/User/List/List';
import QUERY_KEYS from '../../../constants/queryKeys';
import { getUsers } from '../../../services/api/user';

const UsersPage = () => {
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

export default UsersPage;
