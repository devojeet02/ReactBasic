import { useState, useEffect } from 'react';
import '../styles/Settings.css';

function Settings({ user, onUpdateUser, onBack }) {
    const [activeSection, setActiveSection] = useState('profile');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: user?.company || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [preferences, setPreferences] = useState({
        notifications: true,
        newsletter: false,
        publicProfile: true
    });

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreferenceChange = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        onUpdateUser({
            ...user,
            name: formData.name,
            email: formData.email,
            company: formData.company
        });
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        // In a real app, you'd verify currentPassword here
        onUpdateUser({ ...user, password: formData.newPassword });
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    };

    const renderProfile = () => (
        <div className="settings-section">
            <h2 className="settings-section-title">Personal Details</h2>
            <form className="settings-form" onSubmit={handleSaveProfile}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                        />
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Company name"
                        />
                    </div>
                </div>
                <div className="settings-actions">
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );

    const renderSecurity = () => (
        <div className="settings-section">
            <h2 className="settings-section-title">Security & Password</h2>
            <form className="settings-form" onSubmit={handleUpdatePassword}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Min. 8 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm password"
                        />
                    </div>
                </div>
                <div className="settings-actions">
                    <button type="submit" className="save-btn">Update Password</button>
                </div>
            </form>
        </div>
    );

    const renderPreferences = () => (
        <div className="settings-section">
            <h2 className="settings-section-title">Account Preferences</h2>
            <div className="settings-form">
                <div className="preference-item">
                    <div className="preference-info">
                        <h4>Email Notifications</h4>
                        <p>Receive updates about your account activity.</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={preferences.notifications}
                            onChange={() => handlePreferenceChange('notifications')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="preference-item">
                    <div className="preference-info">
                        <h4>Weekly Newsletter</h4>
                        <p>Stay informed with the latest industry news.</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={preferences.newsletter}
                            onChange={() => handlePreferenceChange('newsletter')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="preference-item">
                    <div className="preference-info">
                        <h4>Public Profile</h4>
                        <p>Allow others to see your business details.</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={preferences.publicProfile}
                            onChange={() => handlePreferenceChange('publicProfile')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="settings-actions">
                    <button className="save-btn" onClick={() => setMessage({ type: 'success', text: 'Preferences saved!' })}>
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="settings-container">
            <header className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account settings and preferences</p>
            </header>

            <div className="settings-grid">
                <nav className="settings-nav">
                    <button
                        className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveSection('profile')}
                    >
                        <span className="settings-nav-icon">👤</span>
                        Profile Details
                    </button>
                    <button
                        className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveSection('security')}
                    >
                        <span className="settings-nav-icon">🔒</span>
                        Security
                    </button>
                    <button
                        className={`settings-nav-item ${activeSection === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveSection('preferences')}
                    >
                        <span className="settings-nav-icon">⚙️</span>
                        Preferences
                    </button>
                    <button className="settings-nav-item" onClick={onBack} style={{ marginTop: 'auto' }}>
                        <span className="settings-nav-icon">⬅️</span>
                        Back to Home
                    </button>
                </nav>

                <main className="settings-content">
                    {message.text && (
                        <div className={`settings-message ${message.type}`}>
                            {message.type === 'success' ? '✅' : '❌'} {message.text}
                        </div>
                    )}
                    <div className="settings-content-card">
                        {activeSection === 'profile' && renderProfile()}
                        {activeSection === 'security' && renderSecurity()}
                        {activeSection === 'preferences' && renderPreferences()}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Settings;
