function ItemCard({ item, onAddToCart, isInCart }) {
    return (
        <div className="item-card">
            <div className="item-card-header">
                <h3 className="item-name">{item.name}</h3>
                <span className="item-price">${item.price.toFixed(2)}</span>
            </div>
            <p className="item-description">{item.description}</p>
            <button
                className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
                onClick={() => onAddToCart(item)}
            >
                {isInCart ? '✓ In Cart' : 'Add to Cart'}
            </button>
        </div>
    );
}

export default ItemCard;
