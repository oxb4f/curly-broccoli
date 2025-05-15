import FloatingLabel from '../FloatingLabel';

const Input = ({ label, className = '', labelClassName = '', ...props }) => {
  return (
    <FloatingLabel
      className="group"
      label={label}
      labelClassName={`
          group-[&:has(:focus)]:text-pr-main
          group-[&:has(:not(:focus):placeholder-shown)]:top-1/2
          group-[&:has(:not(:focus):placeholder-shown)]:-translate-y-1/2
          group-[&:has(:not(:focus):placeholder-shown)]:text-[110%]
          group-[&:has(:not(:focus):placeholder-shown)]:text-pr-text-darker
          group-[&:has(:not(:focus):placeholder-shown)]:bg-transparent ${labelClassName}`}
    >
      <input
        className={`
      disabled:opacity-50 disabled:cursor-default
       
      ${className}`}
        placeholder={label}
        {...props}
      />
    </FloatingLabel>
  );
};

export default Input;
