import BookInfo from '@book/shared/components/Info';
import BookImage from '@book/shared/components/Image';
import BookStats from '@book/shared/components/Stats';
import ROUTES from '@app/router/constants/routes';
import NavigationLink from '@shared/components/navigation/Link';

const BookOthersCard = ({ data, isPrivate, className = '' }) => {
  return (
    <article
      className={`relative grid grid-cols-[minmax(10%,30%)_minmax(auto,70%)] grid-rows-1 gap-x-2 rounded-3xl overflow-hidden isolate sm:grid-cols-1 ${className}`}
    >
      <NavigationLink
        to={`${isPrivate ? ROUTES.MAIN.BOOK.PRIVATE.ROOT : ROUTES.MAIN.BOOK.PUBLIC.ROOT}/${
          data.id
        }`}
        className="sm:mb-9"
      >
        <BookImage
          imageUrl={data.imageUrl}
          className="h-full transition-transform hover:scale-110"
        />
      </NavigationLink>
      <div
        className="bottom-0 flex flex-col justify-center w-full pr-3 gap-2  bg-pr-bg-main/50 backdrop-blur-xl z-10
      sm:absolute sm:p-2"
      >
        <BookInfo className="max-h-24 text-base text-center" data={data.info} short />
        <BookStats
          bookId={data.id}
          stats={data.stats}
          className="flex flex-wrap gap-1 justify-end"
        />
      </div>
    </article>
  );
};

export default BookOthersCard;
