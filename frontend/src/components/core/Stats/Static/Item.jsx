import { useState, useEffect } from 'react';

const StaticStatsItem = ({ name, renderIcon, initialCount, className = '' }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <li className={className}>
      {Number.isFinite(initialCount) && (
        <p className="font-bold text-center break-words">{count}</p>
      )}
      <p className={`text-center break-words`}>{renderIcon ? renderIcon() : name}</p>
    </li>
  );
};

export default StaticStatsItem;
