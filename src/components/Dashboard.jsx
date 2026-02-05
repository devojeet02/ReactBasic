function Dashboard({ user, onLogout }) {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button className="logout-btn" onClick={onLogout}>
                    Sign Out
                </button>
            </header>

            <main className="dashboard-content">
                <div className="welcome-card">
                    <div className="welcome-icon">👋</div>
                    <h2>Hello, {user.name}!</h2>
                    <p>
                        Welcome to your dashboard. You've successfully logged in.
                        This is a great starting point for your React learning journey!
                    </p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📚</div>
                        <h3>12</h3>
                        <p>Lessons Completed</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <h3>85%</h3>
                        <p>Progress</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <h3>24</h3>
                        <p>Achievements</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <h3>7</h3>
                        <p>Day Streak</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
