const StaticStatsItem = ({ name, count, className = '', children }) => {
  return (
    <li className={className} title={name}>
      {Number.isFinite(count) && <p className="font-bold text-center break-words">{count}</p>}
      <p className={`text-center break-words`}>{children}</p>
    </li>
  );
};

export default StaticStatsItem;
