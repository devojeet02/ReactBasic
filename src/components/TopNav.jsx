function TopNav({ onMenuToggle, user, onLogout }) {
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
