import BookImage from '@book/shared/components/Image';
import { useBook } from '@app/providers/BookProvider';
import BookReadingTracker from '@reading/components/Tracker';
import BookReadingRoadMap from '@reading/components/RoadMap';

const BookReadPage = () => {
  const { book } = useBook();

  return (
    <section className="flex flex-col gap-x-5 gap-y-2 justify-around">
      <BookImage imageUrl={book?.imageUrl} className="w-full h-[30vh]" />

      <BookReadingTracker bookId={book?.id} />

      <BookReadingRoadMap bookId={book?.id} className="h-72" />
    </section>
  );
};

export default BookReadPage;
