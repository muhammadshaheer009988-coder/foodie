// Web Audio API Sound Generator (Guaranteed to work without external links/files)
function playCustomSound(freq = 600, duration = 0.12, type = 'sine') {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        // Volume Fade Out
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Audio play error:", e);
    }
}

// Default Menu Items
let defaultItems = [
    { id: 1, name: 'Zinger Burger Deluxe', category: 'Fast Food', price: 550, desc: 'Crispy chicken fillet with spicy mayo and fresh lettuce.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 2, name: 'Special Chicken Biryani', category: 'Desi', price: 380, desc: 'Aromatic basmati rice cooked with tender chicken pieces and spices.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
    { id: 3, name: 'Smoky BBQ Seekh Kebab', category: 'BBQ', price: 750, desc: 'Juicy minced meat skewers grilled over glowing charcoal.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
    { id: 4, name: 'Chilled Soft Drink', category: 'Drinks', price: 120, desc: 'Refreshing ice-cold carbonated beverage.', rating: '4.5 ⭐', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' }
];

let menuItems = JSON.parse(localStorage.getItem('foodieMenuItems')) || defaultItems;

// Local Storage data load
let cart = JSON.parse(localStorage.getItem('foodieCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('foodieWishlist')) || [];
let orderHistory = JSON.parse(localStorage.getItem('foodieOrderHistory')) || [];
let totalOrders = localStorage.getItem('totalOrders') ? parseInt(localStorage.getItem('totalOrders')) : 0;
let totalRevenue = localStorage.getItem('totalRevenue') ? parseInt(localStorage.getItem('totalRevenue')) : 0;

// Global State Variables
let currentCurrency = localStorage.getItem('foodieCurrency') || 'PKR';
let currencyRates = { PKR: 1, USD: 0.0036, EUR: 0.0033 };
let currencySymbols = { PKR: 'Rs. ', USD: '$', EUR: '€' };
let loyaltyCoins = localStorage.getItem('foodieCoins') ? parseInt(localStorage.getItem('foodieCoins')) : 150; 

// Admin WhatsApp Number Configuration
const adminWhatsAppNumber = "923312969666";

// Current Auth Mode & Discount Tracker
let currentAuthMode = 'login';
let discountAmount = 0;
let isLoggedIn = localStorage.getItem('foodieLoggedIn') === 'true';

// Save Menu Items to Local Storage
function saveMenuItemsToStorage() {
    localStorage.setItem('foodieMenuItems', JSON.stringify(menuItems));
}

// Convert Price based on Selected Currency
function formatPrice(amountInPKR) {
    let rate = currencyRates[currentCurrency] || 1;
    let symbol = currencySymbols[currentCurrency] || 'Rs. ';
    let converted = (amountInPKR * rate).toFixed(currentCurrency === 'PKR' ? 0 : 2);
    return `${symbol}${converted}`;
}

// Handle Currency Change from Dropdown
function changeCurrency() {
    const dropdown = document.getElementById('currency-selector');
    if (!dropdown) return;
    currentCurrency = dropdown.value;
    localStorage.setItem('foodieCurrency', currentCurrency);
    
    renderMenu(menuItems);
    updateCartUI();
    renderOrderHistory();
    playCustomSound(600, 0.08, 'sine');
}

// Update Loyalty Coins UI
function updateLoyaltyUI() {
    const coinEl = document.getElementById('coin-count');
    const dashCoins = document.getElementById('dash-user-coins');
    if (coinEl) coinEl.innerText = loyaltyCoins;
    if (dashCoins) dashCoins.innerText = loyaltyCoins;
    localStorage.setItem('foodieCoins', loyaltyCoins);
}

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Voice Search using Web Speech API
function startVoiceSearch() {
    const searchInput = document.getElementById('search-input');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        showToast("Your browser does not support Voice Search.", "error");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    playCustomSound(500, 0.1, 'sine');
    recognition.start();

    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        if (searchInput) {
            searchInput.value = speechToText;
            searchMenu();
        }
    };

    recognition.onerror = () => {
        showToast("Voice recognition error occurred.", "error");
    };
}

// Fetch GPS Location
function detectUserLocation() {
    const addressInput = document.getElementById('cust-address');
    if (!addressInput) return;

    if (!navigator.geolocation) {
        showToast("Geolocation is not supported by your browser", "error");
        return;
    }

    playCustomSound(700, 0.1, 'triangle');
    addressInput.value = "Detecting precise GPS location...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lng = position.coords.longitude.toFixed(4);
            addressInput.value = `GPS Location: Lat ${lat}, Lng ${lng} (Near You)`;
            playCustomSound(900, 0.15, 'sine');
            showToast("Location detected successfully!");
        },
        () => {
            addressInput.value = "";
            showToast("Location access denied. Please type manually.", "error");
        },
        { timeout: 10000 }
    );
}

// Render Menu
function renderMenu(items) {
    const container = document.getElementById('menu-container');
    if (!container) return;
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 18px;">No gourmet dishes found.</p>`;
        return;
    }

    items.forEach(item => {
        const isWishlisted = wishlist.some(w => w.id === item.id);
        container.innerHTML += `
            <div class="food-card">
                <div class="food-img-container">
                    <img src="${item.img}" alt="${item.name}">
                    <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${item.id})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div class="food-details">
                    <div>
                        <div class="food-title-price">
                            <h4>${item.name}</h4>
                            <span>${formatPrice(item.price)}</span>
                        </div>
                        <p class="food-desc">${item.desc || 'Delicious and freshly prepared meal.'}</p>
                    </div>
                    <div class="food-footer">
                        <span class="food-rating">${item.rating || '4.5 ⭐'}</span>
                        <button class="btn-add-cart" onclick="addToCart(${item.id})">
                            <i class="fa-solid fa-cart-plus"></i> Add
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
    
    event.currentTarget.classList.add('active');

    if (category === 'All') {
        renderMenu(menuItems);
    } else {
        renderMenu(menuItems.filter(item => item.category === category));
    }
}

// Wishlist System
function toggleWishlist(itemId) {
    const item = menuItems.find(p => p.id === itemId);
    if (!item) return;

    const index = wishlist.findIndex(w => w.id === itemId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Removed from wishlist");
    } else {
        wishlist.push(item);
        showToast("Added to wishlist ❤️");
        playCustomSound(750, 0.1, 'sine');
    }

    localStorage.setItem('foodieWishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderMenu(menuItems);
}

function updateWishlistUI() {
    const countEl = document.getElementById('wishlist-count');
    const container = document.getElementById('wishlist-items');
    
    if (countEl) countEl.innerText = wishlist.length;

    if (container) {
        if (wishlist.length === 0) {
            container.innerHTML = `<p class="no-history-msg">No favorite dishes added yet!</p>`;
        } else {
            container.innerHTML = '';
            wishlist.forEach(item => {
                container.innerHTML += `
                    <div class="cart-item-card">
                        <div class="cart-item-info">
                            <h5>${item.name}</h5>
                            <p>${formatPrice(item.price)}</p>
                        </div>
                        <div class="cart-item-actions">
                            <button onclick="addToCart(${item.id}); toggleWishlistModal();" class="btn-primary" style="padding: 5px 10px; font-size: 12px;">Add to Bag</button>
                            <button onclick="toggleWishlist(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px;"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `;
            });
        }
    }
}

function toggleWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
    if (modal) {
        modal.classList.toggle('active');
        updateWishlistUI();
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

// Save Cart to LocalStorage
function saveCartToStorage() {
    localStorage.setItem('foodieCart', JSON.stringify(cart));
}

// Add To Cart
function addToCart(itemId) {
    playCustomSound(850, 0.1, 'sine');
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
    showToast(`${item.name} added to cart!`);
}

// Quantity Adjustments (+ / -)
function updateQuantity(itemId, change) {
    playCustomSound(400, 0.08, 'triangle');
    const cartItem = cart.find(p => p.id === itemId);
    if (!cartItem) return;

    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
        cart = cart.filter(p => p.id !== itemId);
    }

    saveCartToStorage();
    updateCartUI();
}

function removeFromCart(itemId) {
    playCustomSound(300, 0.15, 'sawtooth');
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartUI();
    showToast("Item removed from cart");
}

// Apply Promo Code Function
function applyCoupon() {
    const codeInput = document.getElementById('coupon-code');
    const msgEl = document.getElementById('discount-msg');
    if (!codeInput) return;

    const code = codeInput.value.trim().toUpperCase();

    if (code === 'FOODIE50') {
        discountAmount = 100;
        if (msgEl) {
            msgEl.style.color = '#2ed573';
            msgEl.innerText = 'Promo code applied! Rs. 100 Discount Added 🎉';
        }
        playCustomSound(950, 0.2, 'sine');
        showToast("Discount coupon applied successfully!");
    } else {
        discountAmount = 0;
        if (msgEl) {
            msgEl.style.color = '#ff4757';
            msgEl.innerText = 'Invalid Promo Code! (Try: FOODIE50)';
        }
        playCustomSound(250, 0.2, 'sawtooth');
        showToast("Invalid Promo Code", "error");
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
            container.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 20px;">Your shopping bag is empty.</p>`;
        } else {
            cart.forEach(item => {
                container.innerHTML += `
                    <div class="cart-item-card">
                        <div class="cart-item-info">
                            <h5>${item.name}</h5>
                            <p>${formatPrice(item.price)} x ${item.quantity}</p>
                        </div>
                        <div class="cart-item-actions">
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button onclick="removeFromCart(${item.id})" style="background: var(--primary); color: white; border: none;"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `;
            });
        }
    }

    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    const floatingCountEl = document.getElementById('floating-cart-count');
    
    if (totalEl) totalEl.innerText = finalTotal;
    if (countEl) countEl.innerText = count;
    if (floatingCountEl) floatingCountEl.innerText = count;

    updateLoyaltyUI();
}

// Toggle Payment Details Box
function togglePaymentInfo() {
    const paymentSelect = document.getElementById('payment-method');
    const detailsBox = document.getElementById('online-payment-details');
    if (!paymentSelect || !detailsBox) return;

    if (paymentSelect.value === 'JazzCash / EasyPaisa' || paymentSelect.value === 'Debit / Credit Card') {
        detailsBox.style.display = 'block';
    } else {
        detailsBox.style.display = 'none';
    }
}

// Open Checkout Modal
function checkout() {
    if (cart.length === 0) {
        showToast("Your shopping bag is empty!", "error");
        return;
    }

    toggleCart();
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.add('active');
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.remove('active');
}

// Process Order Function
function processOrder(e) {
    e.preventDefault();
    playCustomSound(523, 0.1, 'sine');

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.getElementById('payment-method').value;

    const rawTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderTotal = Math.max(0, rawTotal - discountAmount);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    totalRevenue += orderTotal;
    totalOrders++;
    let earnedCoins = Math.floor(orderTotal * 0.05);
    loyaltyCoins += earnedCoins;

    const newOrder = {
        id: orderId,
        items: [...cart],
        amount: orderTotal,
        date: new Date().toLocaleDateString(),
        status: 'Processing'
    };
    orderHistory.unshift(newOrder);

    localStorage.setItem('totalOrders', totalOrders);
    localStorage.setItem('totalRevenue', totalRevenue);
    localStorage.setItem('foodieOrderHistory', JSON.stringify(orderHistory));

    let itemsListText = "";
    cart.forEach(item => {
        itemsListText += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });

    const waMessage = `🛍️ *New Order Received! (Foodie Express)*\n\n` +
                      `🆔 *Order ID:* ${orderId}\n` +
                      `👤 *Name:* ${name}\n` +
                      `📞 *Phone:* ${phone}\n` +
                      `📍 *Address:* ${address}\n` +
                      `💳 *Payment Method:* ${payment}\n\n` +
                      `🍔 *Order Items:*\n${itemsListText}\n` +
                      `💰 *Total Amount:* ${formatPrice(orderTotal)}`;

    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(waMessage)}`;

    showToast(`Order placed successfully! (+${earnedCoins} Coins)`);

    cart = [];
    discountAmount = 0;
    saveCartToStorage();
    updateCartUI();
    renderOrderHistory();
    document.getElementById('checkout-form').reset();
    closeCheckoutModal();

    window.open(whatsappUrl, '_blank');
    startOrderTrackingSimulation();
}

// Render Order History UI
function renderOrderHistory() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return;

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `<p class="no-history-msg">No luxury orders placed yet!</p>`;
        return;
    }

    historyContainer.innerHTML = '';
    orderHistory.forEach(order => {
        let itemsSummary = order.items.map(i => `${i.name} (x${i.quantity})`).join(', ');
        historyContainer.innerHTML += `
            <div class="history-card">
                <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
                    <span>Order ID: ${order.id}</span>
                    <span style="color: var(--primary);">${formatPrice(order.amount)}</span>
                </div>
                <p style="margin: 0 0 6px 0; font-size: 14px; color: var(--text-muted);"><strong>Items:</strong> ${itemsSummary}</p>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
                    <span>Date: ${order.date}</span>
                    <span>Status: <strong style="color: var(--accent);">${order.status}</strong></span>
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
    
    document.getElementById('step-1').classList.add('active');

    const interval = setInterval(() => {
        step++;
        if (step <= 4) {
            document.getElementById(`step-${step}`).classList.add('active');
        } else {
            clearInterval(interval);
        }
    }, 3000);
}

