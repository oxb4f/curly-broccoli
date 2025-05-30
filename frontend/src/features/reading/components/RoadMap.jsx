import InfiniteQuery from '@app/query/components/InfiniteQuery';
import { getTrackers } from '@reading/services/api/readingTrackers';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import BookReadingRecordsList from './RecordsList';

const BookReadingRoadMap = ({ bookId, className = '' }) => {
  const transformData = (data) => data.trackers;

  return (
    <section
      className={`grid grid-rows-[auto_1fr] overflow-y-auto scrollbar-color-pr-main/[transparent] ${className}`}
    >
      <h1 className="mb-4 text-2xl font-bold">Road map</h1>

      <InfiniteQuery
        callback={(offset) => {
          return getTrackers(bookId, {
            offset,
            limit: 5,
            state: 'finished'
          });
        }}
        keys={[...QUERY_KEYS.READING_TRACKERS.FINISHED, bookId]}
        dataTransformer={transformData}
        offset={5}
        options={{ enabled: Boolean(bookId) }}
        placeholder="Start reading to see progress"
      >
        {(trackersList) => <BookReadingRecordsList list={trackersList} />}
      </InfiniteQuery>
    </section>
  );
};

export default BookReadingRoadMap;
