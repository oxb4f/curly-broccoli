import './Photo.css';
import DropZone from '../../../core/DropZone/DropZone';
import { useEffect } from 'react';
import ImageCropper from '../../../core/CropImageWindow/ImageCropper';

const UserPhotoUpload = ({ value, onChange, imageCropperRef }) => {
  const imageUrl = value ? URL.createObjectURL(value) : null;

  const handleOnDrop = (file) => {
    onChange({ target: { value: file } });
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="user-photo-upload">
      {imageUrl ? (
        <>
          <ImageCropper
            innerRef={imageCropperRef}
            className="user-photo-upload__image-cropper"
            imageUrl={imageUrl}
          />
        </>
      ) : (
        <DropZone onDropHandler={handleOnDrop} className="user-photo-upload__drop-zone" />
      )}
    </div>
  );
};

export default UserPhotoUpload;
