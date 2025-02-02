import './Stats.css';

const Stats = ({ list }) => {
  return (
    <ul className="stats">
      {list.map((item) => (
        <li key={item.name} className="stats__item">
          <span className="stats__counter">{item.count}</span>
          <h3 className="stats__name">{item.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default Stats;
