import BookPhoto from '../../../../components/core/Book/Photo/Photo';
import { useBook } from '../Provider/Provider';
import BookReadingTracker from '../../../../components/core/Book/Reading/Tracker';
import BookReadingRoadMap from '../../../../components/core/Book/Reading/RoadMap';

const BookReadPage = () => {
  const { book } = useBook();

  return (
    <section className="size-full flex flex-col gap-x-5 gap-y-2 justify-around">
      <BookPhoto imageUrl={book?.imageUrl} className="w-full h-[30vh]" />

      <BookReadingTracker bookId={book?.id} />

      <BookReadingRoadMap bookId={book?.id} className="h-72" />
    </section>
  );
};

export default BookReadPage;
