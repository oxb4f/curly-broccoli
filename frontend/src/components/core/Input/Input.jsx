const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`placeholder:text-pr-text-darker 
      disabled:opacity-50 disabled:cursor-default 
      ${className}`}
      {...props}
    />
  );
};

export default Input;
