import { useState, useEffect } from 'react';

function TopNav({ onMenuToggle, user, onLogout }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <nav className="top-navbar">
            <div className="top-navbar-content">
                <button
                    className="menu-toggle-btn"
                    onClick={onMenuToggle}
                    aria-label="Toggle navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <div className="top-navbar-brand">
                    <h1>Veridion</h1>
                </div>

                <div className="top-navbar-actions">
                    <button
                        className="theme-toggle-nav"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-company">{user.company}</span>
                    </div>
                    <button className="logout-btn-nav" onClick={onLogout}>
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default TopNav;
