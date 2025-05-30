import { mergeCn } from '@shared/utils';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import FloatingLabel from '../FloatingLabel';

const MAX_SELECT_COLUMNS_COUNT = 4;

const Select = ({
  variant,
  name,
  icon,
  value,
  onChange,
  options = [],
  label,
  className = '',
  labelClassName = '',
  containerClassName = '',
  optionsClassName = '',
  iconClassName = '',
  dropdownClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const selectRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (selectRef.current) {
      selectRef.current.value = option.value;

      const event = new Event('change', { bubbles: true });
      selectRef.current.dispatchEvent(event);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedIndex = options.findIndex((option) => option.value === value);

  if (variant === 'inline') {
    return (
      <div
        ref={ref}
        className={mergeCn(
          `w-full h-min inline-flex items-center p-2 gap-1 text-sm border-1 border-pr-border`,
          containerClassName
        )}
        data-open={isOpen}
      >
        <select
          ref={selectRef}
          name={name}
          value={value}
          onChange={onChange}
          className="pointer-events-none screen-reader-only -z-50"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div
          style={{
            '--selected-col-index': selectedIndex % MAX_SELECT_COLUMNS_COUNT,
            '--selected-row-index': Math.floor(selectedIndex / MAX_SELECT_COLUMNS_COUNT),
            position: 'relative',
            width: '100%',
            height: 'min-content',
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(
              options.length,
              MAX_SELECT_COLUMNS_COUNT
            )}, 1fr)`,
            gridTemplateRows: `repeat(${Math.ceil(
              options.length / MAX_SELECT_COLUMNS_COUNT
            )}, 1fr)`,
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: selectedIndex < 0 ? 'none' : 'grid',
              gridTemplateColumns: `repeat(${Math.min(
                options.length,
                MAX_SELECT_COLUMNS_COUNT
              )}, 1fr)`,
              gridTemplateRows: `repeat(${Math.ceil(
                options.length / MAX_SELECT_COLUMNS_COUNT
              )}, 1fr)`,
              gap: '0.25rem',
              zIndex: -10,
              pointerEvents: 'none'
            }}
          >
            <span
              className={mergeCn(
                `block translate-x-[calc(var(--selected-col-index)*(100%+0.25rem))] translate-y-[calc(var(--selected-row-index)*(100%+0.25rem))] transition-transform duration-300`,
                className
              )}
            ></span>
          </div>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => handleSelect(option)}
              className={mergeCn(
                'px-2 py-1 rounded-md transition-colors',
                option.disabled ? 'opacity-50 cursor-not-allowed' : '',
                optionsClassName
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <FloatingLabel
      innerRef={ref}
      label={label}
      className={mergeCn(`relative z-10 is-open:rounded-b-none`, containerClassName)}
      labelClassName={mergeCn(
        `is-open:text-pr-main 
        not-is-selected:top-1/2 not-is-selected:-translate-y-1/2 not-is-selected:text-[110%] not-is-selected:text-pr-text-darker not-is-selected:bg-transparent`,
        labelClassName
      )}
      data-open={isOpen}
      data-selected={Boolean(value)}
    >
      <select
        ref={selectRef}
        name={name}
        value={value}
        onChange={onChange}
        className="pointer-events-none screen-reader-only -z-50"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={toggleOpen}
        className={mergeCn(
          'block size-full pr-12 py-2 text-left transition-all truncate is-open:rounded-t-xl z-10 is-open:rounded-b-none',
          className
        )}
      >
        {options[selectedIndex]?.label}
      </button>

      <div
        className={`pointer-events-none absolute inset-y-0 right-3 flex justify-center items-center transition-transform is-open:-rotate-90`}
      >
        {icon || <ChevronLeftIcon className={mergeCn('w-6', iconClassName)} />}
      </div>

      <ul
        className={mergeCn(
          `absolute w-full rounded-b-xl -z-10 transition-all scale-0 opacity-0 is-open:scale-100 is-open:opacity-100`,
          dropdownClassName
        )}
        role="listbox"
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={mergeCn('px-4 py-2 cursor-pointer', optionsClassName, option.className)}
            onClick={() => handleSelect(option)}
            role="option"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </FloatingLabel>
  );
};

export default Select;
