import BookInfo from '../../../components/core/Book/Info/Info';
import BookPhoto from '../../../components/core/Book/Photo/Photo';
import BookStats from '../../../components/stats/Book/Book';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useBookService from '../../../hooks/useBookService';
import Navigation from '../../../components/core/Navigation/Navigation';
import ROUTES from '../../../constants/routes';
import BookRating from '../../../components/core/Book/Rating/Rating';
import QUERY_KEYS from '../../../constants/queryKeys';

const BookPage = () => {
  const { context, bookId } = useParams();
  const isPublic = context === 'public';
  const { get, remove, add } = useBookService();
  const { data: book, isPending } = useQuery({
    queryKey: [...(isPublic ? QUERY_KEYS.BOOKS.PUBLIC : QUERY_KEYS.BOOKS.PRIVATE), bookId],
    queryFn: () => get(bookId, isPublic)
  });

  console.dir(book);
  console.log(book?.stats?.rating);

  const navigationItems = {
    private: [
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
      },
      {
        name: 'Remove',
        linkProps: {
          onClick: () => remove(bookId),
          children: 'Remove',
          className:
            'text-pr-important block size-full px-4 py-2 rounded-xs bg-pr-bg-secondary text-center transition-all hover:bg-pr-bg-tertiary'
        }
      }
    ],
    public: [
      {
        name: 'Add book',
        linkProps: {
          onClick: () => add(bookId),
          children: 'Add book'
        }
      }
    ]
  };

  const navigation = {
    items: navigationItems[context],
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
        {!isPublic && (
          <div className={'flex justify-between'}>
            <BookStats
              bookId={bookId}
              stats={book?.stats}
              className="flex flex-row-reverse gap-3"
            />
            <BookRating id={bookId} initialRating={book?.stats?.rating} isLoading={isPending} />
          </div>
        )}

        <Navigation list={navigation} />
        {/* <BookEditLink /> */}
        {/* <BookActions /> */}
        {/* <Comments /> */}
      </div>
    </section>
  );
};

export default BookPage;
