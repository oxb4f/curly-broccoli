import BookEvent from './Book';
import FollowEvent from './Follow';

const EventList = ({ items, className = '' }) => {
  console.log(items);

  return (
    <ul className={className}>
      {items.map(({ eventDetails, fromUser, addedBook, followedUser }) => (
        <li key={eventDetails.id} className="w-full sm:w-lg md:w-xl">
          {eventDetails.type === 'book' ? (
            <BookEvent
              details={eventDetails}
              user={fromUser}
              book={addedBook}
              className="h-[60vh] sm:h-96"
            />
          ) : eventDetails.type === 'user' ? (
            <FollowEvent user={fromUser} followedUser={followedUser} className="h-12" />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
