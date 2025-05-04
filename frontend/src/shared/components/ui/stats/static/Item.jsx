import Skeleton from '../../Skeleton';

const StaticStatsItem = ({ count, isLoading, children, title = '', className = '' }) => {
  return (
    <div className={className} title={title}>
      <dt className={`text-center break-words`}>
        {isLoading ? <Skeleton type="text" /> : children}
      </dt>
      {(Number.isFinite(count) || isLoading) && (
        <dd className="font-bold text-center break-words">
          {isLoading ? <Skeleton type="text" width="1rem" /> : count}
        </dd>
      )}
    </div>
  );
};

export default StaticStatsItem;
