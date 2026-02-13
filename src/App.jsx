import { useState, useEffect } from 'react';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ItemsScreen from './components/ItemsScreen';
import SideNav from './components/SideNav';
import FullCartScreen from './components/FullCartScreen';
import TopNav from './components/TopNav';
import Settings from './components/Settings';

function App() {
    const [user, setUser] = useState(null);
    const [isLoginView, setIsLoginView] = useState(true);
    const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'items', or 'cart'
    const [cart, setCart] = useState([]);
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    // Calculate total cart items for badge
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (isAuthenticated) {
            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
                const account = accounts[0];
                const msalUser = {
                    username: account.username,
                    name: account.name,
                    email: account.username, // mapping username to email as fallback
                    password: '' // MSAL users don't have a local password
                };
                setUser(msalUser);
                setCurrentScreen('dashboard');
            }
        }
    }, [isAuthenticated, instance]);

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentScreen('dashboard');
    };

    const handleSignup = (userData) => {
        setUser(userData);
        setCurrentScreen('dashboard');
    };

    const handleLogout = () => {
        if (isAuthenticated) {
            instance.logoutPopup().catch(e => {
                console.error(e);
            });
        }
        setUser(null);
        setIsLoginView(true);
        setCart([]);
        setCurrentScreen('dashboard');
        setIsSideNavExpanded(false);
    };

    const toggleSideNav = () => {
        setIsSideNavExpanded(!isSideNavExpanded);
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

    const handleUpdateUser = (updatedUserData) => {
        setUser(updatedUserData);
        // Sync with localStorage for local users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedUserData };
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
            {!user ? (
                <>
                    <ThemeToggle />
                    {isLoginView ? (
                        <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
                    ) : (
                        <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
                    )}
                </>
            ) : (
                <>
                    <TopNav
                        onMenuToggle={toggleSideNav}
                        user={user}
                        onLogout={handleLogout}
                        onNavigate={setCurrentScreen}
                    />
                    <SideNav
                        currentScreen={currentScreen}
                        onNavigate={setCurrentScreen}
                        cartItemCount={totalCartItems}
                        isExpanded={isSideNavExpanded}
                        onToggle={toggleSideNav}
                        onLogout={handleLogout}
                    />
                    <div className="main-content">
                        {currentScreen === 'dashboard' ? (
                            <Dashboard
                                user={user}
                                onUpdatePassword={handleUpdatePassword}
                                onUpdateEmail={handleUpdateEmail}
                                onNavigateToItems={() => setCurrentScreen('items')}
                            />
                        ) : currentScreen === 'items' ? (
                            <ItemsScreen
                                onBack={() => setCurrentScreen('dashboard')}
                                cart={cart}
                                onAddToCart={addToCart}
                                onRemoveFromCart={removeFromCart}
                                onUpdateQuantity={updateQuantity}
                                onCheckout={handleCheckout}
                            />
                        ) : currentScreen === 'cart' ? (
                            <FullCartScreen
                                cart={cart}
                                onRemove={removeFromCart}
                                onUpdateQuantity={updateQuantity}
                                onCheckout={handleCheckout}
                                onAddToCart={addToCart}
                            />
                        ) : (
                            <Settings
                                user={user}
                                onUpdateUser={handleUpdateUser}
                                onBack={() => setCurrentScreen('dashboard')}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default App;
