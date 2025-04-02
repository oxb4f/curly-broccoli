import BookCard from '../Card/Card';
import { Link } from 'react-router';
import ROUTES from '../../../../constants/routes';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const BookCatalog = ({ list, isPublic = true, className = '' }) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4 
        md:grid-cols-2 md:${isPublic ? 'auto-rows-[20rem]' : 'auto-rows-auto'} 
        lg:grid-cols-4 
        xl:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
        ${className}`}
    >
      {!isPublic && (
        <li
          className="group h-8 col-span-full 
          lg:col-span-1 
          lg:h-full"
        >
          <Link
            to={ROUTES.MAIN.BOOK.ADD}
            className="relative flex justify-center items-center size-full border-2 border-pr-bg-secondary rounded-md bg-pr-bg-secondary transition-colors 
            hover:border-pr-text 
            before:content-[''] before:absolute before:inset-0 before:rounded-md before:bg-pr-bg-main before:scale-100 before:transition-transform 
            lg:hover:before:scale-0"
          >
            <PlusIcon
              className="absolute size-2/3 transition-all duration-150 opacity-100 
              lg:rotate-0 lg:group-hover:opacity-0 lg:group-hover:rotate-180"
            />
            <BookOpenIcon
              className="absolute size-2/3 transition-all duration-150 opacity-0 
              lg:rotate-180 lg:group-hover:opacity-100 lg:group-hover:rotate-[360deg] lg:group-hover:delay-150"
            />
          </Link>
        </li>
      )}
      {list.map((item) => (
        <li key={item.id} className="h-24 md:h-60">
          <BookCard data={item} />
        </li>
      ))}
    </ul>
  );
};

export default BookCatalog;
