import { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Form from '@shared/components/form/Form';
import ROUTES from '@app/router/constants/routes';
import UserImageUpload from './UserImageUpload';
import useOwnUserService from '@user/own/hooks/useOwnUserService';

const EditUserImageForm = () => {
  const { changePhoto } = useOwnUserService();
  const imageCropperRef = useRef(null);
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    const croppedBlob = await imageCropperRef.current.cropImage();

    await changePhoto({ binaryImage: croppedBlob }, { navigateTo: ROUTES.MAIN.PROFILE });
  };

  const fields = useMemo(
    () => ({
      controlPanel: {
        fields: {
          back: {
            type: 'button',
            value: 'back',
            className:
              'bg-pr-bg-secondary! text-pr-text rounded-none rounded-xs! transition-all hover:enabled:bg-pr-bg-tertiary!',
            onClick: () => {
              navigate(ROUTES.SETTINGS.PROFILE);
            }
          },
          confirm: {
            type: 'submit',
            children: 'confirm',
            className:
              'bg-pr-bg-secondary! text-pr-text rounded-none rounded-xs! transition-all hover:enabled:bg-pr-bg-tertiary!'
          }
        },
        className: 'flex gap-1 rounded-lg overflow-hidden'
      },
      photo: {
        element: UserImageUpload,
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

export default EditUserImageForm;
