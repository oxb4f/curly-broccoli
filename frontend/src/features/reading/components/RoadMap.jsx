import InfiniteQuery from '@app/query/components/InfiniteQuery';
import { getTrackers } from '@reading/services/api/readingTrackers';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import BookReadingRecordsList from './RecordsList';

const BookReadingRoadMap = ({ bookId, className = '' }) => {
  const transformData = (data) => data.trackers;

  return (
    <section
      className={`rounded-md border-1 border-pr-border overflow-hidden scrollbar-track-rounded ${className}`}
    >
      <div className="size-full p-3 overflow-y-auto">
        <h1 className="text-2xl">Road map</h1>
        <InfiniteQuery
          callback={(offset) => {
            console.log(offset);

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
        >
          {(trackersList) => <BookReadingRecordsList list={trackersList} />}
        </InfiniteQuery>
      </div>
    </section>
  );
};

export default BookReadingRoadMap;
