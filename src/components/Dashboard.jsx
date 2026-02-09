import { useState, useEffect } from 'react';

const MAX_LENGTH = 100;

function Dashboard({ user, onLogout, onUpdatePassword, onUpdateEmail }) {
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [email, setEmail] = useState(user.email || '');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    // Check if email is missing (needs to be added)
    const isEmailMissing = !user.email;

    // Check if field exceeds max length
    const isOverLimit = (value) => value.length > MAX_LENGTH;

    // Check if any password field is over limit
    const hasAnyOverLimit = () => {
        return Object.values(passwords).some(value => isOverLimit(value)) || isOverLimit(email);
    };

    // Update local email state when user prop changes
    useEffect(() => {
        setEmail(user.email || '');
    }, [user.email]);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        // Check max length validation
        if (hasAnyOverLimit()) {
            setPasswordError('Field values must not exceed 100 characters');
            return;
        }

        // If email is missing, validate and save it
        if (isEmailMissing) {
            if (!email) {
                setPasswordError('Please enter your email address');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                setPasswordError('Please enter a valid email address');
                return;
            }
            // Save email
            onUpdateEmail(email);
        }

        if (passwords.currentPassword !== user.password) {
            setPasswordError('Current password is incorrect');
            return;
        }

        if (passwords.newPassword.length < 3) {
            setPasswordError('New password must be at least 3 characters');
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        // Update password
        onUpdatePassword(passwords.newPassword);
        setPasswordSuccess('Password updated successfully!');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

        setTimeout(() => {
            setShowEditPassword(false);
            setPasswordSuccess('');
        }, 2000);
    };

    const closeModal = () => {
        setShowEditPassword(false);
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setEmail(user.email || '');
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-info">
                    <h1>Dashboard</h1>
                    <span className="company-badge">{user.company}</span>
                </div>
                <button className="logout-btn" onClick={onLogout}>
                    Sign Out
                </button>
            </header>

            <main className="dashboard-content">
                <div className="welcome-card">
                    <div className="welcome-icon"></div>
                    <h2>Hello, {user.name}!</h2>
                    <p className="company-text">
                        Welcome to <strong>{user.company}</strong>'s dashboard.
                        You've successfully logged in as <strong>@{user.email}</strong>.
                    </p>
                    <button
                        className="edit-password-btn"
                        onClick={() => setShowEditPassword(true)}
                    >
                        🔐 Change Password
                    </button>
                </div>

                {/* Password Edit Modal */}
                {showEditPassword && (
                    <div className="modal-overlay" onClick={handleOverlayClick}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Change Password</h3>
                                <button className="modal-close" onClick={closeModal}>
                                    &times;
                                </button>
                            </div>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className={`form-group ${isOverLimit(email) ? 'field-error' : ''}`}>
                                    <label htmlFor="modalEmail">
                                        Email Address
                                        {isEmailMissing && <span className="required-badge">Required</span>}
                                    </label>
                                    <input
                                        type="email"
                                        id="modalEmail"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder={isEmailMissing ? "Enter your email address" : ""}
                                        className={isEmailMissing ? '' : 'readonly-input'}
                                        readOnly={!isEmailMissing}
                                        maxLength={101}
                                    />
                                    {isOverLimit(email) && (
                                        <span className="field-error-text">Maximum 100 characters allowed</span>
                                    )}
                                    {isEmailMissing && (
                                        <span className="field-hint">Email is required to update your password</span>
                                    )}
                                </div>
                                <div className={`form-group ${isOverLimit(passwords.currentPassword) ? 'field-error' : ''}`}>
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={passwords.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter current password"
                                        maxLength={101}
                                    />
                                    {isOverLimit(passwords.currentPassword) && (
                                        <span className="field-error-text">Maximum 100 characters allowed</span>
                                    )}
                                </div>
                                <div className={`form-group ${isOverLimit(passwords.newPassword) ? 'field-error' : ''}`}>
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        maxLength={101}
                                    />
                                    {isOverLimit(passwords.newPassword) && (
                                        <span className="field-error-text">Maximum 100 characters allowed</span>
                                    )}
                                </div>
                                <div className={`form-group ${isOverLimit(passwords.confirmPassword) ? 'field-error' : ''}`}>
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        maxLength={101}
                                    />
                                    {isOverLimit(passwords.confirmPassword) && (
                                        <span className="field-error-text">Maximum 100 characters allowed</span>
                                    )}
                                </div>
                                {passwordError && <div className="error-message">{passwordError}</div>}
                                {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                                <div className="modal-actions">
                                    <button type="button" className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit-btn" disabled={hasAnyOverLimit()}>
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <h3>12</h3>
                        <p>Lessons Completed</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <h3>85%</h3>
                        <p>Progress</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <h3>24</h3>
                        <p>Achievements</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"></div>
                        <h3>7</h3>
                        <p>Day Streak</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
