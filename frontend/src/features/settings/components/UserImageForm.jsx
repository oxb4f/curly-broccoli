import { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Form from '@shared/components/form/Form';
import ROUTES from '@app/router/constants/routes';
import UserImageUpload from './UserImageUpload';
import useOwnUserService from '@user/own/hooks/useOwnUserService';

const EditUserImageForm = ({ className = '' }) => {
  const { changePhoto } = useOwnUserService();
  const imageCropperRef = useRef(null);
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    const croppedBlob = await imageCropperRef.current.cropImage();

    await changePhoto({ binaryImage: croppedBlob }, { navigateTo: ROUTES.MAIN.PROFILE });
  };

  const fields = useMemo(
    () => ({
      back: {
        type: 'button',
        children: 'back',
        className:
          'bg-pr-bg-secondary! text-pr-text rounded-none rounded-xs rounded-l-lg transition-all hover:enabled:bg-pr-bg-tertiary!',
        onClick: () => {
          navigate(-1);
        }
      },
      confirm: {
        type: 'submit',
        children: 'confirm',
        className:
          'bg-pr-bg-secondary! text-pr-text rounded-none rounded-xs rounded-e-lg transition-all hover:enabled:bg-pr-bg-tertiary!'
      },
      photo: {
        element: UserImageUpload,
        props: {
          imageCropperRef,
          className: 'col-span-full'
        }
      }
    }),
    []
  );

  return (
    <Form
      className={`grid grid-rows-[auto_1fr] grid-cols-2 gap-1 ${className}`}
      fields={fields}
      onSubmit={handleOnSubmit}
      allFieldsRequired={true}
    />
  );
};

export default EditUserImageForm;
