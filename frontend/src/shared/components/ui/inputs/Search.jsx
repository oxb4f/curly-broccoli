import InfiniteQuery from '@app/query/components/InfiniteQuery';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { getUsers } from '@user/shared/services/api/user';
import UserInlineList from '@user/others/components/InlineList';
import { mergeCn } from '@shared/utils';
import { useEffect, useRef, useState } from 'react';
import FloatingLabel from '../FloatingLabel';

const SearchInput = ({
  label,
  className = '',
  labelClassName = '',
  containerClassName = '',
  dropdownClassName = '',
  dropdownItemsClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const transformData = (data) => data.users;

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
    <FloatingLabel
      innerRef={ref}
      label={label}
      className={mergeCn(`relative z-10`, containerClassName)}
      labelClassName={mergeCn(
        `is-open:text-pr-main
        not-is-open:peer-placeholder-shown:top-1/2 not-is-open:peer-placeholder-shown:-translate-y-1/2 not-is-open:peer-placeholder-shown:text-[110%] not-is-open:peer-placeholder-shown:text-pr-text-darker not-is-open:peer-placeholder-shown:bg-transparent`,
        labelClassName
      )}
      data-open={isOpen}
    >
      <input
        type="search"
        className={mergeCn(`peer is-open:rounded-t-xl is-open:rounded-b-none`, className)}
        autoComplete="off"
        onFocus={() => setIsOpen(true)}
        placeholder={label}
        {...props}
      />
      <div
        className={mergeCn(
          `absolute w-full max-h-80 rounded-b-xl overflow-y-auto scale-0 opacity-0 is-open:scale-100 is-open:opacity-100 is-open:-z-10`,
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
              itemsClassName={mergeCn('rounded-2xl', dropdownItemsClassName)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </InfiniteQuery>
      </div>
    </FloatingLabel>
  );
};

export default SearchInput;
