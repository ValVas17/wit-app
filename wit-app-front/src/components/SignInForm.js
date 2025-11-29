import React, { useState } from 'react';
import FaApple from './img/FaApple.png'; 
import FaGithub from './img/FaGithub.png'; 
import FaGoogle from './img/FaGoogle.png'; 
import { MainButton } from './MainButton';
import { TopActiveButtonOther } from './TopActiveButtonOther';
import './Styles.css';
// import './SignInForm.css';

// const SignInForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Здесь можно добавить логику аутентификации
//     console.log('Попытка входа:', { email, password });
//     alert(`Вход с email: ${email}, паролем: ${password}`);
//   };

//   const handleSocialLogin = (provider) => {
//     console.log(`Вход через ${provider}`);
//     alert(`Вход через ${provider} пока не реализован.`);
//     // Здесь можно добавить логику для входа через соцсети
//   };

//   const handleSignUp = () => {
//     console.log('Переход на страницу регистрации');
//     alert('Переход на страницу регистрации пока не реализован.');
//     // Здесь можно добавить логику для перехода на страницу регистрации
//   };


export const SignInForm = () => {
  const [action, setAction] = useState('Sign in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    console.log(`Вход через ${provider}`);
    // Имитация загрузки
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Вход через ${provider} пока не реализован.`);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка формы
    console.log(`${action} attempt:`, { email, password });
  };

  return (
    <div className="auth-page-container">
      <div className="sign-in-form-wrapper">
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className='sign-in-name'>{action}</div>
          
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              disabled={isLoading}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              disabled={isLoading}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="separator">or continue with</div>

          <div className="social-login-icons">
            <img 
              className={`social-icon ${isLoading ? 'loading' : ''}`} 
              src={FaApple} 
              alt="Apple" 
              onClick={() => !isLoading && handleSocialLogin('Apple')}
            />
            <img 
              className={`social-icon ${isLoading ? 'loading' : ''}`} 
              src={FaGoogle} 
              alt="Google"
              onClick={() => !isLoading && handleSocialLogin('Google')}
            />
            <img 
              className={`social-icon ${isLoading ? 'loading' : ''}`} 
              src={FaGithub} 
              alt="GitHub"
              onClick={() => !isLoading && handleSocialLogin('GitHub')}
            />
          </div>

          {action === 'Sign in' && (
            <a href="#" className="forgot-password">Forgot password?</a>
          )}

          <div className="form-actions">
            <div onClick={() => !isLoading && setAction("Sign in")}>
              {action === "Sign in" ? 
                <MainButton text={isLoading ? 'Loading...' : 'Sign in'} /> : 
                <TopActiveButtonOther text='Sign in' />
              }
            </div>
            {/* <div className="divider">or</div> */}
            <div onClick={() => !isLoading && setAction("Sign up")}>
              {action === "Sign up" ? 
                <MainButton text={isLoading ? 'Loading...' : 'Sign up'} /> : 
                <TopActiveButtonOther text='Sign up' />
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
