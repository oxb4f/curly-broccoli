import BookInfo from '../../../components/core/Book/Info/Info';
import BookPhoto from '../../../components/core/Book/Photo/Photo';
import BookStats from '../../../components/stats/Book/Book';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useBookService from '../../../hooks/useBookService';
import Navigation from '../../../components/core/Navigation/Navigation';
import ROUTES from '../../../constants/routes';
import Rating from '../../../components/core/Rating/Rating';

const BookPage = () => {
  const { context, bookId } = useParams();
  const isPublic = context === 'public';
  const { get } = useBookService();
  const {
    data: book,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => get(bookId, isPublic)
  });

  console.dir(book);

  const navigation = {
    items: [
      {
        name: 'Start reading',
        linkProps: {
          to: `${ROUTES.MAIN.BOOK.READ}/${bookId}`,
          children: 'Start reading'
        }
      },
      {
        name: 'Edit',
        linkProps: {
          to: `${ROUTES.MAIN.BOOK.EDIT}/${bookId}`,
          children: 'Edit book'
        }
      }
    ],
    props: {
      className: 'flex gap-1 rounded-lg text-base overflow-hidden'
    },
    itemsClasses: 'flex-1',
    linksClasses:
      'block size-full px-4 py-2 rounded-xs bg-pr-bg-secondary text-center transition-all hover:bg-pr-bg-tertiary'
  };

  return (
    <section
      className="flex flex-col gap-x-5 gap-y-2 justify-center 
      lg:flex-row"
    >
      <BookPhoto
        imageUrl={book?.imageUrl}
        className="grow-0 w-full h-[90vh] lg:max-w-2xl lg:h-screen"
      />
      <div
        className="w-full min-w-96 max-w-full flex flex-col-reverse gap-7 text-2xl
        lg:max-w-lg lg:flex-col lg:py-4"
      >
        <BookInfo data={book?.info} />
        <BookStats
          bookId={bookId}
          stats={book?.stats}
          className="flex flex-row-reverse gap-3 justify-end"
        />
        <Rating />
        <Navigation list={navigation} />
        {/* <BookEditLink /> */}
        {/* <BookActions /> */}
        {/* <Comments /> */}
      </div>
    </section>
  );
};

export default BookPage;
