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
  const [modal, setModal] = useState(false);
  
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [resetStep, setResetStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setResetStep(1);
      setResetEmail('');
      setResetMessage('');
      setResetToken('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

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

      console.log(`Sending request to ${url}`, requestBody);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Server answer:', data);

      if (data.success) {
        setMessage(`✅ ${data.message}`);
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');

        window.dispatchEvent(new Event('userLoggedIn'));
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setMessage(`❌ Ошибка сети: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage('');
    setResetToken('');
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/password/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      
      if (response.ok) {
        const data = await response.text();
        setResetMessage(`✅ ${data}`);
        setResetStep(2);
      } else {
        const error = await response.text();
        setResetMessage(`❌ ${error}`);
      }
    } catch (error) {
      setResetMessage(`❌ Ошибка сети: ${error.message}`);
    } finally {
      setResetLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage('');
    
    if (newPassword !== confirmPassword) {
      setResetMessage('❌ Passwords don`t match');
      setResetLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetEmail, 
          token: resetToken, 
          newPassword 
        })
      });
      
      if (response.ok) {
        const data = await response.text();
        setResetMessage(`✅ ${data}`);

        setTimeout(() => {
          toggleModal();
        }, 2000);
      } else {
        const error = await response.text();
        setResetMessage(`❌ ${error}`);
      }
    } catch (error) {
      setResetMessage(`❌ Ошибка сети: ${error.message}`);
    } finally {
      setResetLoading(false);
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

  const renderResetPasswordModal = () => {
    if (!modal) return null;

    return (
      <div className="modal-overlay" onClick={toggleModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          
          <div className="sign-in-form-wrapper">
            <form className="sign-in-form" onSubmit={resetStep === 1 ? handlePasswordResetRequest : handlePasswordReset}>
              <div className='sign-in-name'>Password recovery</div>
              
              {resetStep === 1 ? (
                <>
                  <p className="form-description">
                    The instruction will be sent to your email.
                  </p>
                  
                  <div className="input-group">
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder=" "
                      required
                      disabled={resetLoading}
                    />
                    <label>Email</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={resetLoading}
                  >
                    {resetLoading ? 'Sending...' : 'Send instructions'}
                  </button>
                </>
              ) : (
                <>
                  <p className="form-description">
                    Enter the token from the email.
                  </p>
                  
                  <div className="input-group">
                    <input
                      type="text"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      placeholder=" "
                      required
                      disabled={resetLoading}
                    />
                    <label>token</label>
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder=" "
                      required
                      disabled={resetLoading}
                      minLength="6"
                    />
                    <label>new password</label>
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder=" "
                      required
                      disabled={resetLoading}
                      minLength="6"
                    />
                    <label>repeat password</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={resetLoading}
                  >
                    {resetLoading ? 'Changing password...' : 'Change password'}
                  </button>
                  
                  <button 
                    type="button" 
                    className="back-button"
                    onClick={() => setResetStep(1)}
                    disabled={resetLoading}
                  >
                    ← Назад
                  </button>
                </>
              )}
              
              {resetMessage && (
                <div className={`message ${resetMessage.includes('✅') ? 'success' : 'error'}`}>
                  {resetMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
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
            <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); toggleModal(); }}>
              Forgot password?
            </a>
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
      
      {renderResetPasswordModal()}
    </div>
  );
};