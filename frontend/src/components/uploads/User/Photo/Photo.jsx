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
    <div className="size-full flex justify-center">
      {imageUrl ? (
        <>
          <ImageCropper innerRef={imageCropperRef} className="size-full" imageUrl={imageUrl} />
        </>
      ) : (
        <DropZone onDropHandler={handleOnDrop} className="h-full min-w-96 max-w-md rounded-md" />
      )}
    </div>
  );
};

export default UserPhotoUpload;
