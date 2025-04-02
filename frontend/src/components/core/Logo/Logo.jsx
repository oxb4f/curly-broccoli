const Logo = ({ text, className = '' }) => {
  return (
    <div className={`text-center font-pr-logo text-3xl text-pr-main cursor-default ${className}`}>
      {text}
    </div>
  );
};

export default Logo;
