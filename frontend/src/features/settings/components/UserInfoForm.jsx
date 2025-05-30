import AsyncForm from '@shared/components/form/AsyncForm';
import ROUTES from '@app/router/constants/routes';
import useOwnUserService from '@user/own/hooks/useOwnUserService';

const EditUserInfoForm = ({ userCurrentData, isPending, className = '' }) => {
  const { changeInfo } = useOwnUserService();
  if (!userCurrentData && !isPending) return;

  const commonFormGroupClasses = 'flex gap-x-5';

  const fields = {
    username: {
      type: 'text',
      label: 'Username',
      value: userCurrentData?.username
    },
    fullName: {
      fields: {
        firstName: {
          type: 'text',
          label: 'First name',
          value: userCurrentData?.personalInfo?.firstName
        },
        lastName: {
          type: 'text',
          label: 'Last name',
          value: userCurrentData?.personalInfo?.lastName
        }
      },
      className: commonFormGroupClasses
    },
    birthday: {
      type: 'date',
      value: userCurrentData?.personalInfo?.birthday
    },
    socials: {
      fields: {
        telegram: {
          type: 'url',
          label: 'Telegram',
          value: userCurrentData?.social?.telegram
        },
        instagram: {
          type: 'url',
          label: 'Instagram',
          value: userCurrentData?.social?.instagram
        }
      },
      className: commonFormGroupClasses
    },
    setSettings: {
      type: 'submit',
      children: 'Set settings'
    }
  };

  const handleSubmit = async (userData) => {
    await changeInfo(userData, { navigateTo: ROUTES.MAIN.PROFILE });
  };

  return (
    <AsyncForm
      className={`w-full min-w-sm grid grid-cols-1 gap-y-2 ${className}`}
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
};

export default EditUserInfoForm;
