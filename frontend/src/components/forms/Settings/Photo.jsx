import { useRef, useMemo } from 'react';
import Form from '../../core/Form/Form';
import ROUTES from '../../../constants/routes';
import UserPhotoUpload from '../../uploads/User/Photo/Photo';
import useUserService from '@/hooks/useUserService';
import { useNavigate } from 'react-router';

const PhotoSettingsForm = () => {
  const { changePhoto } = useUserService();
  const imageCropperRef = useRef(null);
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    const croppedBlob = await imageCropperRef.current.cropImage();

    await changePhoto({ binaryImage: croppedBlob });

    // const a = document.createElement('a');
    // a.href = imageUrl;
    // a.download = 'croppedBlob.jpg';
    // a.click();
  };

  const fields = useMemo(
    () => ({
      controlPanel: {
        fields: {
          back: {
            type: 'button',
            value: 'back',
            className:
              '!bg-pr-bg-secondary text-pr-text rounded-none !rounded-sm transition-all hover:enabled:!bg-pr-bg-tertiary',
            onClick: () => {
              navigate(ROUTES.SETTINGS.PROFILE);
            }
          },
          confirm: {
            type: 'submit',
            value: 'confirm',
            className:
              '!bg-pr-bg-secondary text-pr-text rounded-none !rounded-sm transition-all hover:enabled:!bg-pr-bg-tertiary'
          }
        },
        className: 'flex gap-1 rounded-lg overflow-hidden'
      },
      photo: {
        element: UserPhotoUpload,
        props: {
          imageCropperRef
        }
      }
    }),
    []
  );

  return (
    <Form
      className="max-w-min min-w-fit h-screen py-2 grid grid-rows-[auto_1fr] gap-2"
      fields={fields}
      onSubmit={handleOnSubmit}
      allFieldsRequired={true}
    />
  );
};

export default PhotoSettingsForm;
