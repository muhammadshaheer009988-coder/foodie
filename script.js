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

// Default Menu Items (LocalStorage se load honge agar saved hon)
let defaultItems = [
    { id: 1, name: 'Zinger Burger Deluxe', category: 'Fast Food', price: 550, desc: 'Crispy chicken fillet with spicy mayo and fresh lettuce.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 2, name: 'Special Chicken Biryani', category: 'Desi', price: 380, desc: 'Aromatic basmati rice cooked with tender chicken pieces and spices.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
    { id: 3, name: 'Smoky BBQ Seekh Kebab', category: 'BBQ', price: 750, desc: 'Juicy minced meat skewers grilled over glowing charcoal.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
    { id: 4, name: 'Chilled Soft Drink', category: 'Drinks', price: 120, desc: 'Refreshing ice-cold carbonated beverage.', rating: '4.5 ⭐', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' }
];

let menuItems = JSON.parse(localStorage.getItem('foodieMenuItems')) || defaultItems;

// Local Storage se Cart, Orders History, Currency aur Loyalty Coins load karein
let cart = JSON.parse(localStorage.getItem('foodieCart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('foodieOrderHistory')) || [];
let totalOrders = localStorage.getItem('totalOrders') ? parseInt(localStorage.getItem('totalOrders')) : 0;
let totalRevenue = localStorage.getItem('totalRevenue') ? parseInt(localStorage.getItem('totalRevenue')) : 0;

// New Global State Variables
let currentCurrency = localStorage.getItem('foodieCurrency') || 'PKR';
let currencyRates = { PKR: 1, USD: 0.0036, EUR: 0.0033, GBP: 0.0028 };
let currencySymbols = { PKR: 'Rs. ', USD: '$', EUR: '€', GBP: '£' };
let loyaltyCoins = localStorage.getItem('foodieCoins') ? parseInt(localStorage.getItem('foodieCoins')) : 50; // Welcome bonus 50 coins

// Admin WhatsApp Number Configuration (Bina + ya 00 ke)
const adminWhatsAppNumber = "923312969666";

// Current Auth Mode
let currentAuthMode = 'login';

// Discount Tracker Variable
let discountAmount = 0;

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
    
    // Re-render components to reflect currency change
    renderMenu(menuItems);
    updateCartUI();
    renderOrderHistory();
    playCustomSound(600, 0.08, 'sine');
}

// Update Loyalty Coins UI
function updateLoyaltyUI() {
    const coinEl = document.getElementById('loyalty-coin-count');
    if (coinEl) coinEl.innerText = loyaltyCoins;
    localStorage.setItem('foodieCoins', loyaltyCoins);
}

// Voice Search using Web Speech API
function startVoiceSearch() {
    const searchInput = document.getElementById('search-input');
    const voiceBtn = document.getElementById('voice-search-btn');
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Aap ka browser Voice Search support nahi karta.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (voiceBtn) voiceBtn.classList.add('listening');
    playCustomSound(500, 0.1, 'sine');

    recognition.start();

    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        if (searchInput) {
            searchInput.value = speechToText;
            searchMenu();
        }
        if (voiceBtn) voiceBtn.classList.remove('listening');
    };

    recognition.onerror = () => {
        if (voiceBtn) voiceBtn.classList.remove('listening');
    };

    recognition.onspeechend = () => {
        if (voiceBtn) voiceBtn.classList.remove('listening');
        recognition.stop();
    };
}

// Fetch GPS Location and populate Address input
function fetchUserLocation() {
    const addressInput = document.getElementById('cust-address');
    if (!addressInput) return;

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
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
        },
        () => {
            addressInput.value = "";
            alert("Location access denied or unavailable. Please type manually.");
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
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 18px;">Koi item nahi mila.</p>`;
        return;
    }

    items.forEach(item => {
        container.innerHTML += `
            <div class="food-card">
                <div class="food-img-container">
                    <img src="${item.img}" alt="${item.name}">
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
    } else if (code === '') {
        alert('Pehle promo code enter karein.');
    } else {
        discountAmount = 0;
        if (msgEl) {
            msgEl.style.color = '#ff4757';
            msgEl.innerText = 'Invalid Promo Code! (Try: FOODIE50)';
        }
        playCustomSound(250, 0.2, 'sawtooth');
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
            container.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 20px;">Aap ka cart khali hai.</p>`;
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
    
    if (totalEl) totalEl.innerText = formatPrice(finalTotal).replace(/[^0-9.]/g, ''); // Numeric or symbol supported display
    if (countEl) countEl.innerText = count;
    if (floatingCountEl) floatingCountEl.innerText = count;

    // Admin Stats Update
    const ordersEl = document.getElementById('total-orders-count');
    const revenueEl = document.getElementById('total-revenue-count');
    if (ordersEl) ordersEl.innerText = totalOrders;
    if (revenueEl) revenueEl.innerText = formatPrice(totalRevenue);

    updateLoyaltyUI();
}

function removeFromCart(itemId) {
    playCustomSound(300, 0.15, 'sawtooth');
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartUI();
}

// Toggle Payment Details Box based on Payment Method Selection
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
        alert("Your cart is empty!");
        return;
    }

    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
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

    playCustomSound(523, 0.1, 'sine');
    setTimeout(() => playCustomSound(659, 0.1, 'sine'), 100);
    setTimeout(() => playCustomSound(783, 0.2, 'sine'), 200);

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.getElementById('payment-method').value;

    const rawTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderTotal = Math.max(0, rawTotal - discountAmount);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    totalRevenue += orderTotal;
    totalOrders++;

    // Earn loyalty coins (10% of total spent converted to coins)
    let earnedCoins = Math.floor(orderTotal * 0.05);
    loyaltyCoins += earnedCoins;

    // Save Order History
    const newOrder = {
        id: orderId,
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

    // Prepare WhatsApp Message
    let itemsListText = "";
    cart.forEach(item => {
        itemsListText += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });

    const waMessage = `🛍️ *Naya Order Aaya Hai! (Foodie Express)*\n\n` +
                      `🆔 *Order ID:* ${orderId}\n` +
                      `👤 *Name:* ${name}\n` +
                      `📞 *Phone:* ${phone}\n` +
                      `📍 *Address:* ${address}\n` +
                      `💳 *Payment Method:* ${payment}\n\n` +
                      `🍔 *Order Items:*\n${itemsListText}\n` +
                      `💰 *Total Amount:* ${formatPrice(orderTotal)}\n\n` +
                      `Meherbani karke order confirm karein.`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;

    alert(`Shukriya ${name}! Aap ka order successfully place ho gaya hai (+${earnedCoins} Loyalty Coins earned!).\nAbhi aap ko WhatsApp par redirect kiya ja raha hai.`);

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
    togglePaymentInfo(); 
    closeCheckoutModal();

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Live Tracking Start
    startOrderTrackingSimulation();
}

// Render Order History UI
function renderOrderHistory() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return;

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `<div class="no-history-msg">No orders placed yet!</div>`;
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

// AI Matchmaker Chips Handling & Generator Function
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
            const activeOccasion = document.querySelector('#occasion-chips .ai-chip.active');
            const resultBox = document.getElementById('ai-result-box');
            const recommendedContainer = document.getElementById('ai-recommended-items');
            const reasonText = document.getElementById('ai-result-reason');

            if (!activeMood || !activeOccasion) {
                alert("Pehle mood aur occasion select karein!");
                return;
            }

            const moodVal = activeMood.getAttribute('data-value');
            let matchedItem = menuItems[0];

            if (moodVal === 'spicy') {
                matchedItem = menuItems.find(i => i.category === 'Fast Food') || menuItems[0];
            } else if (moodVal === 'cheesy') {
                matchedItem = menuItems.find(i => i.category === 'Fast Food') || menuItems[1];
            } else if (moodVal === 'healthy') {
                matchedItem = menuItems.find(i => i.category === 'Desi') || menuItems[1];
            } else if (moodVal === 'sweet') {
                matchedItem = menuItems.find(i => i.category === 'Drinks') || menuItems[3];
            }

            if (reasonText) {
                reasonText.innerText = `Matched for your selected mood & preference!`;
            }

            if (recommendedContainer) {
                recommendedContainer.innerHTML = `
                    <div class="food-card" style="width: 100%; margin: 0 auto;">
                        <div class="food-img-container">
                            <img src="${matchedItem.img}" alt="${matchedItem.name}">
                        </div>
                        <div class="food-details">
                            <div>
                                <div class="food-title-price">
                                    <h4>${matchedItem.name}</h4>
                                    <span>${formatPrice(matchedItem.price)}</span>
                                </div>
                                <p class="food-desc">${matchedItem.desc || 'AI Recommended perfection.'}</p>
                            </div>
                            <div class="food-footer">
                                <span class="food-rating">${matchedItem.rating || '4.9 ⭐'}</span>
                                <button class="btn-add-cart" onclick="addToCart(${matchedItem.id})">
                                    <i class="fa-solid fa-cart-plus"></i> Add To Bag
                                </button>
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
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Window Load Setup
window.onload = () => {
    // Set currency selector value from storage if exists
    const currencyDropdown = document.getElementById('currency-selector');
    if (currencyDropdown) {
        currencyDropdown.value = currentCurrency;
    }

    renderMenu(menuItems);
    updateCartUI();
    renderOrderHistory();
    setupAIRecommender();
    updateLoyaltyUI();

    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    } else {
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
    }
};
