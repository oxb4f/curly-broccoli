import { useEffect } from 'react';
import DropZone from '@shared/components/ui/DropZone';
import ImageCropper from '@image-cropper/components/ImageCropper';

const UserImageUpload = ({ value, onChange, imageCropperRef, className }) => {
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
    <div className={`size-full flex justify-center ${className}`}>
      {imageUrl ? (
        <>
          <ImageCropper innerRef={imageCropperRef} className="size-full" imageUrl={imageUrl} />
        </>
      ) : (
        <DropZone onDropHandler={handleOnDrop} className="h-full w-full min-w-96 rounded-md" />
      )}
    </div>
  );
};

export default UserImageUpload;
