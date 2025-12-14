import React, { useState } from 'react';
import FaApple from './img/FaApple.png'; 
import FaGithub from './img/FaGithub.png'; 
import FaGoogle from './img/FaGoogle.png'; 
import { MainButton } from './MainButton';
import { TopActiveButtonOther } from './TopActiveButtonOther';
import './Styles.css';

export const SignInForm = () => {
  const [action, setAction] = useState('Sign in');
  const [email, setEmail] = useState(''); 
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    console.log(`Вход через ${provider}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Вход через ${provider} пока не реализован.`);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const url = action === 'Sign in' 
        ? 'http://localhost:8080/api/auth/login'
        : 'http://localhost:8080/api/auth/register';

      const requestBody = action === 'Sign in'
        ? { loginOrEmail: email, password }
        : { login, email, password };

      console.log(`Отправка запроса на ${url}`, requestBody);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Ответ от сервера:', data);

      // if (data.success) {
      //   setMessage(`✅ ${data.message}`);
      //   localStorage.setItem('user', JSON.stringify(data.user));
      //   localStorage.setItem('isAuthenticated', 'true');
        
      //   setTimeout(() => {
      //     window.location.href = '/';
      //   }, 1000);
      // } 
      if (data.success) {
          setMessage(`✅ ${data.message}`);
          
          // Сохраняем JWT токен и данные пользователя
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('isAuthenticated', 'true');
          
          // Обновляем заголовок страницы
          window.dispatchEvent(new Event('userLoggedIn'));
          
          setTimeout(() => {
              window.location.href = '/';
          }, 1000);
      }
      else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setMessage(`❌ Ошибка сети: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignIn = () => {
    if (!isLoading) {
      setAction('Sign in');
      setMessage('');
    }
  };

  const handleSwitchToSignUp = () => {
    if (!isLoading) {
      setAction('Sign up');
      setMessage(''); 
    }
  };

  return (
    <div className="auth-page-container">
      <div className="sign-in-form-wrapper">
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className='sign-in-name'>{action}</div>
          
          {action === 'Sign up' && (
            <div className="input-group">
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required={action === 'Sign up'}
                placeholder=" "
                disabled={isLoading}
                minLength="3"
                maxLength="50"
              />
              <label htmlFor="login">Login</label>
            </div>
          )}

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
              minLength="6"
            />
            <label htmlFor="password">Password</label>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

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
            <div 
              className={`action-button ${action === 'Sign in' ? 'active' : 'inactive'}`}
              onClick={action === 'Sign in' ? handleSubmit : handleSwitchToSignIn}
              role="button"
              tabIndex={0}
            >
              {action === 'Sign in' ? 
                <MainButton 
                  text={isLoading ? 'Loading...' : 'Sign in'} 
                  type="submit"
                  disabled={isLoading}
                /> : 
                <TopActiveButtonOther 
                  text='Sign in' 
                  onClick={handleSwitchToSignIn}
                  disabled={isLoading}
                />
              }
            </div>

            <div 
              className={`action-button ${action === 'Sign up' ? 'active' : 'inactive'}`}
              onClick={action === 'Sign up' ? handleSubmit : handleSwitchToSignUp}
              role="button"
              tabIndex={0}
            >
              {action === 'Sign up' ? 
                <MainButton 
                  text={isLoading ? 'Loading...' : 'Sign up'} 
                  type="submit"
                  disabled={isLoading}
                /> : 
                <TopActiveButtonOther 
                  text='Sign up' 
                  onClick={handleSwitchToSignUp}
                  disabled={isLoading}
                />
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
