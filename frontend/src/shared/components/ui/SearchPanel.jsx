import Form from '@shared/components/form/Form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Select from '@shared/components/ui/inputs/Select';
import React, { useMemo, useState } from 'react';
import { mergeCn } from '@shared/utils';

const SearchPanel = ({ sortCategories, children, className = '' }) => {
  const initialValue = useMemo(() => {
    return sortCategories.reduce((acc, category) => {
      acc[category.name] = category.value;
      return acc;
    }, {});
  }, [sortCategories]);

  const [sortValue, setSortValue] = useState(initialValue);

  const searchFields = useMemo(
    () => ({
      submit: {
        type: 'submit',
        children: <MagnifyingGlassIcon className="size-7" />,
        className: `absolute top-1 left-3 size-min p-1.5 ascpect-square rounded-full bg-transparent text-pr-main z-50
        hover:bg-pr-main-soft/10!`
      },
      search: {
        type: 'search',
        disableHint: true,
        placeholder: 'Search',
        placeholderClassName: 'left-14 top-1 -translate-y-4 z-50',
        className: `h-12 pl-16 pr-4 bg-pr-bg-main/5 backdrop-blur-xl rounded-4xl transition-all 
        is-open:rounded-t-xl is-open:rounded-b-none is-open:bg-pr-bg-main/5`,
        dropdownClassName: 'rounded-b-xl bg-pr-main/5 backdrop-blur-2xl origin-top-left',
        itemsClassName: 'rounded-2xl hover:bg-pr-main/10'
      }
    }),
    []
  );
  console.log(sortValue);

  const sortProps = useMemo(
    () => ({
      className:
        'h-full pl-5 rounded-3xl border-1 border-pr-main-mute text-pr-main-soft is-open:rounded-t-xl is-open:rounded-b-none is-open:border-pr-main is-open:text-pr-main ',
      containerClassName: `hidden size-full transition-all
		lg:block lg:w-full`,
      optionsClassName: 'rounded-2xl hover:bg-pr-main/10',
      dropdownClassName:
        'px-1 py-2 bg-pr-main/5 backdrop-blur-xl rounded-b-lg scale-0 opacity-0 is-open:scale-100 is-open:opacity-100',
      iconClassName: 'text-pr-main-soft is-open:text-pr-main',
      onChange: (event) =>
        setSortValue((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }),
    []
  );

  const inlineSortProps = useMemo(
    () => ({
      ...sortProps,
      className: 'h-full px-2 rounded-3xl  bg-pr-main/30',
      containerClassName: `h-full rounded-3xl transition-all 
		lg:hidden`,
      optionsClassName: 'rounded-3xl text-pr-text hover:font-bold'
    }),
    [sortProps]
  );

  return (
    <>
      <div
        className={mergeCn('relative max-w-2xl w-full h-min flex flex-col lg:flex-row', className)}
      >
        <Form
          fields={searchFields}
          className="peer w-full transition-transform z-30 
          lg:w-6/10 lg:[transition:width_0.3s,translate_0.3s_0.3s] lg:will-change-[width]
				  has-is-open:w-full has-is-open:translate-y-full"
          allFieldsRequired
        />
        <div
          className="w-full flex gap-4 transition-all duration-300
          lg:absolute lg:right-0 lg:w-4/10 lg:h-full lg:pl-4
          lg:peer-has-is-open:translate-x-full lg:peer-has-is-open:opacity-0 lg:peer-has-is-open:pointer-events-none"
        >
          {sortCategories.map((sortCategory) => (
            <React.Fragment key={sortCategory.name}>
              <Select
                key={`${sortCategory.name}-desktop`}
                name={sortCategory.name}
                value={sortValue[sortCategory.name]}
                options={sortCategory.options}
                {...sortProps}
              />
              <Select
                key={`${sortCategory.name}-inline`}
                name={sortCategory.name}
                value={sortValue[sortCategory.name]}
                options={sortCategory.options}
                variant="inline"
                {...inlineSortProps}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      {typeof children === 'function' ? children(sortValue) : children}
    </>
  );
};

export default SearchPanel;
