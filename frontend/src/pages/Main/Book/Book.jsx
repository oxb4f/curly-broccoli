import BookInfo from '../../../components/core/Book/Info/Info';
import BookPhoto from '../../../components/core/Book/Photo/Photo';
import BookStats from '../../../components/stats/Book/Book';
import './Book.css';
import { useParams } from 'react-router';

const BookPage = () => {
  // const params = useParams();
  return (
    <section className="book-page">
      <BookPhoto className="book-page__photo" />
      <div className="book-page__details">
        <BookInfo data={{ other: 'Other info' }} className="book-page__info" />
        <BookStats className="book-page__stats" />
        {/* <Comments /> */}
      </div>
    </section>
  );
};

export default BookPage;
