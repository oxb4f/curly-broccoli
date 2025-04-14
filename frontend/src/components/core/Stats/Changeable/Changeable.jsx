import ChangeableStatsItem from './Item';

const ChangeableStats = ({ items, className = '' }) => {
  return (
    <fieldset className={className}>
      {items.map((item) => (
        <ChangeableStatsItem key={item.name} {...item} />
      ))}
    </fieldset>
  );
};

export default ChangeableStats;
