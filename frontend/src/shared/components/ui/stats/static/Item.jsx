const StaticStatsItem = ({ name, count, className = '', children }) => {
  return (
    <div className={className} title={name}>
      <dt className={`text-center break-words`}>{children}</dt>
      {Number.isFinite(count) && <dd className="font-bold text-center break-words">{count}</dd>}
    </div>
  );
};

export default StaticStatsItem;
