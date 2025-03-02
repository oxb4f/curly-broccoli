import './Catalog.css';
import BookCard from '../Card/Card';
import { Link } from 'react-router';
import ROUTES from '../../../../constants/routes';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const BookCatalog = ({ list, isPublic = true, className = '' }) => {
  return (
    <ul className={`book-catalog ${className}`}>
      {!isPublic && (
        <li className="book-catalog__item">
          <Link to={ROUTES.MAIN.BOOK.ADD} className="book-catalog__link">
            <PlusIcon className="book-catalog__icon book-catalog__icon_plus" />
            <BookOpenIcon className="book-catalog__icon book-catalog__icon_book" />
          </Link>
        </li>
      )}
      {list.map((item) => (
        <li key={item.id} className="book-catalog__item">
          <BookCard data={item} className="book-catalog__book-card" />
        </li>
      ))}
    </ul>
  );
};

export default BookCatalog;
