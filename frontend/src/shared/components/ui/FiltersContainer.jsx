import { mergeCn } from '@shared/utils';
import Filter from './Filter';
import { useEffect, useRef } from 'react';

const FiltersContainer = ({ filters, values, isOpen, onChange, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current?.dataset?.initial && isOpen) {
      ref.current.dataset.initial = false;
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{ '--animation-duration': 600, '--gap': '1rem' }}
      className={mergeCn(
        `layout-base w-full min-h-0 py-(--gap) border-y-1 border-pr-border grid grid-rows-[1fr_0fr] transition-[border-color,padding] duration-[150ms,calc(var(--animation-duration)*0.3ms)] delay-[0ms,calc(var(--animation-duration)*0.4ms)] will-change-[padding,grid-template-rows]
				${
          isOpen
            ? 'animate-filters-container [animation-duration:calc(var(--animation-duration)*1ms)]'
            : 'animate-filters-container-reverse [animation-duration:calc(var(--animation-duration)*1.5ms)]'
        } 
				is-initial:animation-paused is-initial:[animation-delay:calc(var(--animation-duration)*-1ms)] 
				not-is-open:not-has-checked:border-transparent not-is-open:not-has-checked:py-0`,
        className
      )}
      data-on-top={false}
      data-open={isOpen}
      data-initial={true}
    >
      <div className="layout-content min-h-0 overflow-hidden">
        <h1 className="text-2xl">Choose</h1>
        <div
          style={{ '--columns': 5 }}
          className="columns-1 pt-6 px-[calc(var(--gap)*1.5)] gap-(--gap) opacity-0 transition-opacity delay-[calc(var(--animation-duration)*0.5ms)] duration-[calc(var(--animation-duration)*1ms)]
					md:columns-[calc(var(--columns)/2)]
					xl:columns-(--columns) 
					is-open:opacity-100
					"
        >
          {filters.map((filter) => (
            <Filter
              key={filter.name}
              filter={filter}
              value={values[filter.name]}
              onChange={onChange}
              className="max-h-80 break-inside-avoid mb-[calc(var(--gap)*2)]"
            />
          ))}
        </div>
      </div>
      <div
        className="min-h-0 layout-content flex flex-wrap gap-(--gap) opacity-100 transition-opacity delay-[calc(var(--animation-duration)*1ms)] duration-[calc(var(--animation-duration)*1ms)] overflow-hidden
				is-open:opacity-0"
      >
        {filters.map((filter) => (
          <Filter
            key={filter.name}
            variant="inline-choosen"
            filter={filter}
            value={values[filter.name]}
            onChange={onChange}
            className=""
          />
        ))}
      </div>
    </div>
  );
};

export default FiltersContainer;
