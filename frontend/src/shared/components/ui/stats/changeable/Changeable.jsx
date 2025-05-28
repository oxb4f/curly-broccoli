import ChangeableStatsItem from './Item';

const ChangeableStats = ({ items, className = '' }) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <ChangeableStatsItem key={item.name} {...item} />
      ))}
    </div>
  );
};

export default ChangeableStats;
