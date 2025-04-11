const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`disabled:opacity-50 disabled:cursor-default ${className}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
