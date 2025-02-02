import Form from '../core/Form/Form';
import { loginUser } from '../../services/api/user';

const SignInForm = () => {
  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Login'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    },
    {
      name: 'submit',
      type: 'submit',
      value: 'Sign in'
    }
  ];

  const handleSubmit = async (values) => {
    console.log('Submitting form', values);
    return await loginUser(values);
  };

  return <Form fields={fields} onSubmit={handleSubmit} />;
};

export default SignInForm;
