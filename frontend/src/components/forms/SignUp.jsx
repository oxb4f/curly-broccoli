import Form from '../core/Form/Form';
import { createUser } from '../../services/api/user';

const SignUpForm = () => {
  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Login'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      description: '*Minimum 8 characters'
    },
    {
      name: 'submit',
      type: 'submit',
      value: 'Sign up'
    }
  ];

  const handleSubmit = async (values) => {
    return await createUser(values);
  };

  return <Form fields={fields} onSubmit={handleSubmit} />;
};

export default SignUpForm;
