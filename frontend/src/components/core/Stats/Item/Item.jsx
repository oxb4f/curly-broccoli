import { useState } from 'react';

const StatsItem = ({ item, isStatic }) => {
  const [count, setCount] = useState(item.count);

  const handleClick = () => {
    if (!isStatic && Number.isFinite(count)) {
      const newCount = count + 1;
      setCount(newCount);
      // if (onCountChange) {
      //   onCountChange(item.name, newCount);
      // }
    }
  };

  const renderContent = () => {
    if (item.icon) {
      return <item.icon className={`block transition-all ${item.className || ''}`} />;
    }
    return <p className={`text-center break-words ${item.className || ''}`}>{item.name}</p>;
  };

  return (
    <li className="flex flex-col items-center">
      {Number.isFinite(item.count) && (
        <p className="font-bold text-center break-words">{isStatic ? item.count : count}</p>
      )}
      {isStatic ? (
        <span>{renderContent()}</span>
      ) : (
        <button onClick={handleClick}>{renderContent()}</button>
      )}
    </li>
  );
};

export default StatsItem;
