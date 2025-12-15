import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/Styles.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setToken('');
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/password/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                const data = await response.text();
                setMessage(`✅ ${data}`);

                setToken('Токен для теста (в консоли сервера)');
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
                    <div className='sign-in-name'>Восстановление пароля</div>
                    
                    <p className="form-description">
                        Enter your email, and we will send you instructions to resent password.
                    </p>
                    
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            required
                            disabled={isLoading}
                        />
                        <label>Email</label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send instructions'}
                    </button>
                    
                    {message && (
                        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                    
                    {token && (
                        <div className="token-info">
                            <p><strong>Для теста:</strong> Токен выведен в консоль сервера</p>
                            <p>Используйте его на странице сброса пароля</p>
                        </div>
                    )}
                    
                    <div className="form-footer">
                        <Link to="/login" className="back-link">
                            ← Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;