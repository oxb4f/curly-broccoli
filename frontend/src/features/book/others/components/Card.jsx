import BookInfo from '@book/shared/components/Info';
import BookImage from '@book/shared/components/Image';
import BookStats from '@book/shared/components/Stats';
import ROUTES from '@app/router/constants/routes';
import NavigationLink from '@shared/components/navigation/Link';

const BookOthersCard = ({ data, isPrivate, className = '' }) => {
  return (
    <article
      className={`relative grid grid-cols-[minmax(8rem,30%)_minmax(auto,70%)] grid-rows-1 md:grid-cols-1 rounded-3xl overflow-hidden ${className}`}
    >
      <NavigationLink
        to={`${isPrivate ? ROUTES.MAIN.BOOK.PRIVATE.ROOT : ROUTES.MAIN.BOOK.PUBLIC.ROOT}/${
          data.id
        }`}
        className="md:mb-9"
      >
        <BookImage
          imageUrl={data.imageUrl}
          className="h-full transition-transform hover:scale-110"
        />
      </NavigationLink>
      <div className="md:absolute bottom-0 flex flex-col justify-center w-full pr-3 gap-2 md:p-2 bg-pr-bg-main/50 backdrop-blur-xl z-10">
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
