import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { mergeCn } from '@shared/utils';
import { useEffect, useRef, useState } from 'react';
import FloatingLabel from '../FloatingLabel';
import Spinner from '../Spinner';
import useDebounce from '@shared/hooks/useDebounce';

const SearchInput = ({
  label,
  children,
  queryOptions = {},
  className = '',
  labelClassName = '',
  containerClassName = '',
  dropdownClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const debouncedSearchValue = useDebounce(props.value, 300);
  const isQueryEnabled = debouncedSearchValue.length > 3;

  const handleDropdownInteraction = (event) => {
    event.stopPropagation();
  };

  const { data, isPending, isFetching } = useQuery({
    ...queryOptions,
    queryFn: () => queryOptions.queryFn?.(debouncedSearchValue),
    queryKey: [...QUERY_KEYS.SEARCH.ALL, ...queryOptions.queryKey, debouncedSearchValue],
    gcTime: 5 * 60 * 1000,
    enabled: isQueryEnabled,
    retry: 0
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          `absolute w-full min-h-48 flex justify-center items-center rounded-b-xl overflow-clip scale-0 opacity-0 is-open:scale-100 is-open:opacity-100 is-open:-z-10`,
          dropdownClassName
        )}
        onClick={handleDropdownInteraction}
      >
        {props.value?.length < 4 ? (
          <span className="description">Type at least 4 letters</span>
        ) : !isPending && data?.length === 0 ? (
          <span className="description">Didn`t find anything</span>
        ) : isFetching ? (
          <Spinner className="size-1/2" />
        ) : typeof children === 'function' ? (
          children(data)
        ) : (
          children
        )}
      </div>
    </FloatingLabel>
  );
};

export default SearchInput;
