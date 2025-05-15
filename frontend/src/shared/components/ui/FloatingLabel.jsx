import { mergeCn } from '@shared/utils';

const FloatingLabel = ({
  label,
  innerRef,
  children,
  className = '',
  labelClassName = 'bg-pr-bg-main peer-focus:text-pr-main',
  ...props
}) => {
  return (
    <label ref={innerRef} className={mergeCn('relative size-full', className)} {...props}>
      {children}
      <span
        className={mergeCn(
          `absolute top-0 left-0 translate-x-2 -translate-y-3 px-1 rounded-md text-sm text-pr-main-soft transition-all select-none  pointer-events-none`,
          labelClassName
        )}
      >
        {label}
      </span>
    </label>
  );
};

export default FloatingLabel;
