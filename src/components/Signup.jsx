import { useState } from 'react';

const MAX_LENGTH = 100;

function Signup({ onSignup, onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        company: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Check if field exceeds max length
    const isOverLimit = (value) => value.length > MAX_LENGTH;

    // Check if any field is over limit
    const hasAnyOverLimit = () => {
        return Object.values(formData).some(value => isOverLimit(value));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check max length validation
        if (hasAnyOverLimit()) {
            setError('Field values must not exceed 100 characters');
            return;
        }

        // Validation
        if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.company) {
            setError('Please fill in all required fields');
            return;
        }

        // Email validation
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setError('Please enter a valid email address');
            return;
        }

        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        // Simulate API call and save to localStorage
        setTimeout(() => {
            const userData = {
                name: formData.name,
                email: formData.email,
                username: formData.username,
                password: formData.password,
                company: formData.company
            };

            // Save user to localStorage (simulating database)
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check if username already exists
            if (users.find(u => u.username === formData.username)) {
                setError('Username already exists');
                setIsLoading(false);
                return;
            }

            // Check if email already exists
            if (users.find(u => u.email === formData.email)) {
                setError('Email already exists');
                setIsLoading(false);
                return;
            }

            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            setIsLoading(false);
            onSignup(userData);
        }, 1000);
    };

    return (
        <div className="login-container">
            <div className="login-card signup-card">
                <div className="login-header">
                    <h1>Create Account</h1>
                    <p>Sign up to get started</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className={`form-group ${isOverLimit(formData.name) ? 'field-error' : ''}`}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            maxLength={101}
                        />
                        {isOverLimit(formData.name) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    <div className={`form-group ${isOverLimit(formData.email) ? 'field-error' : ''}`}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            autoComplete="email"
                            maxLength={101}
                        />
                        {isOverLimit(formData.email) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    <div className={`form-group ${isOverLimit(formData.username) ? 'field-error' : ''}`}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            autoComplete="username"
                            maxLength={101}
                        />
                        {isOverLimit(formData.username) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    <div className={`form-group ${isOverLimit(formData.company) ? 'field-error' : ''}`}>
                        <label htmlFor="company">Company / Organization</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Enter your company name"
                            autoComplete="organization"
                            maxLength={101}
                        />
                        {isOverLimit(formData.company) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    <div className={`form-group ${isOverLimit(formData.password) ? 'field-error' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            maxLength={101}
                        />
                        {isOverLimit(formData.password) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    <div className={`form-group ${isOverLimit(formData.confirmPassword) ? 'field-error' : ''}`}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            maxLength={101}
                        />
                        {isOverLimit(formData.confirmPassword) && (
                            <span className="field-error-text">Maximum 100 characters allowed</span>
                        )}
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading || hasAnyOverLimit()}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-switch">
                    <p>Already have an account?</p>
                    <button
                        type="button"
                        className="switch-btn"
                        onClick={onSwitchToLogin}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
