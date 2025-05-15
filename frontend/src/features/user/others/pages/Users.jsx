import InfiniteQuery from '@app/query/components/InfiniteQuery';
import UserList from '../components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers } from '@user/shared/services/api/user';
import SearchPanel from '@shared/components/ui/SearchPanel';

const OtherUsersPage = () => {
  const transformData = (data) => data.users;

  return (
    <section className="size-full flex flex-col items-center py-4 gap-4">
      <SearchPanel
        sortCategories={[
          {
            name: 'orderDirection',
            value: 'desc',
            label: 'Direction',
            options: [
              { value: 'desc', label: 'Last created' },
              { value: 'asc', label: 'First created' }
            ]
          }
        ]}
        className="max-w-xl"
      >
        {(sortParams) => (
          <InfiniteQuery
            callback={(offset) => getUsers({ offset, limit: 15, ...sortParams })}
            keys={QUERY_KEYS.USERS.OTHERS}
            dataTransformer={transformData}
            offset={15}
            parameters={[...Object.values(sortParams)]}
          >
            {(users) => <UserList users={users} />}
          </InfiniteQuery>
        )}
      </SearchPanel>
    </section>
  );
};

export default OtherUsersPage;
