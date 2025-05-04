import { StarIcon } from '@heroicons/react/24/solid';
import BookInfo from '@book/shared/components/Info';
import BookImage from '@book/shared/components/Image';
import BookStats from '@book/shared/components/Stats';
import ROUTES from '@app/router/constants/routes';
import NavigationLink from '@shared/components/navigation/Link';

const BookOwnCard = ({ data, className = '' }) => {
  return (
    <article
      className={`relative grid grid-cols-[minmax(8rem,30%)_minmax(auto,70%)] grid-rows-1 md:grid-cols-1 border-pr-border overflow-hidden ${className}`}
    >
      <NavigationLink
        to={`${ROUTES.MAIN.BOOK.PRIVATE.ROOT}/${data.id}`}
        className="relative peer md:mb-16"
      >
        {data.stats.rating && (
          <div
            className="absolute top-2 right-2 w-12 py-1 grid grid-cols-[0.7rem_auto] justify-center items-center gap-1 rounded-lg bg-pr-bg-main/40 text-lg text-pr-rating z-10 md:text-base"
            title={`Rating: ${data.stats.rating} out of 5`}
          >
            <span className="justify-self-end text-base/4">{data.stats.rating}</span>
            <StarIcon className="size-5" />
          </div>
        )}
        <BookImage
          imageUrl={data.imageUrl}
          className="h-full transition-transform hover:scale-110"
        />
      </NavigationLink>
      <div
        className="md:absolute bottom-0 flex flex-col justify-center w-full pr-3 gap-2 md:p-2 bg-pr-bg-main/50 backdrop-blur-xl z-10 transition-all
      md:peer-hover:-bottom-9"
      >
        <BookInfo className="max-h-24 w-full text-base text-center" data={data.info} short />
        <BookStats
          bookId={data.id}
          stats={data.stats}
          className="flex flex-wrap gap-1 justify-end"
          isOwn
        />
      </div>
    </article>
  );
};

export default BookOwnCard;
