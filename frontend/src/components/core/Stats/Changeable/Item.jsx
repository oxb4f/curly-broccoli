import { useState, useEffect } from 'react';

const ChangeableStatsItem = ({
  name,
  initialCount,
  initialIsActive,
  onClick,
  className = '',
  children
}) => {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(initialIsActive);

  const handleChange = async () => {
    const newCount = isActive ? count - 1 : count + 1;
    await onClick({ count: newCount, isActive: !isActive });
    setCount(newCount);
    setIsActive(!isActive);
  };

  useEffect(() => {
    setCount(initialCount);
    setIsActive(initialIsActive);
  }, [initialCount, initialIsActive]);

  return (
    <label
      title={name}
      className={`relative cursor-pointer 
				focus-within:outline-1 focus-within:outline-pr-text 
				${className}`}
    >
      {Number.isFinite(initialCount) && (
        <p className="font-bold text-center break-words">{count}</p>
      )}
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
