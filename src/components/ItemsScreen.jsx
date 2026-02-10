import { categories } from '../data/itemsData';
import CategorySection from './CategorySection';
import Cart from './Cart';
import { useState } from 'react';
import '../styles/items.css';

function ItemsScreen({ onBack, cart, onAddToCart, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
    const [showCart, setShowCart] = useState(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="items-screen">
            <header className="items-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back to Dashboard
                </button>
                <h1>Browse Items</h1>
                <button
                    className="cart-btn"
                    onClick={() => setShowCart(true)}
                >
                    🛒 Cart
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems}</span>
                    )}
                </button>
            </header>

            <main className="items-content">
                {categories.map(category => (
                    <CategorySection
                        key={category.id}
                        category={category}
                        onAddToCart={onAddToCart}
                        cartItems={cart}
                    />
                ))}
            </main>

            {showCart && (
                <Cart
                    cart={cart}
                    onClose={() => setShowCart(false)}
                    onRemove={onRemoveFromCart}
                    onUpdateQuantity={onUpdateQuantity}
                    onCheckout={onCheckout}
                />
            )}
        </div>
    );
}

export default ItemsScreen;
