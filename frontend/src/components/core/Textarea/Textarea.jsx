const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`text-pr-text bg-pr-bg-main placeholder:text-pr-text-darker ${className}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
