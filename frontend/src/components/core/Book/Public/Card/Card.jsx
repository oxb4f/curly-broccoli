import BookInfo from '../../Info/Info';
import BookPhoto from '../../Photo/Photo';
import BookStats from '../../../../stats/Book/Book';
import ROUTES from '../../../../../constants/routes';
import NavigationLink from '../../../Navigation/Link/Link';
import { StarIcon } from '@heroicons/react/24/solid';

const BookPublicCard = ({ data, className = '' }) => {
  return (
    <article
      className={`relative size-full grid grid-cols-[minmax(8rem,30%)_minmax(auto,70%)] grid-rows-1 md:grid-rows-[2fr_1fr] md:grid-cols-1 rounded-md bg-pr-bg-secondary overflow-hidden ${className}`}
    >
      <NavigationLink to={`${ROUTES.MAIN.BOOK.PUBLIC.ROOT}/${data.id}`} className="overflow-hidden">
        {data.stats.rating && (
          <span className="absolute top-2 right-2 w-12 h-6 flex justify-evenly items-center rounded-md bg-pr-bg-secondary/50 text-pr-rating z-10">
            {data.stats.rating}
            <StarIcon className="size-5" />
          </span>
        )}
        <BookPhoto
          imageUrl={data.imageUrl}
          className="size-full transition-transform hover:scale-110"
        />
      </NavigationLink>
      <div className="flex flex-col justify-center w-full pr-3 gap-2 md:p-2">
        <BookInfo className="max-h-24 text-base text-center" data={data.info} isShort />
        <BookStats
          bookId={data.id}
          stats={data.stats}
          className="flex flex-wrap gap-1 justify-end"
        />
      </div>
    </article>
  );
};

export default BookPublicCard;
