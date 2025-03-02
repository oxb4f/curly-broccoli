import './Photo.css';
import { BookOpenIcon } from '@heroicons/react/24/solid';

const BookPhoto = ({ imageUrl, className = '' }) => {
  return (
    <figure className={`book-photo ${className}`}>
      {imageUrl ? (
        <>
          <div
            className="book-photo__background"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <img src={imageUrl} alt="Book image" className="book-photo__image" />
        </>
      ) : (
        <BookOpenIcon className="book-photo__icon" />
      )}
    </figure>
  );
};

export default BookPhoto;
