import BookCard from '../Card/Card';

const BookCatalog = ({ list, className = '' }) => {
  return (
    <ul className={`book-catalog ${className}`}>
      {list.map((item) => (
        <li key={item.id} className="book-catalog__item">
          <BookCard data={item} />
        </li>
      ))}
    </ul>
  );
};

export default BookCatalog;
