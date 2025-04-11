import useUserService from '@/hooks/useUserService';
import AsyncForm from '../../core/Form/Async/Async';

const ProfileSettingsForm = ({ userCurrentData, isPending }) => {
  const { changeInfo } = useUserService();
  if (!userCurrentData && !isPending) return;

  console.log(userCurrentData);

  const commonFormGroupClasses = 'flex gap-x-5';

  const fields = {
    username: {
      type: 'text',
      placeholder: 'Username',
      value: userCurrentData?.username
    },
    fullName: {
      fields: {
        firstName: {
          type: 'text',
          placeholder: 'First name',
          value: userCurrentData?.personalInfo?.firstName
        },
        lastName: {
          type: 'text',
          placeholder: 'Last name',
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
          type: 'text',
          placeholder: 'Telegram',
          value: userCurrentData?.social?.telegram
        },
        instagram: {
          type: 'text',
          placeholder: 'Instagram',
          value: userCurrentData?.social?.instagram
        }
      },
      className: commonFormGroupClasses
    },
    setSettings: {
      type: 'submit',
      value: 'Set settings'
    }
  };

  const handleSubmit = (userData) => changeInfo(userData);

  return (
    <AsyncForm
      className="w-full min-w-80 max-w-2xl grid gap-y-2"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
};

export default ProfileSettingsForm;
