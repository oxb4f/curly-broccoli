import './Card.css';
import BookInfo from '../Info/Info';
import BookPhoto from '../Photo/Photo';
import BookStats from '../../../stats/Book/Book';
import { Link } from 'react-router';
import ROUTES from '../../../../constants/routes';

const BookCard = ({ data, isPublic }) => {
  return (
    <article className="book-card">
      <div className="book-card__photo-container">
        <Link to={ROUTES.MAIN.BOOK} className="link book-card__link">
          <BookPhoto className="book-card__photo" />
        </Link>
      </div>
      <div className="book-card__details">
        <BookInfo className="book-card__info" />
        <BookStats className="book-card__stats" isPublic={isPublic} />
      </div>
    </article>
  );
};

export default BookCard;
