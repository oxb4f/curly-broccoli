import { formatKey } from '@shared/utils';
import Skeleton from '@shared/components/ui/Skeleton';

const BookOtherInfo = ({ isLoading, otherInfo = {}, className = '' }) => {
  return isLoading ? (
    <Skeleton type="text" height={'10rem'} style={{ margin: '2rem 0' }} />
  ) : (
    <dl className={`py-8 flex flex-col gap-2 text-base ${className}`}>
      {Object.entries(otherInfo).map(([key, value]) => (
        <div key={key}>
          <dt>{formatKey(key)}:</dt> <dd className="text-sm">{value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default BookOtherInfo;
