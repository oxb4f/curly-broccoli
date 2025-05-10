import { mergeCn } from '@shared/utils';

const FormPlaceholder = ({
  value,
  children,
  className = 'bg-pr-bg-main peer-focus:text-pr-main'
}) => {
  return (
    <label className="group relative size-full">
      {children}
      <span
        className={mergeCn(
          `absolute top-0 left-0 translate-x-2 -translate-y-3 px-1 rounded-md text-sm text-pr-main-soft transition-all select-none  pointer-events-none

          group-[&:has(:focus)]:text-pr-main

          group-[&:has(:not(:focus):placeholder-shown)]:translate-y-2
          group-[&:has(:not(:focus):placeholder-shown)]:text-[110%]
          group-[&:has(:not(:focus):placeholder-shown)]:text-pr-text-darker
          group-[&:has(:not(:focus):placeholder-shown)]:bg-transparent`,
          className
        )}
      >
        {value}
      </span>
    </label>
  );
};

export default FormPlaceholder;
