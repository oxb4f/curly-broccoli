import { useState } from 'react';
import AuthSignInForm from './SignInForm';
import AuthSignUpForm from './SignUpForm';
import Logo from '@shared/components/ui/Logo';

const AuthWindow = ({ className = '' }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`min-w-60 ${className}`}>
      <Logo text="Litrify" className="pb-4" />
      {isLogin ? <AuthSignInForm /> : <AuthSignUpForm />}
      <p className="pt-2">
        {`${isLogin ? 'First time here?' : 'Already have an account?'} `}
        <button
          type="button"
          className="text-pr-main hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          Sign {isLogin ? 'up' : 'in'}
        </button>
      </p>
    </div>
  );
};

export default AuthWindow;
