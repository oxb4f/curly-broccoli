import { formatKey } from '@shared/utils';
import Skeleton from '@shared/components/ui/Skeleton';

const BookInfo = ({ data, isShort = false, className = '' }) => {
  const shortClassName = isShort ? 'truncate' : '';

  return (
    <section className={`text-pr-text ${className}`}>
      <h3 className={`text-[1.1em]/[1.6em] font-bold ${shortClassName}`}>
        {data?.title ?? <Skeleton type="text" />}
      </h3>
      <p className={`text-[0.8em]/[1.2em] ${shortClassName}`}>
        {data?.author ?? <Skeleton type="text" />}
      </p>
      {!isShort &&
        (data?.other ? (
          <dl className="py-8 flex flex-col gap-2 text-base">
            {Object.entries(data.other).map(([key, value]) => (
              <div key={key}>
                <dt>{formatKey(key)}:</dt> <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <Skeleton type="text" height={'10rem'} style={{ margin: '2rem 0' }} />
        ))}
    </section>
  );
};

export default BookInfo;
