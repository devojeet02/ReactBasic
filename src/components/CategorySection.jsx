import ItemCard from './ItemCard';

function CategorySection({ category, onAddToCart, cartItems }) {
    const isItemInCart = (itemId) => {
        return cartItems.some(cartItem => cartItem.id === itemId);
    };

    return (
        <div className="category-section">
            <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2 className="category-name">{category.name}</h2>
                <span className="category-count">{category.items.length} items</span>
            </div>
            <div className="items-grid">
                {category.items.map(item => (
                    <ItemCard
                        key={item.id}
                        item={{ ...item, category: category.name, categoryId: category.id }}
                        onAddToCart={onAddToCart}
                        isInCart={isItemInCart(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategorySection;
