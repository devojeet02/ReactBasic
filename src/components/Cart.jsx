import { useState } from 'react';

function Cart({ cart, onClose, onRemove, onUpdateQuantity, onCheckout }) {
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setCheckoutSuccess(true);
        onCheckout();
        setTimeout(() => {
            setCheckoutSuccess(false);
            onClose();
        }, 2000);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('cart-overlay')) {
            onClose();
        }
    };

    return (
        <div className="cart-overlay" onClick={handleOverlayClick}>
            <div className="cart-panel">
                <div className="cart-header">
                    <h2>🛒 Your Cart</h2>
                    <button className="cart-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {checkoutSuccess ? (
                    <div className="checkout-success">
                        <div className="success-icon">✓</div>
                        <h3>Order Placed!</h3>
                        <p>Thank you for your purchase.</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="cart-empty">
                                    <p>Your cart is empty</p>
                                    <span>Add some items to get started!</span>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{item.name}</h4>
                                            <span className="cart-item-category">{item.category}</span>
                                            <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="quantity-controls">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => onRemove(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="checkout-btn" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
