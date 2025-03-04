import './Photo.css';
import { useEffect } from 'react';
import BookPhoto from '../../../core/Book/Photo/Photo';
import DropZone from '../../../core/DropZone/DropZone';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function BookPhotoUpload({ onChange, value, className = '' }) {
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
    <div className="book-photo-upload">
      {imageUrl ? (
        <>
          <BookPhoto imageUrl={imageUrl} className="book-photo-upload__photo" />
          <button className="book-photo-upload__close-button" onClick={clearImageUrl}>
            <XMarkIcon className="book-photo-upload__close-icon" />
          </button>
        </>
      ) : (
        <DropZone onDropHandler={handleOnDrop} className="book-photo-upload__drop-zone" />
      )}
    </div>
  );
}
