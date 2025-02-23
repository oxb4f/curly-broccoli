import './Photo.css';
import DropZone from '../../../components/core/DropZone/DropZone';
import { useState } from 'react';
import PhotoSettingsForm from '../../../components/forms/Settings/Photo';

const SettingsPhotoPage = () => {
  console.log('SetPhotoZone');
  const [imageUrl, setImageUrl] = useState(null);

  const handleOnDrop = (file) => {
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };

  return (
    <section className="photo-settings">
      {imageUrl ? (
        <PhotoSettingsForm imageUrl={imageUrl} />
      ) : (
        <DropZone onDropHandler={handleOnDrop} />
      )}
      {/* <CropImageForm imageUrl={imageUrl} /> */}
      {/* <DropZone onDropHandler={handleOnDrop} /> */}
    </section>
  );
};

export default SettingsPhotoPage;
