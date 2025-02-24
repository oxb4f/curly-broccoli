import './Stats.css';

const Stats = ({ list, className = '' }) => {
  return (
    <ul className={`stats ${className}`}>
      {list.map((item) => (
        <li key={item.name} className={`stats__item ${item.isActive ? 'stats__item__active' : ''}`}>
          {Number.isFinite(item.count) && <p className="stats__counter">{item.count}</p>}
          {item.icon ? (
            <item.icon className="stats__icon" />
          ) : (
            <p className="stats__name">{item.name}</p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Stats;
