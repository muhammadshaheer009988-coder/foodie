// Default Menu Items (LocalStorage se load honge agar saved hon)
let defaultItems = [
    { id: 1, name: 'Zinger Burger Deluxe', category: 'Fast Food', price: 550, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 2, name: 'Special Chicken Biryani', category: 'Desi', price: 380, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
    { id: 3, name: 'Smoky BBQ Seekh Kebab', category: 'BBQ', price: 750, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
    { id: 4, name: 'Chilled Soft Drink', category: 'Drinks', price: 120, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' }
];

let menuItems = JSON.parse(localStorage.getItem('foodieMenuItems')) || defaultItems;

// Local Storage se Cart aur Orders History load karein
let cart = JSON.parse(localStorage.getItem('foodieCart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('foodieOrderHistory')) || [];
let totalOrders = localStorage.getItem('totalOrders') ? parseInt(localStorage.getItem('totalOrders')) : 0;
let totalRevenue = localStorage.getItem('totalRevenue') ? parseInt(localStorage.getItem('totalRevenue')) : 0;

// Current Auth Mode
let currentAuthMode = 'login';

// Discount Tracker Variable
let discountAmount = 0;

// Save Menu Items to Local Storage
function saveMenuItemsToStorage() {
    localStorage.setItem('foodieMenuItems', JSON.stringify(menuItems));
}

// Render Menu
function renderMenu(items) {
    const container = document.getElementById('menu-container');
    if (!container) return;
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a0aec0; font-size: 18px;">Koi item nahi mila.</p>`;
        return;
    }

    items.forEach(item => {
        container.innerHTML += `
            <div class="food-card">
                <img src="${item.img}" alt="${item.name}">
                <div class="food-card-details">
                    <h3>${item.name}</h3>
                    <p class="price">Rs. ${item.price}</p>
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        <button class="btn-primary" style="flex: 1;" onclick="addToCart(${item.id})">
                            <i class="fa-solid fa-cart-plus"></i> Add To Cart
                        </button>
                        <button onclick="deleteMenuItem(${item.id})" style="background: #ff4757; color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer;" title="Delete Item from Menu">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Search Menu Functionality
function searchMenu() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    renderMenu(filteredItems);
}

// Category Filter
function filterMenu(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Set active button safely
    const clickedBtn = Array.from(buttons).find(btn => btn.textContent.includes(category) || (category === 'All' && btn.textContent.includes('All')));
    if (clickedBtn) clickedBtn.classList.add('active');

    if (category === 'All') {
        renderMenu(menuItems);
    } else {
        renderMenu(menuItems.filter(item => item.category === category));
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

// Save Cart to LocalStorage
function saveCartToStorage() {
    localStorage.setItem('foodieCart', JSON.stringify(cart));
}

// Add To Cart
function addToCart(itemId) {
    const item = menuItems.find(p => p.id === itemId);
    if (!item) return;

    const cartItem = cart.find(p => p.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    saveCartToStorage();
    updateCartUI();
    alert(`${item.name} Cart mein add ho gaya hai!`);
}

// Quantity Adjustments (+ / -)
function updateQuantity(itemId, change) {
    const cartItem = cart.find(p => p.id === itemId);
    if (!cartItem) return;

    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
        cart = cart.filter(p => p.id !== itemId);
    }

    saveCartToStorage();
    updateCartUI();
}

// Apply Promo Code Function
function applyCoupon() {
    const codeInput = document.getElementById('coupon-code');
    const msgEl = document.getElementById('discount-msg');
    if (!codeInput) return;

    const code = codeInput.value.trim().toUpperCase();

    if (code === 'FOODIE50') {
        discountAmount = 100; // Rs. 100 Flat Discount
        if (msgEl) {
            msgEl.style.color = '#2ed573';
            msgEl.innerText = 'Promo code applied! Rs. 100 Discount Added 🎉';
        }
    } else if (code === '') {
        alert('Pehle promo code enter karein.');
    } else {
        discountAmount = 0;
        if (msgEl) {
            msgEl.style.color = '#ff4757';
            msgEl.innerText = 'Invalid Promo Code! (Try: FOODIE50)';
        }
    }

    updateCartUI();
}

// Update Cart UI & Total Calculation
function updateCartUI() {
    const container = document.getElementById('cart-items');
    let total = 0, count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
    });

    let finalTotal = total - discountAmount;
    if (finalTotal < 0) finalTotal = 0;

    if (container) {
        container.innerHTML = '';
        if (cart.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: #a0aec0; margin-top: 20px;">Aap ka cart khali hai.</p>`;
        } else {
            cart.forEach(item => {
                container.innerHTML += `
                    <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
                        <div>
                            <h4 style="margin: 0; font-size: 15px;">${item.name}</h4>
                            <p style="margin: 4px 0 0 0; color: #666; font-size: 13px;">Rs. ${item.price} x ${item.quantity}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <button onclick="updateQuantity(${item.id}, -1)" style="padding: 2px 8px; cursor: pointer;">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" style="padding: 2px 8px; cursor: pointer;">+</button>
                            <button onclick="removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; padding: 4px 8px; border-radius: 4px; margin-left: 6px; cursor: pointer;">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        }
    }

    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    if (totalEl) totalEl.innerText = finalTotal;
    if (countEl) countEl.innerText = count;

    // Admin Stats Update
    const ordersEl = document.getElementById('total-orders-count');
    const revenueEl = document.getElementById('total-revenue-count');
    if (ordersEl) ordersEl.innerText = totalOrders;
    if (revenueEl) revenueEl.innerText = `Rs. ${totalRevenue}`;
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartUI();
}

// Open Checkout Modal
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        toggleCart();
    }

    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.add('active');
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
    }
}

// Process Order Function
function processOrder(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.getElementById('payment-method').value;

    const rawTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderTotal = Math.max(0, rawTotal - discountAmount);

    totalRevenue += orderTotal;
    totalOrders++;

    // Save Order History
    const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        items: [...cart],
        amount: orderTotal,
        date: new Date().toLocaleDateString(),
        status: 'Processing'
    };
    orderHistory.unshift(newOrder);

    // Local Storage Update
    localStorage.setItem('totalOrders', totalOrders);
    localStorage.setItem('totalRevenue', totalRevenue);
    localStorage.setItem('foodieOrderHistory', JSON.stringify(orderHistory));

    alert(`Shukriya ${name}! Aap ka order (Rs. ${orderTotal}) successfully place ho gaya hai.\nPayment Method: ${payment}\nDelivery Address: ${address}`);

    // Reset Cart, Discount & Form
    cart = [];
    discountAmount = 0;
    const msgEl = document.getElementById('discount-msg');
    const couponInput = document.getElementById('coupon-code');
    if (msgEl) msgEl.innerText = '';
    if (couponInput) couponInput.value = '';

    saveCartToStorage();
    updateCartUI();
    renderOrderHistory();
    document.getElementById('checkout-form').reset();
    closeCheckoutModal();

    // Live Tracking Start
    startOrderTrackingSimulation();
}

// Render Order History UI
function renderOrderHistory() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return;

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `<p style="text-align: center; color: #888;">No orders placed yet!</p>`;
        return;
    }

    historyContainer.innerHTML = '';
    orderHistory.forEach(order => {
        let itemsSummary = order.items.map(i => `${i.name} (x${i.quantity})`).join(', ');
        historyContainer.innerHTML += `
            <div style="background: var(--card-bg, #fff); padding: 15px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
                    <span>Order ID: ${order.id}</span>
                    <span style="color: #2ed573;">Rs. ${order.amount}</span>
                </div>
                <p style="margin: 0 0 6px 0; font-size: 14px; color: #555;"><strong>Items:</strong> ${itemsSummary}</p>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #888;">
                    <span>Date: ${order.date}</span>
                    <span>Status: <strong>${order.status}</strong></span>
                </div>
            </div>
        `;
    });
}

function startOrderTrackingSimulation() {
    const trackingSection = document.getElementById('tracking-section');
    if (!trackingSection) return;

    trackingSection.classList.remove('hidden');
    trackingSection.scrollIntoView({ behavior: 'smooth' });

    let step = 1;
    [1, 2, 3, 4].forEach(s => {
        const el = document.getElementById(`step-${s}`);
        if (el) el.classList.remove('active');
    });
    
    const step1 = document.getElementById('step-1');
    if (step1) step1.classList.add('active');

    const interval = setInterval(() => {
        step++;
        if (step <= 4) {
            const currentStep = document.getElementById(`step-${step}`);
            if (currentStep) currentStep.classList.add('active');
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

    menuItems.push({ id: Date.now(), name, category, price, img });
    saveMenuItemsToStorage();
    renderMenu(menuItems);
    document.getElementById('add-menu-form').reset();
    alert('Item added successfully!');
}

// Admin Delete Product
function deleteMenuItem(id) {
    if (confirm("Kya aap waqai is item ko menu se hatana chahte hain?")) {
        menuItems = menuItems.filter(item => item.id !== id);
        saveMenuItemsToStorage();
        renderMenu(menuItems);
        alert("Item menu se delete kar diya gaya hai!");
    }
}

// Auth Modal Controls
function openAuthModal(mode = 'login') {
    currentAuthMode = mode;
    const authModal = document.getElementById('auth-modal');
    const loginScreen = document.getElementById('login-screen');
    const signupScreen = document.getElementById('signup-screen');

    if (mode === 'signup') {
        if (loginScreen) loginScreen.classList.add('hidden');
        if (signupScreen) signupScreen.classList.remove('hidden');
    } else {
        if (signupScreen) signupScreen.classList.add('hidden');
        if (loginScreen) loginScreen.classList.remove('hidden');
    }

    if (authModal) authModal.classList.add('active');
}

function switchAuthScreen(mode) {
    openAuthModal(mode);
}

function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.classList.remove('active');
}

function handleAuth(e, type) {
    e.preventDefault();
    if (type === 'signup') {
        alert('Account created & logged in successfully!');
    } else {
        alert('Logged in successfully!');
    }
    closeAuthModal();
}

// Dark / Light Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (document.body.classList.contains('dark-theme')) {
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Window Load Setup
window.onload = () => {
    renderMenu(menuItems);
    updateCartUI();
    renderOrderHistory();

    // Check Local Storage for Saved Theme
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    } else {
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
    }
};
