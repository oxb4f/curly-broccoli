const ChangeableStatsItem = ({ name, count, isActive, onClick, className = '', children }) => {
  const handleChange = async () => {
    const newCount = isActive ? count - 1 : count + 1;
    await onClick({ count: newCount, isActive: !isActive });
  };

  return (
    <label
      title={name}
      className={`relative cursor-pointer 
				focus-within:outline-1 focus-within:outline-pr-text 
				${className}`}
    >
      {Number.isFinite(count) && <p className="font-bold text-center break-words">{count}</p>}
      <input
        type="checkbox"
        name="stats"
        value={name}
        className="screen-reader-only cursor-pointer z-10"
        checked={isActive}
        onChange={handleChange}
      />
      <span className="screen-reader-only">{name}</span>
      {typeof children === 'function' ? children(isActive) : children}
    </label>
  );
};

export default ChangeableStatsItem;
