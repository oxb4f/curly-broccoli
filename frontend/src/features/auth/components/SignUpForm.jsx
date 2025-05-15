import Form from '@shared/components/form/Form';
import ROUTES from '@app/router/constants/routes';
import useOwnUserService from '@user/own/hooks/useOwnUserService';

const AuthSignUpForm = () => {
  const { signUp } = useOwnUserService();

  const fields = {
    username: {
      type: 'text',
      label: 'Username'
    },
    password: {
      type: 'password',
      label: 'Password',
      hint: '*Minimum 8 characters'
    },
    submit: {
      type: 'submit',
      children: 'Sign up'
    }
  };

  const handleSubmit = async (values) => {
    await signUp(values, { navigateTo: ROUTES.MAIN.ROOT, navigateOptions: { replace: true } });
  };

  return (
    <Form
      className="grid w-full gap-y-2"
      fields={fields}
      onSubmit={handleSubmit}
      allFieldsRequired
    />
  );
};

export default AuthSignUpForm;
