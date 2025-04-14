import StaticStatsItem from './Item';

const StaticStats = ({ items, className = '' }) => {
  return (
    <ul className={className}>
      {items.map((item) => (
        <StaticStatsItem key={item.name} {...item} />
      ))}
    </ul>
  );
};

export default StaticStats;
