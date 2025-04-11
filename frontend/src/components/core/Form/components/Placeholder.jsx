const FormPlaceholder = ({
  value,
  children,
  className = 'bg-pr-bg-main peer-focus:text-pr-main'
}) => {
  return (
    <label className="relative size-full">
      {children}
      <span
        className={`absolute -top-3 left-2 px-1 transition-all text-[0.8em] text-pr-main-soft select-none
          peer-placeholder-shown:peer-[:not(:focus)]:translate-y-5 peer-placeholder-shown:peer-[:not(:focus)]:text-base peer-placeholder-shown:peer-[:not(:focus)]:text-pr-text-darker peer-placeholder-shown:peer-[:not(:focus)]:cursor-text
      		${className}`}
      >
        {value}
      </span>
    </label>
  );
};

export default FormPlaceholder;
