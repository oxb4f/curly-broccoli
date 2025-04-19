import Form from '../../core/Form/Form';
import ROUTES from '../../../constants/routes';
import useUserService from '../../../hooks/useUsersService';

const AuthSignInForm = () => {
  const { signIn } = useUserService();

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
      value: 'Sign in'
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
