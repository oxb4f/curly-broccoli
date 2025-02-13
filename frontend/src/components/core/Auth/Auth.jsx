import { useState } from 'react';
import AuthSignInForm from '../../forms/Auth/SignIn';
import './Auth.css';
import AuthSignUpForm from '../../forms/Auth/SignUp';
import Logo from '../Logo/Logo';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <article className="authorization">
      <header className="authorization__header">
        <Logo text="Litrify" />
      </header>
      <main className="authorization__main">
        {isLogin ? <AuthSignInForm /> : <AuthSignUpForm />}
      </main>
      <footer className="authorization__footer">
        {
          <div>
            {isLogin ? (
              <>
                First time here?{' '}
                <span className="link" onClick={() => setIsLogin(!isLogin)}>
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="link" onClick={() => setIsLogin(!isLogin)}>
                  Sign in
                </span>
              </>
            )}
          </div>
        }
      </footer>
    </article>
  );
};

export default Auth;
