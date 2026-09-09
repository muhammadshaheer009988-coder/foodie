// Default Menu Items
let menuItems = [
    { id: 1, name: 'Zinger Burger Deluxe', category: 'Fast Food', price: 550, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 2, name: 'Special Chicken Biryani', category: 'Desi', price: 380, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
    { id: 3, name: 'Smoky BBQ Seekh Kebab', category: 'BBQ', price: 750, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
    { id: 4, name: 'Chilled Soft Drink', category: 'Drinks', price: 120, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' }
];

let cart = [];
let totalOrders = 0;
let totalRevenue = 0;

// Render Menu
function renderMenu(items) {
    const container = document.getElementById('menu-container');
    if (!container) return;
    container.innerHTML = '';

    items.forEach(item => {
        container.innerHTML += `
            <div class="food-card">
                <img src="${item.img}" alt="${item.name}">
                <div class="food-card-details">
                    <h3>${item.name}</h3>
                    <p class="price">Rs. ${item.price}</p>
                    <button class="btn-primary" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-plus"></i> Add To Cart</button>
                </div>
            </div>
        `;
    });
}

// Category Filter
function filterMenu(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    if (category === 'All') {
        renderMenu(menuItems);
    } else {
        renderMenu(menuItems.filter(item => item.category === category));
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

// Add To Cart
function addToCart(itemId) {
    const item = menuItems.find(p => p.id === itemId);
    const cartItem = cart.find(p => p.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    container.innerHTML = '';
    let total = 0, count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price} x ${item.quantity}</p>
                </div>
                <button class="btn-primary" onclick="removeFromCart(${item.id})" style="padding: 4px 10px; font-size:12px;">X</button>
            </div>
        `;
    });

    document.getElementById('cart-total').innerText = total;
    document.getElementById('cart-count').innerText = count;
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Checkout & Live Tracking
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalRevenue += orderTotal;
    totalOrders++;

    document.getElementById('total-orders-count').innerText = totalOrders;
    document.getElementById('total-revenue-count').innerText = `Rs. ${totalRevenue}`;

    alert("Order Placed Successfully!");
    cart = [];
    updateCartUI();
    toggleCart();

    startOrderTrackingSimulation();
}

function startOrderTrackingSimulation() {
    const trackingSection = document.getElementById('tracking-section');
    trackingSection.classList.remove('hidden');
    trackingSection.scrollIntoView({ behavior: 'smooth' });

    let step = 1;
    [1, 2, 3, 4].forEach(s => document.getElementById(`step-${s}`).classList.remove('active'));
    document.getElementById('step-1').classList.add('active');

    const interval = setInterval(() => {
        step++;
        if (step <= 4) {
            document.getElementById(`step-${step}`).classList.add('active');
        } else {
            clearInterval(interval);
        }
    }, 3500);
}

// Admin Add Product
function addMenuItem(e) {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const category = document.getElementById('item-category').value;
    const price = parseInt(document.getElementById('item-price').value);
    const img = document.getElementById('item-img').value;

    menuItems.push({ id: menuItems.length + 1, name, category, price, img });
    renderMenu(menuItems);
    document.getElementById('add-menu-form').reset();
    alert('Item added successfully!');
}

// Login Modal Controls
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

function handleAuth(e) {
    e.preventDefault();
    alert('Logged in successfully!');
    closeAuthModal();
}

window.onload = () => renderMenu(menuItems);