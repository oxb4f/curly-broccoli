import { getEvents } from '../services/api/events';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import InfiniteQuery from '@app/query/components/InfiniteQuery';
import EventList from '../components/List';

const EventsPage = () => {
  const transformData = (data) => data.events;

  return (
    <section className="size-full">
      <InfiniteQuery
        callback={(offset) => {
          console.log(offset);

          return getEvents({ offset, limit: 5 });
        }}
        keys={QUERY_KEYS.EVENTS.ALL}
        dataTransformer={transformData}
        offset={5}
      >
        {(events) => <EventList items={events} />}
      </InfiniteQuery>
    </section>
  );
};

export default EventsPage;
