import InfiniteQuery from '@app/query/components/InfiniteQuery';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers } from '@user/shared/services/api/user';
import UserInlineList from '@user/others/components/InlineList';
import { mergeCn } from '@shared/utils';

const FiltersButton = ({
  className = '',
  containerClassName = '',
  dropdownClassName = '',
  ...props
}) => {
  const transformData = (data) => data.users;

  return (
    <div className={mergeCn(`relative transition-all`, containerClassName)}>
      <input
        type="search"
        className={mergeCn(`peer relative z-30`, className)}
        autoComplete="off"
        {...props}
      />
      <div
        className={mergeCn(
          `absolute w-full max-h-80 scale-y-0 opacity-0 transition-all overflow-y-auto 
			peer-focus:scale-100 peer-focus:opacity-100  peer-focus:z-20 
			active:scale-100 active:opacity-100 active:z-20`,
          dropdownClassName
        )}
      >
        <InfiniteQuery
          callback={getUsers}
          keys={QUERY_KEYS.USERS.OTHERS}
          dataTransformer={transformData}
        >
          {(users) => <UserInlineList users={users.splice(0, 4)} className="px-2 py-6" />}
        </InfiniteQuery>
      </div>
    </div>
  );
};

export default FiltersButton;
