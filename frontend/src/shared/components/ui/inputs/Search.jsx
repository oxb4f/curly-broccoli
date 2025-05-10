import InfiniteQuery from '@app/query/components/InfiniteQuery';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers } from '@user/shared/services/api/user';
import UserInlineList from '@user/others/components/InlineList';
import { mergeCn } from '@shared/utils';
import { useEffect, useRef, useState } from 'react';

const SearchInput = ({
  className = '',
  containerClassName = '',
  dropdownClassName = '',
  itemsClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const transformData = (data) => data.users;
  console.log(isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownInteraction = (event) => {
    event.stopPropagation();
  };

  return (
    <div ref={ref} className={mergeCn(`relative`, containerClassName)} data-open={isOpen}>
      <input
        type="search"
        className={mergeCn(`peer`, className)}
        autoComplete="off"
        onFocus={() => setIsOpen(true)}
        {...props}
      />
      <div
        className={mergeCn(
          `absolute w-full max-h-80 overflow-y-auto scale-0 opacity-0 is-open:scale-100 is-open:opacity-100 is-open:-z-10`,
          dropdownClassName
        )}
        onClick={handleDropdownInteraction}
      >
        <InfiniteQuery
          callback={getUsers}
          keys={QUERY_KEYS.USERS.OTHERS}
          dataTransformer={transformData}
        >
          {(users) => (
            <UserInlineList
              users={users.splice(0, 4)}
              className="px-2 py-6"
              itemsClassName={itemsClassName}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </InfiniteQuery>
      </div>
    </div>
  );
};

export default SearchInput;
