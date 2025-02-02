import './SetPhotoPage.css';
import DropZone from '../../../components/core/DropZone/DropZone';
import { useState } from 'react';
import CropImageForm from '../../../components/forms/CropImage';

const SetPhotoZone = () => {
  console.log('SetPhotoZone');
  const [imageUrl, setImageUrl] = useState(null);

  const handleOnDrop = (file) => {
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };

  return (
    <>
      <div className="set-photo-zone">
        <CropImageForm imageUrl={imageUrl} />
        <DropZone onDropHandler={handleOnDrop} />
      </div>
    </>
  );
};

export default SetPhotoZone;
