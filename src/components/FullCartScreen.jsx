import { useState, useMemo } from 'react';
import { categories } from '../data/itemsData';
import ItemCard from './ItemCard';
import '../styles/items.css';

function FullCartScreen({ cart, onRemove, onUpdateQuantity, onCheckout, onAddToCart }) {
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    // Get related items from categories that have items in the cart
    const relatedItems = useMemo(() => {
        if (cart.length === 0) return [];

        // Get unique category IDs from cart items
        const cartCategoryIds = [...new Set(cart.map(item => item.categoryId))];

        // Get all items from those categories, excluding items already in cart
        const cartItemIds = cart.map(item => item.id);
        const related = [];

        categories.forEach(category => {
            if (cartCategoryIds.includes(category.id)) {
                const categoryItems = category.items
                    .filter(item => !cartItemIds.includes(item.id))
                    .map(item => ({
                        ...item,
                        category: category.name,
                        categoryId: category.id,
                        categoryIcon: category.icon
                    }));
                related.push(...categoryItems);
            }
        });

        // Return up to 8 related items
        return related.slice(0, 8);
    }, [cart]);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setCheckoutSuccess(true);
        onCheckout();
        setTimeout(() => {
            setCheckoutSuccess(false);
        }, 3000);
    };

    return (
        <div className="full-cart-screen">
            <div className="full-cart-container">
                <header className="full-cart-header">
                    <h1>🛒 My Shopping Cart</h1>
                    <p className="cart-item-count">
                        {cart.length === 0
                            ? 'Your cart is empty'
                            : `${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`
                        }
                    </p>
                </header>

                {checkoutSuccess ? (
                    <div className="checkout-success-full">
                        <div className="success-icon-large">✓</div>
                        <h2>Order Placed Successfully!</h2>
                        <p>Thank you for your purchase. Your order is being processed.</p>
                    </div>
                ) : (
                    <div className="full-cart-content">
                        {/* Cart Items Section */}
                        <div className="cart-main-section">
                            {cart.length === 0 ? (
                                <div className="empty-cart-message">
                                    <div className="empty-cart-icon">🛒</div>
                                    <h3>Your cart is empty</h3>
                                    <p>Start shopping to add items to your cart!</p>
                                </div>
                            ) : (
                                <div className="cart-items-list">
                                    {cart.map(item => (
                                        <div key={item.id} className="full-cart-item">
                                            <div className="cart-item-details">
                                                <div className="cart-item-header">
                                                    <h3>{item.name}</h3>
                                                    <span className="item-category-badge">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <p className="item-description">{item.description}</p>
                                                <div className="item-price-section">
                                                    <span className="unit-price">${item.price.toFixed(2)} each</span>
                                                    <span className="item-subtotal">
                                                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="cart-item-controls">
                                                <div className="quantity-control-group">
                                                    <label>Quantity:</label>
                                                    <div className="quantity-controls-full">
                                                        <button
                                                            className="qty-btn-full"
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="qty-display">{item.quantity}</span>
                                                        <button
                                                            className="qty-btn-full"
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    className="remove-btn-full"
                                                    onClick={() => onRemove(item.id)}
                                                >
                                                    🗑️ Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order Summary Section */}
                        {cart.length > 0 && (
                            <aside className="cart-sidebar">
                                <div className="order-summary">
                                    <h3>Order Summary</h3>
                                    <div className="summary-details">
                                        <div className="summary-row">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Tax (8%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-divider"></div>
                                        <div className="summary-row total-row">
                                            <span>Total</span>
                                            <span className="total-amount">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button className="checkout-btn-full" onClick={handleCheckout}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </aside>
                        )}
                    </div>
                )}

                {/* Related Items Section */}
                {!checkoutSuccess && relatedItems.length > 0 && (
                    <section className="related-items-section">
                        <h2>You might also like</h2>
                        <p className="related-subtitle">Items from your selected categories</p>
                        <div className="related-items-grid">
                            {relatedItems.map(item => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    onAddToCart={onAddToCart}
                                    isInCart={false}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default FullCartScreen;
