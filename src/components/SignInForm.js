import React, { useState } from 'react';
import FaApple from './img/FaApple.png'; 
import FaGithub from './img/FaGithub.png'; 
import FaGoogle from './img/FaGoogle.png'; 
import { MainButton } from './MainButton';
import { TopActiveButtonOther } from './TopActiveButtonOther';
import './Styles.css';

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


    const handleSocialLogin = (provider) => {
        console.log(`Вход через ${provider}`);
        alert(`Вход через ${provider} пока не реализован.`);
    };

    return (
        <div className="auth-page-container">

            <div className="sign-in-form-wrapper">
                <div className="decorative-border top-left"></div>
                <div className="decorative-border top-right"></div>
                <div className="decorative-border bottom-left"></div>
                <div className="decorative-border bottom-right"></div>

                <form className="sign-in-form">
                    <div className='sign-in-name'>{action}</div>
                    {/* <div className={action==="Sign in"?"sign-in-name grey":"sign-in-name"}>{action}</div> */}
                    {/* <div className={action==="Sign up"?"sign-in-name grey":"sign-in-name"}>Sign up</div> */}

                    <div className="input-group">
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        <label htmlFor="email">login/email</label>
                    </div>

                    <div className="input-group">
                        <input className=''
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                        <label htmlFor="password">password</label>
                    </div>

                    <div className="separator">or continue with:</div>

                    <div className="social-login-icons">
                        {FaApple && <img className="social-icon" src={FaApple} />}
                        {FaGoogle && <img className="social-icon" src={FaGoogle} />}
                        {FaGithub && <img className="social-icon" src={FaGithub} />}
                        {/* <FaApple className="social-icon"/> */}
                        {/* <FaGoogle className="social-icon"/> */}
                        {/* <FaGithub className="social-icon"/> */}
                    </div>

                    {action === 'Sign in' && (
                        <a href="#" className="forgot-password">forgot password?</a>
                    )}

                    {/* <div className="separator">
                        haven't got an account?
                    </div> */}

                    <div className="form-actions">
                        <div onClick={()=>{setAction("Sign in")}}>
                            {action==="Sign in"?<MainButton text='Sign in'/>:<TopActiveButtonOther text='Sign in'/>}
                        </div>
                        <div>________</div>
                        <div onClick={()=>{setAction("Sign up")}}>
                            {action==="Sign up"?<MainButton text='Sign up'/>:<TopActiveButtonOther text='Sign up'/>}
                        </div>
                    </div>
                </form>
              
            </div>
        </div>
    )
}
