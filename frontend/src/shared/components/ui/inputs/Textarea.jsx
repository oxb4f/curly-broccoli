import FloatingLabel from '../FloatingLabel';

const Textarea = ({ label, className = '', labelClassName = '', ...props }) => {
  return (
    <FloatingLabel
      className="group"
      label={label}
      labelClassName={`
          group-[&:has(:focus)]:text-pr-main
          group-[&:has(:not(:focus):placeholder-shown)]:top-0
          group-[&:has(:not(:focus):placeholder-shown)]:translate-y-2
          group-[&:has(:not(:focus):placeholder-shown)]:text-[110%]
          group-[&:has(:not(:focus):placeholder-shown)]:text-pr-text-darker
          group-[&:has(:not(:focus):placeholder-shown)]:bg-transparent ${labelClassName}`}
    >
      <textarea
        className={`disabled:opacity-50 disabled:cursor-default ${className}`}
        placeholder={label}
        {...props}
      ></textarea>
    </FloatingLabel>
  );
};

export default Textarea;
