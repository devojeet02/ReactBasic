// Items data with 4 categories, 5 items each

export const categories = [
    {
        id: 'electronics',
        name: 'Electronics',
        icon: '💻',
        items: [
            { id: 'e1', name: 'Wireless Headphones', price: 79.99, description: 'Noise-cancelling over-ear headphones with 30hr battery' },
            { id: 'e2', name: 'Smart Watch', price: 199.99, description: 'Fitness tracking, heart rate monitor, GPS enabled' },
            { id: 'e3', name: 'Portable Speaker', price: 49.99, description: 'Waterproof Bluetooth speaker with 12hr playtime' },
            { id: 'e4', name: 'Tablet Stand', price: 29.99, description: 'Adjustable aluminum stand for tablets and phones' },
            { id: 'e5', name: 'USB-C Hub', price: 59.99, description: '7-in-1 hub with HDMI, USB-A, SD card reader' }
        ]
    },
    {
        id: 'furniture',
        name: 'Furniture',
        icon: '🪑',
        items: [
            { id: 'f1', name: 'Ergonomic Office Chair', price: 299.99, description: 'Lumbar support, adjustable armrests, mesh back' },
            { id: 'f2', name: 'Standing Desk', price: 449.99, description: 'Electric height adjustable, 60" wide surface' },
            { id: 'f3', name: 'Bookshelf', price: 129.99, description: '5-tier wooden bookshelf, modern design' },
            { id: 'f4', name: 'Coffee Table', price: 179.99, description: 'Minimalist glass top with wooden legs' },
            { id: 'f5', name: 'Floor Lamp', price: 89.99, description: 'LED floor lamp with adjustable brightness' }
        ]
    },
    {
        id: 'kitchen',
        name: 'Kitchen and Home',
        icon: '🍳',
        items: [
            { id: 'k1', name: 'Air Fryer', price: 119.99, description: '5.8 Qt capacity, digital touch screen, 8 presets' },
            { id: 'k2', name: 'Coffee Maker', price: 89.99, description: '12-cup programmable with thermal carafe' },
            { id: 'k3', name: 'Knife Set', price: 69.99, description: '15-piece stainless steel set with wooden block' },
            { id: 'k4', name: 'Blender', price: 59.99, description: 'High-speed blender with 64oz pitcher' },
            { id: 'k5', name: 'Cookware Set', price: 149.99, description: '10-piece non-stick ceramic coated set' }
        ]
    },
    {
        id: 'clothing',
        name: 'Clothing',
        icon: '👕',
        items: [
            { id: 'c1', name: 'Cotton T-Shirt', price: 24.99, description: 'Premium soft cotton, available in multiple colors' },
            { id: 'c2', name: 'Denim Jeans', price: 59.99, description: 'Classic fit, stretch denim, dark wash' },
            { id: 'c3', name: 'Hoodie', price: 44.99, description: 'Fleece-lined pullover with kangaroo pocket' },
            { id: 'c4', name: 'Running Shoes', price: 89.99, description: 'Lightweight mesh, cushioned sole' },
            { id: 'c5', name: 'Winter Jacket', price: 129.99, description: 'Water-resistant, insulated, hooded' }
        ]
    }
];

export const getAllItems = () => {
    return categories.flatMap(cat =>
        cat.items.map(item => ({ ...item, category: cat.name, categoryId: cat.id }))
    );
};
