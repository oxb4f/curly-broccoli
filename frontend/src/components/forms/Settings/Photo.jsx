import { useRef, useMemo } from 'react';
import Form from '../../core/Form/Form';
import ROUTES from '../../../constants/routes';
import UserPhotoUpload from '../../uploads/User/Photo/Photo';
import useUserService from '@/hooks/useUserService';
import NavigationLink from '../../core/Navigation/Link/Link';

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
        fields: {
          back: {
            element: NavigationLink,
            value: 'back',
            args: {
              text: 'back',
              to: ROUTES.SETTINGS.PROFILE,
              className:
                'bg-pr-bg-secondary text-pr-text rounded-s-lg size-full py-2 text-center hover:bg-pr-bg-tertiary transition-colors'
            }
          },
          confirm: {
            type: 'submit',
            value: 'confirm',
            className:
              '!bg-pr-bg-secondary text-pr-text rounded-none rounded-e-lg hover:enabled:!bg-pr-bg-tertiary transition-colors'
          }
        },
        className: 'flex'
      },
      photo: {
        element: UserPhotoUpload,
        args: {
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
