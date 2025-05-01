import BookInfo from '../components/Info';
import BookImage from '../components/Image';
import BookStats from '../components/Stats';
import useBookService from '../hooks/useBookService';
import Navigation from '@shared/components/navigation/Navigation';
import ROUTES from '@app/router/constants/routes';
import BookRating from '../components/Rating';
import { useBook } from '@app/providers/BookProvider';

const BookPage = () => {
  const { book, isPending, isOwn } = useBook();
  const { remove, add } = useBookService();

  console.dir(book);
  console.log(isOwn);

  const navigationItems = {
    own: [
      {
        name: 'Start reading',
        linkProps: {
          to: ROUTES.MAIN.BOOK.PRIVATE.READ,
          children: 'Start reading'
        }
      },
      {
        name: 'Edit',
        linkProps: {
          to: ROUTES.MAIN.BOOK.PRIVATE.EDIT,
          children: 'Edit book'
        }
      },
      {
        name: 'Remove',
        linkProps: {
          onClick: () => remove(book.id, { navigateTo: ROUTES.MAIN.PROFILE }),
          children: 'Remove',
          className:
            'text-pr-important block size-full px-4 py-2 rounded-xs bg-pr-bg-secondary text-center transition-all hover:bg-pr-bg-tertiary'
        }
      }
    ],
    others: [
      {
        name: 'Add',
        linkProps: {
          onClick: () => add(book.id),
          children: book?.isPrivateAdded ? 'Added' : 'Add book',
          className: `block size-full px-4 py-2 rounded-xs bg-pr-bg-secondary text-center transition-all ${
            book?.isPrivateAdded ? 'opacity-50 cursor-default' : 'hover:bg-pr-bg-tertiary'
          }`,
          disabled: book?.isPrivateAdded
        }
      }
    ]
  };

  const navigation = {
    items: navigationItems[isOwn ? 'own' : 'others'],
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
      <BookImage
        imageUrl={book?.imageUrl}
        className="grow-0 w-full h-[90vh] lg:max-w-2xl lg:h-screen"
      />
      <div
        className="w-full min-w-96 max-w-full flex flex-col-reverse gap-7 text-2xl
        lg:max-w-lg lg:flex-col lg:py-4"
      >
        <BookInfo data={book?.info} />
        {isOwn && (
          <div className={'flex justify-between'}>
            <BookStats
              bookId={book?.id}
              stats={book?.stats}
              className="flex flex-row-reverse gap-3"
              isOwn
            />
            <BookRating id={book?.id} initialRating={book?.stats?.rating} isLoading={isPending} />
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
