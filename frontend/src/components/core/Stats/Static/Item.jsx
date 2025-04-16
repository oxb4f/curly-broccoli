import { useState, useEffect } from 'react';

const StaticStatsItem = ({ name, initialCount, className = '', children }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <li className={className} title={name}>
      {Number.isFinite(initialCount) && (
        <p className="font-bold text-center break-words">{count}</p>
      )}
      <p className={`text-center break-words`}>{children}</p>
    </li>
  );
};

export default StaticStatsItem;
