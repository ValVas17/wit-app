import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../components/Styles.css';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setMessage('❌ Пароли не совпадают');
            return;
        }
        
        if (newPassword.length < 6) {
            setMessage('❌ Пароль должен быть минимум 6 символов');
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/password/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    token: token || searchParams.get('token'), 
                    newPassword 
                })
            });
            
            if (response.ok) {
                const data = await response.text();
                setMessage(`✅ ${data}`);

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                const error = await response.text();
                setMessage(`❌ ${error}`);
            }
        } catch (error) {
            setMessage(`❌ Ошибка сети: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="sign-in-form-wrapper">
                <form className="sign-in-form" onSubmit={handleSubmit}>
                    <div className='sign-in-name'>Создание нового пароля</div>
                    
                    {!token && (
                        <div className="input-group">
                            <input
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder=" "
                                required
                                disabled={isLoading}
                            />
                            <label>Токен из email</label>
                        </div>
                    )}
                    
                    <div className="input-group">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                        <label>Новый пароль (минимум 6 символов)</label>
                    </div>
                    
                    <div className="input-group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                        <label>Подтвердите новый пароль</label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Смена пароля...' : 'Изменить пароль'}
                    </button>
                    
                    {message && (
                        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                    
                    <div className="form-footer">
                        <p>Токен приходит на email после запроса восстановления</p>
                        <p>Если нет токена, <a href="/forgot-password">запросите его снова</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;