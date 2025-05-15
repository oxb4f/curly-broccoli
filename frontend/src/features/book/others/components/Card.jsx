import BookInfo from '@book/shared/components/Info';
import BookImage from '@book/shared/components/Image';
import BookStats from '@book/shared/components/Stats';
import ROUTES from '@app/router/constants/routes';
import NavigationLink from '@shared/components/navigation/Link';

const BookOthersCard = ({ data, isPrivate, className = '' }) => {
  return (
    <article
      className={`size-full grid grid-cols-[8rem_minmax(12rem,1fr)] grid-rows-1 gap-x-2 rounded-[inherit] overflow-hidden isolate
      sm:grid-rows-[80%_20%] sm:grid-cols-1 sm:gap-x-0 
      ${className}`}
    >
      <NavigationLink
        to={`${isPrivate ? ROUTES.MAIN.BOOK.PRIVATE.ROOT : ROUTES.MAIN.BOOK.PUBLIC.ROOT}/${
          data.id
        }`}
        className="block size-full"
      >
        <BookImage
          imageUrl={data.imageUrl}
          className="h-full w-full transition-transform hover:scale-110"
          foregroundImageClassName="max-h-full max-w-full"
        />
      </NavigationLink>
      <div
        className="flex flex-col justify-center w-full pr-3 gap-2 bg-pr-bg-main/30 backdrop-blur-xl
       sm:p-2 sm:-mt-[10%]"
      >
        <BookInfo className="max-h-24 text-base text-center truncate" data={data.info} short />
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
