import { useEffect } from 'react';
import BookPhoto from '../../../core/Book/Photo/Photo';
import DropZone from '../../../core/DropZone/DropZone';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BookPhotoUpload = ({ onChange, value, className = '' }) => {
  const imageUrl = value instanceof Blob ? URL.createObjectURL(value) : value;

  const handleOnDrop = (file) => {
    onChange({ target: { value: file } });
  };

  const clearImageUrl = () => {
    onChange({ target: { value: '' } });
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className={`relative ${className}`}>
      {imageUrl ? (
        <>
          <BookPhoto imageUrl={imageUrl} className="size-full rounded-lg" />
          <button
            className="absolute top-3 left-1/2 -ml-4 size-8 rounded-full bg-pr-bg-main opacity-70 transition-transform hover:scale-110"
            onClick={clearImageUrl}
          >
            <XMarkIcon />
          </button>
        </>
      ) : (
        <DropZone onDropHandler={handleOnDrop} className="size-full rounded-lg cursor-pointer" />
      )}
    </div>
  );
};

export default BookPhotoUpload;
