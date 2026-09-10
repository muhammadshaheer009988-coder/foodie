// Default Menu Items (LocalStorage se load honge agar saved hon)
let defaultItems = [
    { id: 1, name: 'Zinger Burger Deluxe', category: 'Fast Food', price: 550, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 2, name: 'Special Chicken Biryani', category: 'Desi', price: 380, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
    { id: 3, name: 'Smoky BBQ Seekh Kebab', category: 'BBQ', price: 750, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
    { id: 4, name: 'Chilled Soft Drink', category: 'Drinks', price: 120, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' }
];

let menuItems = JSON.parse(localStorage.getItem('foodieMenuItems')) || defaultItems;

// Local Storage se cart load karein
let cart = JSON.parse(localStorage.getItem('foodieCart')) || [];
let totalOrders = localStorage.getItem('totalOrders') ? parseInt(localStorage.getItem('totalOrders')) : 0;
let totalRevenue = localStorage.getItem('totalRevenue') ? parseInt(localStorage.getItem('totalRevenue')) : 0;

// Discount Tracker Variable
let discountAmount = 0;

// Save Menu Items to Local Storage
function saveMenuItemsToStorage() {
    localStorage.setItem('foodieMenuItems', JSON.stringify(menuItems));
}

// Render Menu (With Admin Delete Button Support)
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
    if (window.event && window.event.target) window.event.target.classList.add('active');

    if (category === 'All') {
        renderMenu(menuItems);
    } else {
        renderMenu(menuItems.filter(item => item.category === category));
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar) sidebar.classList.toggle('open');
}

// Save Cart to LocalStorage
function saveCartToStorage() {
    localStorage.setItem('foodieCart', JSON.stringify(cart));
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
    
    saveCartToStorage();
    updateCartUI();
    alert(`${item.name} Cart mein add ho gaya hai!`);
}

// Apply Promo Code Function
function applyCoupon() {
    const codeInput = document.getElementById('coupon-code');
    const msgEl = document.getElementById('discount-msg');
    if (!codeInput) return;

    const code = codeInput.value.trim().toUpperCase();

    if (code === 'FOODIE50') {
        discountAmount = 100; // Rs. 100 Flat Discount
        if(msgEl) {
            msgEl.style.color = '#2ed573';
            msgEl.innerText = 'Promo code applied! Rs. 100 Discount Added 🎉';
        }
    } else if (code === '') {
        alert('Pehle promo code enter karein.');
    } else {
        discountAmount = 0;
        if(msgEl) {
            msgEl.style.color = '#ff4757';
            msgEl.innerText = 'Invalid Promo Code! (Try: FOODIE50)';
        }
    }

    updateCartUI();
}

// Update Cart UI & Calculate Total with Discount
function updateCartUI() {
    const container = document.getElementById('cart-items');
    let total = 0, count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
    });

    // Subtotal mein se discount minus karna
    let finalTotal = total - discountAmount;
    if (finalTotal < 0) finalTotal = 0;

    if (container) {
        container.innerHTML = '';
        cart.forEach(item => {
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
    }

    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    if(totalEl) totalEl.innerText = finalTotal;
    if(countEl) countEl.innerText = count;

    // Admin Stats Update
    const ordersEl = document.getElementById('total-orders-count');
    const revenueEl = document.getElementById('total-revenue-count');
    if(ordersEl) ordersEl.innerText = totalOrders;
    if(revenueEl) revenueEl.innerText = `Rs. ${totalRevenue}`;
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
    if(sidebar && sidebar.classList.contains('open')) {
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

// Process Order after form submission
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

    // Local Storage Update
    localStorage.setItem('totalOrders', totalOrders);
    localStorage.setItem('totalRevenue', totalRevenue);

    alert(`Shukriya ${name}! Aap ka order (Rs. ${orderTotal}) successfully place ho gaya hai.\nPayment Method: ${payment}\nDelivery Address: ${address}`);

    // Reset Cart, Discount & Form
    cart = [];
    discountAmount = 0;
    const msgEl = document.getElementById('discount-msg');
    const couponInput = document.getElementById('coupon-code');
    if(msgEl) msgEl.innerText = '';
    if(couponInput) couponInput.value = '';

    saveCartToStorage();
    updateCartUI();
    document.getElementById('checkout-form').reset();
    closeCheckoutModal();

    // Live Tracking Start
    startOrderTrackingSimulation();
}

function startOrderTrackingSimulation() {
    const trackingSection = document.getElementById('tracking-section');
    if(!trackingSection) return;

    trackingSection.classList.remove('hidden');
    trackingSection.scrollIntoView({ behavior: 'smooth' });

    let step = 1;
    [1, 2, 3, 4].forEach(s => {
        const el = document.getElementById(`step-${s}`);
        if(el) el.classList.remove('active');
    });
    
    const step1 = document.getElementById('step-1');
    if(step1) step1.classList.add('active');

    const interval = setInterval(() => {
        step++;
        if (step <= 4) {
            const currentStep = document.getElementById(`step-${step}`);
            if(currentStep) currentStep.classList.add('active');
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

// Login Modal Controls
function openAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if(authModal) authModal.classList.add('active');
}

function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if(authModal) authModal.classList.remove('active');
}

function handleAuth(e) {
    e.preventDefault();
    alert('Logged in successfully!');
    closeAuthModal();
}

// Premium Dark / Light Mode Toggle Function
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (document.body.classList.contains('dark-theme')) {
        if(themeIcon) {
            themeIcon.className = 'fa-solid fa-sun';
        }
        localStorage.setItem('theme', 'dark');
    } else {
        if(themeIcon) {
            themeIcon.className = 'fa-solid fa-moon';
        }
        localStorage.setItem('theme', 'light');
    }
}

// Window Load setup
window.onload = () => {
    renderMenu(menuItems);
    updateCartUI();

    // Check Local Storage for Saved Theme
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if(themeIcon) {
            themeIcon.className = 'fa-solid fa-sun';
        }
    } else {
        if(themeIcon) {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }
};
