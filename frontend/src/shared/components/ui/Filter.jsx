import { mergeCn } from '@shared/utils';
import { XCircleIcon } from '@heroicons/react/24/outline';

const Filter = ({ filter, onChange, value = [], variant = 'default', className = '' }) => {
  console.log(value);

  return variant === 'default' ? (
    <fieldset
      className={mergeCn(
        `group transition-shadow [--project-inset-ring-color:var(--project-main-color-mute)] inset-ring-l-1 size-full flex flex-col py-4 gap-y-5 overflow-y-auto scrollbar-color-pr-main-mute/[transparent] has-checked:scrollbar-color-pr-main/[transparent]
					has-checked:[--project-inset-ring-color:var(--project-main-color)]`,
        className
      )}
    >
      <legend
        className="-translate-y-1/2 -translate-x-2 text-pr-main-mute transition-colors
				group-has-checked:text-pr-main"
      >
        {filter.legend}
      </legend>

      {filter.options?.map((option) => (
        <label
          key={option.value}
          className="relative size-fit px-4 text-base/tight select-none transition-colors cursor-pointer break-all
						has-checked:text-pr-main
        "
        >
          <input
            type="checkbox"
            name={filter.name}
            value={option.value}
            onChange={onChange}
            className="appearance-none peer"
            checked={value.includes(option.value)}
          />
          <span className="animate-filter-text-fade [animation-timeline:view()] [animation-range:cover]">
            {option.label}
          </span>
          <div
            className="absolute -left-3 top-0.5 size-4 border-1 border-pr-main bg-pr-bg-main -translate-x-1/2 rotate-45 transition-transform
              peer-checked:translate-0 peer-checked:animate-filter-check-fade peer-checked:[animation-timeline:view()] peer-checked:[animation-range:cover]"
          ></div>
        </label>
      ))}
    </fieldset>
  ) : variant === 'inline-choosen' ? (
    value?.map((item) => {
      return (
        <span
          key={item}
          className={`relative align-middle inline-block max-w-52 size-fit pl-4 pr-8 py-2 rounded-lg bg-pr-main text-pr-bg-main text-base/tight truncate ${className}`}
        >
          {filter.options.find((option) => option.value === item).label}
          <label className="absolute right-1.5 size-5 cursor-pointer">
            <XCircleIcon className="size-full" />

            <input
              type="checkbox"
              name={filter.name}
              value={item}
              onChange={onChange}
              className="appearance-none"
              checked
            />
          </label>
        </span>
      );
    })
  ) : null;
};

export default Filter;
