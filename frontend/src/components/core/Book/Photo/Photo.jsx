import { BookOpenIcon } from '@heroicons/react/24/solid';

const BookPhoto = ({ imageUrl, className = '' }) => {
  return (
    <figure className={`relative flex justify-center items-center overflow-hidden ${className}`}>
      {imageUrl ? (
        <>
          <div
            className="absolute inset-0 scale-105 blur-xs bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <img
            src={imageUrl}
            alt="Book image"
            className="size-full text-center object-contain z-0"
          />
        </>
      ) : (
        <BookOpenIcon className="size-full" />
      )}
    </figure>
  );
};

export default BookPhoto;
