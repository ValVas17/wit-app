import React, { useState, useEffect } from "react";
import './Styles.css';
import { MainButton } from "./MainButton";
import { TopActiveButton } from "./TopActiveButton";
import { TopPassButton } from "./TopPassButton";
import { SignInForm } from "./SignInForm";
import wit_img from './img/изображение.png';
import Modal from "./Modal";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";

export const Header = (props) => {
    const [modal, setModal] = useState(false);
    const { isDark } = useTheme();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    const validateToken = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            
            if (!response.ok) {
                handleLogout();
            }
        } catch (error) {
            handleLogout();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    // Загружаем данные пользователя при монтировании
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
            
            // Можно добавить проверку токена на сервере
            validateToken(token);
        }
    }, []);

    // Слушаем событие входа пользователя
    useEffect(() => {
        const handleUserLogin = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }
        };

        window.addEventListener('userLoggedIn', handleUserLogin);
        return () => window.removeEventListener('userLoggedIn', handleUserLogin);
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setModal(false);
            }
        };

        if (modal) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [modal]);


    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        document.body.className = isDark ? 'dark-theme' : 'light-theme';
    }, [isDark]);


    return (
        <header className="header-glass">
            <div className="glass-effect">
                <div className="header-content"></div>
                <div className='origin'>
                    <ul>
                        <li><img src={wit_img} className="header-logo" /></li>
                        <li className="header-padding"><TopActiveButton text='Lesson' /></li>
                        <li className="header-padding"><TopPassButton text='Lesson' /></li>
                        <li className="header-padding"><TopPassButton text='Lesson' /></li>
                        <li><ThemeToggle /></li>
                        {isAuthenticated && (
                        <li className="header-padding">
                            <div className="user-info">
                                <div className="user-avatar">👤</div>
                                <span className="user-name"> {user ? user.login : 'User Name'} </span>
                                {isAuthenticated && (
                                    <button 
                                        onClick={handleLogout}
                                        className="logout-button"
                                        title="Выйти"
                                    >
                                        <div className="user-avatar">🚪</div>
                                    </button>
                                )}
                            </div>
                        </li>
                        )}
                       

                        {!isAuthenticated && (
                            <li className="header-padding">
                                <div className='origin' onClick={toggleModal}>
                                    <div className="main-button-container">
                                        <button className="main-button-background">Sign in</button>
                                        <div className="main-button-foreground"></div>
                                    </div>
                                </div>
                            </li>
                        )}

                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className="modal-content">
                                    <SignInForm />
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}