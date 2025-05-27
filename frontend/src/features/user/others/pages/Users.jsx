import InfiniteQuery from '@app/query/components/InfiniteQuery';
import UserList from '../components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers, quickSearchUsers } from '@user/shared/services/api/user';
import SearchPanel from '@shared/components/ui/SearchPanel';
import UserInlineList from '../components/InlineList';

const OtherUsersPage = () => {
  const transformData = (data) => data.users;

  return (
    <section className="h-full flex flex-col items-center py-4 gap-4">
      <SearchPanel
        className="max-w-xl"
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
        searchQueryOptions={{
          queryFn: (value) => quickSearchUsers({ term: value }),
          queryKey: QUERY_KEYS.USERS.OTHERS,
          select: transformData
        }}
        renderSearchResults={(users) => (
          <UserInlineList
            users={users}
            className="px-2 py-6"
            itemsClassName="rounded-2xl hover:bg-pr-main/10"
          />
        )}
        renderSortResults={(sortParams) => (
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
      />
    </section>
  );
};

export default OtherUsersPage;
