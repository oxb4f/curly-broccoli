import BookInfo from '../../../components/core/Book/Info/Info';
import BookPhoto from '../../../components/core/Book/Photo/Photo';
import BookStats from '../../../components/stats/Book/Book';

const BookPage = () => {
  // const params = useParams();
  return (
    <section className="flex gap-5 min-w-fit">
      <BookPhoto className="grow-0 h-screen min-w-96 max-w-lg" />
      <div className="grow min-w-96 py-4 text-2xl">
        <BookInfo data={{ other: 'Other info' }} />
        <BookStats className="py-3 flex flex-row-reverse gap-3 justify-end" />
        {/* <Comments /> */}
      </div>
    </section>
  );
};

export default BookPage;
