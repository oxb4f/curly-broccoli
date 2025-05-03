import BookEvent from './Book';
import FollowEvent from './Follow';

const EventList = ({ items }) => {
  console.log(items);

  return (
    <ul className="flex flex-col justify-center items-center gap-3">
      {items.map(({ eventDetails, fromUser, addedBook, followedUser }) => (
        <li key={eventDetails.id} className="w-full sm:w-xl">
          {eventDetails.type === 'book' ? (
            <BookEvent
              details={eventDetails}
              user={fromUser}
              book={addedBook}
              className="h-[60vh]"
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
