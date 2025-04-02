import { BookOpenIcon } from '@heroicons/react/24/solid';
import photo from '@/assets/images/profile-photo2.jpg';

const BookPhoto = ({ imageUrl, className = '' }) => {
  imageUrl = photo;
  return (
    <figure className={`relative flex justify-center items-center overflow-hidden ${className}`}>
      {imageUrl ? (
        <>
          <div
            className="absolute inset-0 scale-105 blur-sm bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <img src={imageUrl} alt="Book image" className="relative size-full object-contain" />
        </>
      ) : (
        <BookOpenIcon />
      )}
    </figure>
  );
};

export default BookPhoto;
