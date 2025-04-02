import StatsItem from './Item/Item';

const Stats = ({ list, isStatic = true, className = '' }) => {
  return (
    <ul className={className}>
      {list.map((item) => (
        <StatsItem key={item.name} item={item} isStatic={isStatic} />
      ))}
    </ul>
  );
};

export default Stats;
