import InfiniteQuery from '@app/query/components/InfiniteQuery';
import UserList from '../components/List';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers } from '@user/shared/services/api/user';
import SearchInput from '@shared/components/ui/inputs/Search';
import Form from '@shared/components/form/Form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const OtherUsersPage = () => {
  const transformData = (data) => data.users;

  const fields = {
    search: {
      type: 'search',
      placeholder: 'Search',
      placeholderClassName: 'left-2 z-50',
      className:
        'pl-4 pr-12 bg-pr-bg-main/5 backdrop-blur-xl rounded-4xl transition-all scale: focus:rounded-t-xl focus:rounded-b-none focus:bg-pr-main/5',
      dropdownClassName: 'rounded-b-xl bg-pr-main/5 backdrop-blur-2xl scale-0 origin-top-left'
    },
    submit: {
      type: 'submit',
      children: <MagnifyingGlassIcon />,
      className: 'absolute top-1 right-1.5 size-8 rounded-full z-50'
    }
  };

  return (
    <section className="relative size-full flex flex-col py-4">
      <Form
        fields={fields}
        className="relative transition-all focus-within:z-50 has-[input:focus]:translate-y-10"
      />
      {/* <SearchInput className="w-full z-50 p-2 border-1 border-pr-border transition-all bg-pr-bg-main/10 backdrop-blur-xl focus:rounded-t-xl focus:outline-0" /> */}
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
