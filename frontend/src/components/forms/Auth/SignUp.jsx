import Form from '../../core/Form/Form';
import ROUTES from '../../../constants/routes';
import useUserService from '../../../hooks/useUsersService';

const AuthSignUpForm = () => {
  const { signUp } = useUserService();

  const fields = {
    username: {
      type: 'text',
      placeholder: 'Username'
    },
    password: {
      type: 'password',
      placeholder: 'Password',
      hint: '*Minimum 8 characters'
    },
    submit: {
      type: 'submit',
      value: 'Sign up'
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
