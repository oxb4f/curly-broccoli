import Form from '@shared/components/form/Form';
import ROUTES from '@app/router/constants/routes';
import useOwnUserService from '@user/own/hooks/useOwnUserService';

const AuthSignInForm = () => {
  const { signIn } = useOwnUserService();

  const fields = {
    username: {
      type: 'text',
      placeholder: 'Username'
    },
    password: {
      type: 'password',
      placeholder: 'Password'
    },
    submit: {
      type: 'submit',
      children: 'Sign in'
    }
  };

  const handleSubmit = async (values) => {
    await signIn(values, { navigateTo: ROUTES.MAIN.ROOT, navigateOptions: { replace: true } });
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

export default AuthSignInForm;
