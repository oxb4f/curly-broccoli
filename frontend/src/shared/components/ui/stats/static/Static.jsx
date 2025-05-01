import StaticStatsItem from './Item';

const StaticStats = ({ items, className = '' }) => {
  return (
    <dl className={className}>
      {items.map((item) => (
        <StaticStatsItem key={item.name} {...item} />
      ))}
    </dl>
  );
};

export default StaticStats;
