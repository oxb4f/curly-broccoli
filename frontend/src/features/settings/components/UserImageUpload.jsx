import { useEffect } from 'react';
import DropZone from '@shared/components/ui/DropZone';
import ImageCropper from '@image-cropper/components/ImageCropper';

const UserImageUpload = ({ value, onChange, imageCropperRef }) => {
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

export default UserImageUpload;
