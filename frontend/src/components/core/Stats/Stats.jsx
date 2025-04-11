import StatsItem from './Item/Item';

const Stats = ({ items, isStatic = true, className = '' }) => {
  return (
    <ul className={className}>
      {items.map((item) => (
        <StatsItem key={item.name} isStatic={isStatic} {...item} />
      ))}
    </ul>
  );
};

export default Stats;
