import { getEvents } from '../services/api/events';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import InfiniteQuery from '@app/query/components/InfiniteQuery';
import EventList from '../components/List';

const EventsPage = () => {
  const transformData = (data) => data.events;

  return (
    <main className="main">
      <InfiniteQuery
        callback={(offset) => {
          return getEvents({ offset, limit: 5 });
        }}
        keys={QUERY_KEYS.EVENTS.ALL}
        dataTransformer={transformData}
        offset={5}
        placeholder="No activity from followers yet"
      >
        {(events) => (
          <EventList items={events} className="size-full flex flex-col items-center gap-y-4" />
        )}
      </InfiniteQuery>
    </main>
  );
};

export default EventsPage;
