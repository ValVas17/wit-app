import React, { useState } from 'react';
import './Styles.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: запрос email, 2: ввод нового пароля
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/password/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const data = await response.text();
            setMessage(`✅ ${data}`);
            setStep(2);
        } catch (error) {
            setMessage(`❌ Ошибка: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/password/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            
            const data = await response.text();
            setMessage(`✅ ${data}`);
            
            // Перенаправляем на страницу входа
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            setMessage(`❌ Ошибка: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Восстановление пароля</h2>
            
            {step === 1 ? (
                <form onSubmit={handleRequestReset}>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите ваш email"
                            required
                            disabled={isLoading}
                        />
                        <label>Email</label>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Введите токен из email"
                            required
                            disabled={isLoading}
                        />
                        <label>Токен</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Новый пароль"
                            required
                            disabled={isLoading}
                            minLength="6"
                        />
                        <label>Новый пароль</label>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Смена пароля...' : 'Изменить пароль'}
                    </button>
                </form>
            )}
            
            {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ResetPassword;