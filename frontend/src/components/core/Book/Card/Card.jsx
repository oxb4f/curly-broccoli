import BookInfo from '../Info/Info';
import BookPhoto from '../Photo/Photo';
import BookStats from '../../../stats/Book/Book';
import { Link } from 'react-router';
import ROUTES from '../../../../constants/routes';

const BookCard = ({ data, isPublic, isTile = true, className = '' }) => {
  return (
    <article
      className={`size-full grid ${
        isTile
          ? 'grid grid-cols-[1fr_2fr] grid-rows-1 md:grid-rows-[2fr_1fr] md:grid-cols-1'
          : 'grid-rows-[2fr_1fr] grid-cols-1'
      } rounded-md bg-pr-bg-secondary overflow-hidden ${className}`}
    >
      <Link to={ROUTES.MAIN.BOOK.ROOT} className="overflow-hidden">
        <BookPhoto className="w-full h-full transition-transform hover:scale-110" />
      </Link>
      <div className="flex flex-col justify-center w-full p-2 gap-2">
        <BookInfo className="max-h-24 w-full text-base text-center" isShort />
        <BookStats className="flex flex-wrap gap-1 justify-end" isPublic={isPublic} />
      </div>
    </article>
  );
};

export default BookCard;
