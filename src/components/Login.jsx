import { useState, useEffect, useRef } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/auth-config";

const MAX_LENGTH = 100;

function Login({ onLogin, onSwitchToSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { instance } = useMsal();
    const cardRef = useRef(null);

    // Reset error when clicking outside the card
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setError('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check if field exceeds max length
    const isOverLimit = (value) => value.length > MAX_LENGTH;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check max length validation
        if (isOverLimit(username) || isOverLimit(password)) {
            setError('Field values must not exceed 100 characters');
            return;
        }

        // Basic validation
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        // Check user in localStorage
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                setIsLoading(false);
                onLogin(user);
            } else {
                setIsLoading(false);
                setError('Invalid username or password');
            }
        }, 1000);
    };

    const handleMsalLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            setError(e.message);
        });
    };

    return (
        <div className="login-container">
            <div className="login-card" ref={cardRef}>
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue to your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className={`form-group ${isOverLimit(username) ? 'field-error' : ''}`}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            autoComplete="username"
                            maxLength={101}
                        />
                        {isOverLimit(username) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    <div className={`form-group ${isOverLimit(password) ? 'field-error' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            maxLength={101}
                        />
                        {isOverLimit(password) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading || isOverLimit(username) || isOverLimit(password)}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button
                        type="button"
                        className="msal-btn"
                        onClick={handleMsalLogin}
                    >
                        <svg className="msal-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                            <title>MS-SymbolLockup</title>
                            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                        </svg>
                        <span>Sign in with Microsoft</span>
                    </button>
                </form>

                <div className="auth-switch">
                    <p>Don't have an account?</p>
                    <button
                        type="button"
                        className="switch-btn"
                        onClick={onSwitchToSignup}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
