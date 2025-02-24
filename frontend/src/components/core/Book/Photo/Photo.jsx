import './Photo.css';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import photo from '@/assets/images/profile-photo2.jpg';

const BookPhoto = ({ imageUrl, className = '' }) => {
  return (
    <figure className={`book-photo ${className}`}>
      {true ? (
        <>
          <div
            className="book-photo__background"
            style={{
              backgroundImage: `url(${photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <img src={photo} alt="Book image" className="book-photo__image" />
        </>
      ) : (
        <BookOpenIcon className="book-photo__icon" />
      )}
    </figure>
  );
};

export default BookPhoto;
