import AsyncForm from '@shared/components/form/AsyncForm';
import ROUTES from '@app/router/constants/routes';
import useOwnUserService from '@user/own/hooks/useOwnUserService';

const EditUserInfoForm = ({ userCurrentData, isPending }) => {
  const { changeInfo } = useOwnUserService();
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
          type: 'url',
          placeholder: 'Telegram',
          value: userCurrentData?.social?.telegram
        },
        instagram: {
          type: 'url',
          placeholder: 'Instagram',
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
      className="w-full min-w-80 max-w-2xl grid gap-y-2"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
};

export default EditUserInfoForm;
