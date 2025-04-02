import { useEffect } from 'react';
import BookPhoto from '../../../core/Book/Photo/Photo';
import DropZone from '../../../core/DropZone/DropZone';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BookPhotoUpload = ({ onChange, value }) => {
  const imageUrl = value ? URL.createObjectURL(value) : null;

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleOnDrop = (file) => {
    onChange({ target: { value: file } });
  };

  const clearImageUrl = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className="relative size-full w-96 h-screen">
      {imageUrl ? (
        <>
          <BookPhoto imageUrl={imageUrl} className="size-full" />
          <button
            className="absolute top-3 left-1/2 -ml-4 size-8 rounded-full bg-pr-bg-main opacity-70 transition-transform hover:scale-110"
            onClick={clearImageUrl}
          >
            <XMarkIcon />
          </button>
        </>
      ) : (
        <DropZone onDropHandler={handleOnDrop} className="size-full" />
      )}
    </div>
  );
};

export default BookPhotoUpload;
