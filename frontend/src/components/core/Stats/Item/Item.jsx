import { useState, useEffect } from 'react';

const StatsItem = ({
  name,
  isStatic,
  renderIcon,
  initialCount,
  initialIsActive,
  onClick,
  className = ''
}) => {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(initialIsActive);

  useEffect(() => {
    setCount(initialCount);
    setIsActive(initialIsActive);
  }, [initialCount, initialIsActive]);

  const handleClick = async () => {
    const newCount = isActive ? count - 1 : count + 1;
    await onClick({ count: newCount, isActive: !isActive });
    setCount(newCount);
    setIsActive(!isActive);
  };

  const renderContent = () => {
    return <p className={`text-center break-words`}>{renderIcon ? renderIcon(isActive) : name}</p>;
  };

  return (
    <li className={className}>
      {Number.isFinite(initialCount) && (
        <p className="font-bold text-center break-words">{count}</p>
      )}
      {isStatic ? (
        renderContent()
      ) : (
        <button onClick={handleClick} className="size-full">
          {renderContent()}
        </button>
      )}
    </li>
  );
};

export default StatsItem;
