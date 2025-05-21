import Form from '@shared/components/form/Form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Select from '@shared/components/ui/inputs/Select';
import React, { useMemo, useState } from 'react';
import { mergeCn } from '@shared/utils';

const SearchPanel = ({
  sortCategories,
  searchQueryOptions,
  renderSearchResults,
  renderSortResults,
  className = ''
}) => {
  const initialSortValue = useMemo(() => {
    return sortCategories.reduce((acc, category) => {
      acc[category.name] = category.value;
      return acc;
    }, {});
  }, [sortCategories]);

  const [searchParameters, setSearchParameters] = useState({
    searchTerm: '',
    sort: initialSortValue
  });

  const handleSearch = (values) => {
    console.log(values);

    setSearchParameters((prev) => ({
      ...prev,
      searchTerm: values.search
    }));
  };

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
        label: 'Search',
        queryOptions: searchQueryOptions,
        children: renderSearchResults,
        labelClassName: 'left-14 z-50',
        className: `h-12 pl-16 pr-4 bg-pr-bg-main/5 backdrop-blur-xl rounded-4xl transition-all 
        is-open:bg-pr-bg-main/5`,
        dropdownClassName: 'bg-pr-main/5 backdrop-blur-2xl transition-transform origin-top-left'
      }
    }),
    []
  );
  console.log(searchParameters);

  const sortProps = useMemo(
    () => ({
      className: `h-full pl-5 rounded-3xl border-1 border-pr-main-mute text-pr-main-soft 
        is-open:border-pr-main is-open:text-pr-main`,
      labelClassName: 'left-2 bg-pr-bg-main',
      containerClassName: `hidden size-full transition-all
		  lg:block lg:w-full`,
      optionsClassName: 'rounded-2xl hover:bg-pr-main/10',
      dropdownClassName: 'px-1 py-2 bg-pr-main/5 backdrop-blur-xl rounded-b-lg',
      iconClassName: 'text-pr-main-soft is-open:text-pr-main',
      onChange: (event) =>
        setSearchParameters((prev) => ({
          ...prev,
          sort: { ...prev.sort, [event.target.name]: event.target.value }
        }))
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
          onSubmit={handleSearch}
          className="peer w-full transition-transform z-30 
          lg:w-6/10 lg:[transition:width_0.3s,translate_0.3s_0.3s]
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
                label={sortCategory.label}
                value={searchParameters.sort[sortCategory.name]}
                options={sortCategory.options}
                {...sortProps}
              />
              <Select
                key={`${sortCategory.name}-inline`}
                name={sortCategory.name}
                value={searchParameters.sort[sortCategory.name]}
                options={sortCategory.options}
                variant="inline"
                {...inlineSortProps}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      {renderSortResults(searchParameters)}
    </>
  );
};

export default SearchPanel;
