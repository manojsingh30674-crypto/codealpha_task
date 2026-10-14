// Mock Product Catalog Data
const products = [
    { id: 1, name: "Premium Wireless Headphones", price: 99.99, image: "https://unsplash.com" },
    { id: 2, name: "Minimalist Leather Watch", price: 149.50, image: "https://unsplash.com" },
    { id: 3, name: "Mechanical Gaming Keyboard", price: 79.99, image: "https://unsplash.com" },
    { id: 4, name: "Ergonomic Office Chair", price: 199.00, image: "https://unsplash.com" },
    { id: 5, name: "Smart Fitness Watch", price: 120.00, image: "https://unsplash.com" },
    { id: 6, name: "Waterproof Travel Backpack", price: 55.00, image: "https://unsplash.com" }
];

// Application State
let cart = [];

// DOM Element Targets
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// 1. Initialize Application & Render Products
function initStore() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// 2. Cart Open/Close Event Listeners
cartToggle.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

// 3. Cart Action Functions
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

// 4. Interface Updates
function updateCartUI() {
    // Render dynamic items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} &times; ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    // Calculate totals
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Apply values to UI elements
    cartCount.innerText = totalCount;
    cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
}

// Fire application initialization
initStore();
