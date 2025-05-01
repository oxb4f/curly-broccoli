const Spinner = ({ className = '' }) => {
  return (
    <div
      className={`size-12 rounded-full border-4 border-b-[transparent] border-pr-main animate-spin ${className}`}
    ></div>
  );
};

export default Spinner;
