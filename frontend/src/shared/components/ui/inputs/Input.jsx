const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`
      disabled:opacity-50 disabled:cursor-default 
      ${className}`}
      {...props}
    />
  );
};

export default Input;
