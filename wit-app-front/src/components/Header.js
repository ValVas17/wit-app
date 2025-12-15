import React, { useState, useEffect } from "react";
import './Styles.css';
import { TopActiveButton } from "./TopActiveButton";
import { TopPassButton } from "./TopPassButton";
import { SignInForm } from "./SignInForm";
import wit_img from './img/изображение.png';
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import { Link } from 'react-router-dom';

export const Header = (props) => {
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isDark } = useTheme();

    // Загружаем данные пользователя
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
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

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
    };

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

    useEffect(() => {
        document.body.className = isDark ? 'dark-theme' : 'light-theme';
    }, [isDark]);

    return (
        <header className="header-glass">
            <div className="glass-effect">
                <div className="header-content"></div>
                <div className='origin'>
                    <ul>
                        {/* Логотип с ссылкой на главную */}
                        <li>
                            <Link to="/">
                                <img src={wit_img} className="header-logo" alt="Wit Logo" />
                            </Link>
                        </li>
                        
                        {/* Навигационные кнопки */}
                        <li className="header-padding">
                            <Link to="/lessons">
                                <TopActiveButton text='Lessons' />
                            </Link>
                        </li>
                        <li className="header-padding">
                            <Link to="/progress">
                                <TopPassButton text='Progress' />
                            </Link>
                        </li>
                        <li className="header-padding">
                            <Link to="/profile">
                                <TopPassButton text='Profile' />
                            </Link>
                        </li>
                        
                        {/* Переключатель темы */}
                        <li><ThemeToggle /></li>
                        
                        {isAuthenticated && (
                            <li className="header-padding">
                                <div className="user-info">
                                    <div className="user-avatar">👤</div>
                                    <span className="user-name">
                                        {user ? user.login : 'Guest'}
                                    </span>
                                    {isAuthenticated && (
                                        <button 
                                            onClick={handleLogout}
                                            className="logout-button"
                                            title="Выйти"
                                        >
                                            🚪
                                        </button>
                                    )}
                                </div>
                            </li>
                        )}
                        
                        {/* Кнопка входа/регистрации (модальное окно) */}
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
                    </ul>
                    
                    {modal && (
                        <div className="modal">
                            <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                <SignInForm onClose={() => setModal(false)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;