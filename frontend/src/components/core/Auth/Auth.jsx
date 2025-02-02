import { useState } from 'react';
import SignInForm from '../../forms/SignIn';
import './Auth.css';
import SignUpForm from '../../forms/SignUp';
import Logo from '../Logo/Logo';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <article className="authorization">
      <header className="authorization__header">
        <Logo text="Litrify" />
      </header>
      <main className="authorization__main">{isLogin ? <SignInForm /> : <SignUpForm />}</main>
      <footer className="authorization__footer">
        {
          <div>
            {isLogin ? (
              <>
                Already have an account?{' '}
                <span className="link" onClick={() => setIsLogin(!isLogin)}>
                  Sign up
                </span>
              </>
            ) : (
              <>
                First time here?{' '}
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
