import BookCard from '../Card/Card';
import { Link } from 'react-router';
import ROUTES from '../../../../constants/routes';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import BookAddLink from '../Link/Add/Add';
import Spinner from '../../Spinner/Spinner';

const BookCatalog = ({ items, isPublic = true, className = '' }) => {
  return items ? (
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
          lg:h-60"
        >
          <BookAddLink className="size-full" />
        </li>
      )}
      {items.map((item) => (
        <li key={item.id} className="h-24 md:h-60">
          <BookCard data={item} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="size-full flex justify-center items-center">
      <Spinner className="size-20 border-8" />
    </div>
  );
};

export default BookCatalog;
