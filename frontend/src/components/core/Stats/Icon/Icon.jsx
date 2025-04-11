import { useState, useEffect } from 'react';

const StatsItem = ({
  name,
  icon: Icon,
  isStatic,
  initialCount,
  initialIsActive,
  onClick,
  className = ''
}) => {
  return (
    <Icon
      className={`block transition-all size-full ${isActive ? 'text-pr-main fill-pr-main' : ''}`}
    />
  );
};

export default StatsItem;