// Table Reservation Handler
function handleTableReservation(e) {
    e.preventDefault();
    playCustomSound(800, 0.15, 'sine');
    showToast("VIP Table reserved successfully! We look forward to serving you.");
    document.getElementById('reservation-form').reset();
}

// AI Matchmaker
function setupAIRecommender() {
    const moodChips = document.querySelectorAll('#mood-chips .ai-chip');
    const occasionChips = document.querySelectorAll('#occasion-chips .ai-chip');
    const aiFindBtn = document.getElementById('ai-find-btn');

    moodChips.forEach(chip => {
        chip.addEventListener('click', () => {
            moodChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    occasionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            occasionChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    if (aiFindBtn) {
        aiFindBtn.addEventListener('click', () => {
            playCustomSound(700, 0.15, 'sine');
            const activeMood = document.querySelector('#mood-chips .ai-chip.active');
            const resultBox = document.getElementById('ai-result-box');
            const recommendedContainer = document.getElementById('ai-recommended-items');

            if (!activeMood) return;

            let matchedItem = menuItems[Math.floor(Math.random() * menuItems.length)];

            if (recommendedContainer) {
                recommendedContainer.innerHTML = `
                    <div class="food-card" style="width: 100%; margin: 0 auto;">
                        <div class="food-img-container"><img src="${matchedItem.img}" alt="${matchedItem.name}"></div>
                        <div class="food-details">
                            <div class="food-title-price">
                                <h4>${matchedItem.name}</h4>
                                <span>${formatPrice(matchedItem.price)}</span>
                            </div>
                            <p class="food-desc">${matchedItem.desc}</p>
                            <div class="food-footer">
                                <span class="food-rating">${matchedItem.rating}</span>
                                <button class="btn-add-cart" onclick="addToCart(${matchedItem.id})"><i class="fa-solid fa-cart-plus"></i> Add To Bag</button>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (resultBox) {
                resultBox.classList.remove('hidden');
                resultBox.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Live Chatbot Widget
function toggleChatbot() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) chatWindow.classList.toggle('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    messages.innerHTML += `<div class="chat-msg user">${userText}</div>`;
    input.value = '';

    playCustomSound(600, 0.08, 'sine');

    setTimeout(() => {
        let reply = "Thank you for reaching out! Our support team will assist you shortly.";
        if (userText.toLowerCase().includes('delivery')) {
            reply = "All deliveries are completed within 30 minutes!";
        } else if (userText.toLowerCase().includes('discount')) {
            reply = "You can use promo code FOODIE50 for an instant discount!";
        }
        messages.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

// Language Switcher (EN / UR)
function changeLanguage() {
    const lang = document.getElementById('language-selector').value;
    const root = document.getElementById('html-root');
    root.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);
    showToast(lang === 'ur' ? 'اردو زبان منتخب کی گئی' : 'English language selected');
}

// Auth Modals & Dashboard
function openAuthModal(mode = 'login') {
    const authModal = document.getElementById('auth-modal');
    const loginScreen = document.getElementById('login-screen');
    const signupScreen = document.getElementById('signup-screen');

    if (mode === 'signup') {
        loginScreen.classList.add('hidden');
        signupScreen.classList.remove('hidden');
    } else {
        signupScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    }
    authModal.classList.add('active');
}

function switchAuthScreen(mode) {
    openAuthModal(mode);
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

function handleAuth(e, type) {
    e.preventDefault();
    isLoggedIn = true;
    localStorage.setItem('foodieLoggedIn', 'true');
    
    document.getElementById('dashboard-btn').classList.remove('hidden');
    showToast(type === 'signup' ? 'Account created successfully!' : 'Logged in successfully!');
    closeAuthModal();
}

function openDashboardModal() {
    document.getElementById('dashboard-modal').classList.add('active');
}

function closeDashboardModal() {
    document.getElementById('dashboard-modal').classList.remove('active');
}

function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('foodieLoggedIn');
    document.getElementById('dashboard-btn').classList.add('hidden');
    closeDashboardModal();
    showToast("Logged out successfully");
}

// Dark / Light Mode Toggle
function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Window Load Setup
window.onload = () => {
    const currencyDropdown = document.getElementById('currency-selector');
    if (currencyDropdown) currencyDropdown.value = currentCurrency;

    if (isLoggedIn) {
        const dashBtn = document.getElementById('dashboard-btn');
        if (dashBtn) dashBtn.classList.remove('hidden');
    }

    renderMenu(menuItems);
    updateCartUI();
    renderOrderHistory();
    updateWishlistUI();
    setupAIRecommender();
    updateLoyaltyUI();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').className = 'fa-solid fa-sun';
    }
};
