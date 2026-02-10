import { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ItemsScreen from './components/ItemsScreen';

function App() {
    const [user, setUser] = useState(null);
    const [isLoginView, setIsLoginView] = useState(true);
    const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' or 'items'
    const [cart, setCart] = useState([]);

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentScreen('dashboard');
    };

    const handleSignup = (userData) => {
        setUser(userData);
        setCurrentScreen('dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        setIsLoginView(true);
        setCart([]);
        setCurrentScreen('dashboard');
    };

    const handleUpdatePassword = (newPassword) => {
        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    const handleUpdateEmail = (newEmail) => {
        const updatedUser = { ...user, email: newEmail };
        setUser(updatedUser);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].email = newEmail;
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    // Cart Handlers
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleCheckout = () => {
        // Here you would typically send the order to a server
        console.log('Checking out with items:', cart);
        // Clear cart after checkout
        setTimeout(() => {
            setCart([]);
        }, 2000);
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
            {!user ? (
                isLoginView ? (
                    <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
                ) : (
                    <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
                )
            ) : currentScreen === 'dashboard' ? (
                <Dashboard
                    user={user}
                    onLogout={handleLogout}
                    onUpdatePassword={handleUpdatePassword}
                    onUpdateEmail={handleUpdateEmail}
                    onNavigateToItems={() => setCurrentScreen('items')}
                />
            ) : (
                <ItemsScreen
                    onBack={() => setCurrentScreen('dashboard')}
                    cart={cart}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    onCheckout={handleCheckout}
                />
            )}
        </>
    );
}

export default App;
