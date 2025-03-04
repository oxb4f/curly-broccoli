import './Settings.css';
import { useRef, useMemo } from 'react';
import Form from '../../core/Form/Form';
import ROUTES from '../../../constants/routes';
import UserPhotoUpload from '../../uploads/User/Photo/Photo';
import useUserService from '@/hooks/useUserService';
import { Link } from 'react-router';

const PhotoSettingsForm = () => {
  const { changePhoto } = useUserService();
  const imageCropperRef = useRef(null);

  const handleOnSubmit = async () => {
    const croppedBlob = await imageCropperRef.current.cropImage();

    await changePhoto({ binaryImageData: croppedBlob });

    // const a = document.createElement('a');
    // a.href = imageUrl;
    // a.download = 'croppedBlob.jpg';
    // a.click();
  };

  const fields = useMemo(
    () => ({
      controlPanel: {
        back: {
          element: Link,
          value: 'back',
          args: {
            to: ROUTES.SETTINGS.PROFILE,
            className: 'form__back-link',
            children: 'back'
          }
        },
        confirm: {
          type: 'submit',
          value: 'confirm'
        }
      },
      photo: {
        element: UserPhotoUpload,
        args: {
          imageCropperRef: imageCropperRef
        }
      }
    }),
    []
  );

  return (
    <Form
      className="photo-settings-page__form"
      fields={fields}
      onSubmit={handleOnSubmit}
      allFieldsRequired={true}
    />
  );
};

export default PhotoSettingsForm;
