import { useState } from 'react';

function Dashboard({ user, onLogout, onUpdatePassword }) {
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwords.currentPassword !== user.password) {
            setPasswordError('Current password is incorrect');
            return;
        }

        if (passwords.newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters');
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
                        You've successfully logged in as <strong>@{user.username}</strong>.
                    </p>
                    <button
                        className="edit-password-btn"
                        onClick={() => setShowEditPassword(!showEditPassword)}
                    >
                        {showEditPassword ? 'Cancel' : '🔐 Change Password'}
                    </button>
                </div>

                {showEditPassword && (
                    <div className="password-edit-card">
                        <h3>Change Password</h3>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwords.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            {passwordError && <div className="error-message">{passwordError}</div>}
                            {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                            <button type="submit" className="submit-btn">
                                Update Password
                            </button>
                        </form>
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
