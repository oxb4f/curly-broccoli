const FormPlaceholder = ({
  value,
  children,
  className = 'bg-pr-bg-main peer-focus:text-pr-main'
}) => {
  return (
    <label className="relative size-full">
      {children}
      <span
        className={`absolute -top-2.5 left-2 px-1 transition-all text-[0.8em] text-pr-main-soft select-none
          peer-not-focus:peer-placeholder-shown:translate-y-4.5 peer-not-focus:peer-placeholder-shown:text-base peer-not-focus:peer-placeholder-shown:text-pr-text-darker peer-not-focus:peer-placeholder-shown:cursor-text
      		${className}`}
      >
        {value}
      </span>
    </label>
  );
};

export default FormPlaceholder;
