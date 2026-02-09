import { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
    const [user, setUser] = useState(null);
    const [isLoginView, setIsLoginView] = useState(true);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleSignup = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        setIsLoginView(true);
    };

    const handleUpdatePassword = (newPassword) => {
        // Update user in state
        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);

        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    const handleUpdateEmail = (newEmail) => {
        // Update user in state
        const updatedUser = { ...user, email: newEmail };
        setUser(updatedUser);

        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].email = newEmail;
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    const switchToSignup = () => {
        setIsLoginView(false);
    };

    const switchToLogin = () => {
        setIsLoginView(true);
    };

    return (
        <>
            <ThemeToggle />
            {user ? (
                <Dashboard
                    user={user}
                    onLogout={handleLogout}
                    onUpdatePassword={handleUpdatePassword}
                    onUpdateEmail={handleUpdateEmail}
                />
            ) : isLoginView ? (
                <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
            ) : (
                <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
            )}
        </>
    );
}

export default App;
