import UserInlineCard from '@user/others/components/InlineCard';
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
      className={`relative grid grid-rows-[4rem_84%] rounded-xl border-pr-border overflow-hidden sm:grid-rows-[4rem_88%] ${className}`}
    >
      <UserInlineCard
        user={user}
        className="size-full pt-2 px-6 pb-3 rounded-b-none gap-x-4 bg-pr-bg-main/10 backdrop-blur-xl  transition-all z-10 hover:backdrop-blur-sm"
        additionalSlot={
          <span className="description text-xs sm:text-sm">
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
        className="-mt-4 size-full transition-transform hover:scale-105"
      >
        <BookImage
          imageUrl={book?.imageUrl}
          className="h-full sm:justify-start sm:py-0 "
          foregroundImageClasses="sm:h-full sm:pl-4 sm:max-w-2xs md:max-w-xs"
          parallax
        />
      </NavigationLink>

      <section
        className="hidden absolute right-4 top-1/2 min-h-1/4 max-h-2/3 pt-2 pb-4 rounded-xl bg-pr-bg-main/50 backdrop-blur-xl -translate-y-1/3 overflow-hidden 
			sm:block sm:w-48 md:w-52"
      >
        <BookTitle title={book?.title} as="h2" className="text-lg text-center truncate" />
        <BookDescription
          description={book?.description || 'Description has not added yet'}
          as="p"
          className="px-3 text-sm line-clamp-[9] break-words"
        />
      </section>
      <DropDown
        openingDirection="top"
        className="absolute bottom-0 pb-2 rounded-b-[inherit] bg-pr-bg-main/50 backdrop-blur-xl z-10 sm:hidden"
        arrowSize="5"
        visibleSlot={<BookTitle title={book?.title} as="h2" className="text-center truncate" />}
      >
        <BookDescription
          description={book?.description || 'Description has not added yet'}
          as="p"
          className="min-h-0 px-3 line-clamp-3 text-sm break-words"
        />
      </DropDown>
      <EventActionLabel
        action={details.action}
        className="absolute top-6 right-4 text-base z-10 sm:right-8"
      />
    </article>
  );
};

export default BookEvent;
