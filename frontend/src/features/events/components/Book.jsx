import UserPlate from '@user/others/components/Plate';
import BookImage from '@book/shared/components/Image';
import { formatDate } from '@shared/utils';
import DropDown from '@shared/components/ui/DropDown';
import NavigationLink from '@shared/components/navigation/Link';
import ROUTES from '@app/router/constants/routes';
import BookTitle from '@book/shared/components/Title';
import BookDescription from '@book/shared/components/Description';
import EventActionLabel from './ActionLabel';

const BookEvent = ({ details, user, book, className = '' }) => {
  return (
    <article
      className={`relative grid grid-rows-[15%_88%] rounded-xl border-pr-border overflow-hidden ${className}`}
    >
      <UserPlate
        user={user}
        className="size-full pt-2 px-6 pb-3 rounded-b-none gap-x-4 bg-pr-bg-main/10 backdrop-blur-xl transition-all hover:backdrop-blur-sm z-10"
        additionalSlot={
          <span className="text-xs description">
            {formatDate(new Date(details?.createdAt), {
              dateStyle: 'relative',
              timeStyle: 'short'
            })}
          </span>
        }
      />
      <NavigationLink
        to={`${ROUTES.MAIN.BOOK.PRIVATE.ROOT}/${book.id}`}
        title={`Open book ${book.title}`}
        className="size-full transition-transform -translate-y-3 hover:scale-105"
      >
        <BookImage
          imageUrl={book?.imageUrl}
          className="h-full pb-4 sm:justify-start sm:py-0 "
          foregroundImageClasses="sm:pl-4 sm:h-full sm:max-w-xs"
          parallax
        />
      </NavigationLink>

      <section className="hidden absolute right-8 top-1/2 min-h-1/4 max-h-2/3 w-52 pt-2 pb-4 rounded-xl bg-pr-bg-main/50 backdrop-blur-xl -translate-y-1/3 overflow-hidden sm:block">
        <BookTitle title={book?.title} as="h2" className="text-xl text-center truncate" />
        <BookDescription
          description={book?.description || 'Description has not added yet'}
          as="p"
          className="px-3 text-sm line-clamp-[9] break-words"
        />
      </section>
      <DropDown
        openingDirection="top"
        className="absolute bottom-0 pb-2 bg-pr-bg-main/50 backdrop-blur-xl z-10 sm:hidden"
        arrowSize="6"
        visibleSlot={
          <BookTitle title={book?.title} as="h2" className="text-base text-center truncate" />
        }
      >
        <BookDescription
          description={book?.description || 'Description has not added yet'}
          as="p"
          className="min-h-0 px-3 line-clamp-3 break-words"
        />
      </DropDown>
      <EventActionLabel action={details.action} className="absolute top-5 right-8 z-10" />
    </article>
  );
};

export default BookEvent;
