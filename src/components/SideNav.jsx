function SideNav({ currentScreen, onNavigate, cartItemCount, isExpanded, onToggle, onLogout }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'items', label: 'Browse Items', icon: '🛍️' },
        { id: 'cart', label: 'My Cart', icon: '🛒', badge: cartItemCount }
    ];

    return (
        <>
            <nav className={`sidenav ${isExpanded ? 'expanded' : ''}`}>
                <div className="sidenav-header">
                    <h3>Navigation</h3>
                    <button
                        className="sidenav-close-btn"
                        onClick={onToggle}
                        aria-label="Close navigation menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="sidenav-content">
                    <ul className="sidenav-list">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <button
                                    className={`sidenav-item ${currentScreen === item.id ? 'active' : ''}`}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        onToggle();
                                    }}
                                >
                                    <span className="sidenav-icon">{item.icon}</span>
                                    <span className="sidenav-label">{item.label}</span>
                                    {item.badge > 0 && (
                                        <span className="sidenav-badge">{item.badge}</span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sidenav-footer">
                    <button className="sidenav-item logout-vibrant" onClick={onLogout}>
                        <span className="sidenav-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </span>
                        <span className="sidenav-label">Sign Out</span>
                    </button>
                </div>
            </nav>

            {isExpanded && (
                <div
                    className="sidenav-overlay"
                    onClick={onToggle}
                />
            )}
        </>
    );
}

export default SideNav;
