import './Settings.css';
import useUserService from '@/hooks/useUserService';
import AsyncForm from '../../asyncs/Form/Form';

const ProfileSettingsForm = ({ userCurrentData, isPending }) => {
  const { changeInfo } = useUserService();
  if (!userCurrentData && !isPending) return;

  const fields = {
    username: {
      type: 'text',
      placeholder: 'Username',
      value: userCurrentData?.username
    },
    fullName: {
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
    birthday: {
      type: 'date',
      value: userCurrentData?.personalInfo?.birthday
    },
    socials: {
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
    setSettings: {
      type: 'submit',
      value: 'Set settings'
    }
  };

  const handleSubmit = (userData) => changeInfo(userData);

  return (
    <AsyncForm
      className="profile-settings__form"
      fields={fields}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};

export default ProfileSettingsForm;
