// ShopMax E-commerce JavaScript

// Product Data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 199.99,
        originalPrice: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: 5,
        reviews: 124,
        badge: "Sale",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 349.99,
        originalPrice: 449.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4,
        reviews: 89,
        badge: "Hot",
        category: "Wearables"
    },
    {
        id: 3,
        name: "Minimalist Desk Lamp",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        rating: 5,
        reviews: 56,
        badge: null,
        category: "Home"
    },
    {
        id: 4,
        name: "Gaming Mechanical Keyboard",
        price: 159.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop",
        rating: 4,
        reviews: 203,
        badge: "Popular",
        category: "Gaming"
    },
    {
        id: 5,
        name: "Designer Sunglasses",
        price: 129.99,
        originalPrice: 179.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        rating: 5,
        reviews: 67,
        badge: "New",
        category: "Fashion"
    },
    {
        id: 6,
        name: "Fitness Tracker Band",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
        rating: 4,
        reviews: 156,
        badge: "Sale",
        category: "Health"
    },
    {
        id: 7,
        name: "Portable Bluetooth Speaker",
        price: 69.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        rating: 4,
        reviews: 98,
        badge: null,
        category: "Electronics"
    },
    {
        id: 8,
        name: "Leather Messenger Bag",
        price: 189.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        rating: 5,
        reviews: 45,
        badge: "Limited",
        category: "Fashion"
    }
];

// Cart State
let cart = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    productsGrid.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-3">
            <div class="card product-card h-100">
                <div class="product-image-container">
                    ${product.badge ? `<span class="badge bg-danger product-badge">${product.badge}</span>` : ''}
                    <div class="product-actions">
                        <button class="btn btn-light" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                            <i class="bi bi-heart"></i>
                        </button>
                        <button class="btn btn-light" onclick="quickView(${product.id})" title="Quick View">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </div>
                <div class="card-body">
                    <small class="text-muted">${product.category}</small>
                    <h6 class="product-title">${product.name}</h6>
                    <div class="product-rating mb-2">
                        ${renderStars(product.rating)}
                        <small class="text-muted">(${product.reviews})</small>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Star Rating
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="bi bi-star-half"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    return stars;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartUI();
    showToast(`${product.name} added to cart!`, 'success');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartUI();
        }
    }
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartCount();
    updateCartUI();
    showToast('Cart cleared!', 'info');
}

// Update Cart Count Badge
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-muted text-center py-5">Your cart is empty</p>';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartSummary.style.display = 'block';
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item d-flex gap-3">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-primary fw-bold mb-2">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

// Add to Wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    showToast(`${product.name} added to wishlist!`, 'info');
}

// Quick View
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    showToast(`Quick view for ${product.name}`, 'info');
}

// Show Toast Notification
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast-container');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-container`;
    toast.innerHTML = `
        <div class="toast show" role="alert" style="min-width: 250px;">
            <div class="toast-header bg-${type === 'success' ? 'success' : type === 'info' ? 'info' : 'danger'} text-white">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-circle'} me-2"></i>
                <strong class="me-auto">${type === 'success' ? 'Success' : type === 'info' ? 'Info' : 'Error'}</strong>
                <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.parentElement.parentElement.remove()"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Search Functionality
document.querySelector('form.d-flex').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = e.target.querySelector('input').value.toLowerCase();
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length > 0) {
        showToast(`Found ${filteredProducts.length} products!`, 'info');
    } else {
        showToast('No products found!', 'info');
    }
});

// Newsletter Subscription
document.querySelector('form:has(input[type="email"])').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        showToast('Thank you for subscribing!', 'success');
        e.target.reset();
    }
});
