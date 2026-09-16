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

// Expanded Multi-Item Menu Categorized with 10-15 Flavors/Items per category
let defaultCategories = {
    'Fast Food': [
        { id: 101, name: 'Zinger Burger Deluxe', category: 'Fast Food', price: 550, desc: 'Crispy chicken fillet with spicy mayo and fresh lettuce.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
        { id: 102, name: 'Melted Cheese Zinger', category: 'Fast Food', price: 650, desc: 'Loaded with double cheddar cheese and jalapenos.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500' },
        { id: 103, name: 'Jumbo Beef Burger', category: 'Fast Food', price: 700, desc: 'Juicy grilled beef patty with smoky BBQ signature sauce.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500' },
        { id: 104, name: 'Spicy Jalapeno Burger', category: 'Fast Food', price: 600, desc: 'Fire-grilled chicken patty topped with hot spicy sauce.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500' },
        { id: 105, name: 'Crispy Chicken Wings (6pcs)', category: 'Fast Food', price: 450, desc: 'Golden fried wings tossed in buffalo hot sauce.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500' },
        { id: 106, name: 'Loaded French Fries', category: 'Fast Food', price: 350, desc: 'Crispy fries drenched in liquid cheese and beef bits.', rating: '4.5 ⭐', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500' },
        { id: 107, name: 'Club Sandwich Supreme', category: 'Fast Food', price: 500, desc: 'Triple layer sandwich with chicken, egg, and fresh veggies.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500' },
        { id: 108, name: 'Twister Chicken Roll', category: 'Fast Food', price: 400, desc: 'Crispy strips wrapped in tortilla with garlic mayo.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500' },
        { id: 109, name: 'Stuffed Garlic Bread', category: 'Fast Food', price: 420, desc: 'Baked bread stuffed with mozzarella and herbs.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500' },
        { id: 110, name: 'Italian Pepperoni Pizza Slice', category: 'Fast Food', price: 300, desc: 'Classic crust loaded with beef pepperoni and cheese.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500' },
        { id: 111, name: 'Nuggets & Fries Box', category: 'Fast Food', price: 380, desc: '8 pieces of golden nuggets with honey mustard dip.', rating: '4.4 ⭐', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500' },
        { id: 112, name: 'Zinger Tower Burger', category: 'Fast Food', price: 750, desc: 'Double fillet zinger with hashbrown and cheese slice.', rating: '5.0 ⭐', img: 'https://images.unsplash.com/photo-1583032015865-e9ed53467970?w=500' }
    ],
    'Desi': [
        { id: 201, name: 'Special Chicken Biryani', category: 'Desi', price: 380, desc: 'Aromatic basmati rice cooked with tender chicken pieces and spices.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
        { id: 202, name: 'Sindhi Mutton Biryani', category: 'Desi', price: 580, desc: 'Traditional spicy mutton biryani with potatoes and prunes.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500' },
        { id: 203, name: 'Chicken Pulao Royal', category: 'Desi', price: 360, desc: 'Yakhni based rich flavored rice with succulent chicken.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500' },
        { id: 204, name: 'Lahori Chicken Karahi (Half)', category: 'Desi', price: 950, desc: 'Prepared in pure tomato gravy with green chilies and ginger.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500' },
        { id: 205, name: 'Shinwari Mutton Karahi', category: 'Desi', price: 1450, desc: 'Authentic salt and black pepper flavored rich meat karahi.', rating: '5.0 ⭐', img: 'https://images.unsplash.com/photo-1545247389-dc3a4bc0344e?w=500' },
        { id: 206, name: 'Special Chicken Haleem', category: 'Desi', price: 320, desc: 'Slow cooked wheat, lentils and shredded meat stew.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500' },
        { id: 207, name: 'Desi Ghee Chicken Qorma', category: 'Desi', price: 600, desc: 'Traditional rich wedding style chicken gravy.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500' },
        { id: 208, name: 'Daal Makhani Special', category: 'Desi', price: 280, desc: 'Creamy black lentils tempered with butter and garlic.', rating: '4.5 ⭐', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500' },
        { id: 209, name: 'Tandoori Butter Naan', category: 'Desi', price: 60, desc: 'Freshly baked clay oven flatbread coated with butter.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500' },
        { id: 210, name: 'Chicken White Handi', category: 'Desi', price: 1050, desc: 'Boneless chicken cooked in creamy yogurt and malai gravy.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500' },
        { id: 211, name: 'Beef Nihari Special', category: 'Desi', price: 650, desc: 'Tender beef shanks slow cooked overnight in spicy gravy.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500' },
        { id: 212, name: 'Aloo Keema Masala', category: 'Desi', price: 400, desc: 'Minced meat cooked with potatoes and fresh coriander.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500' }
    ],
    'BBQ': [
        { id: 301, name: 'Smoky BBQ Seekh Kebab', category: 'BBQ', price: 750, desc: 'Juicy minced meat skewers grilled over glowing charcoal.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
        { id: 302, name: 'Chicken Malai Boti (12pcs)', category: 'BBQ', price: 850, desc: 'Melt-in-mouth creamy chicken chunks marinated with yogurt & cheese.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500' },
        { id: 303, name: 'Chicken Tikka Leg / Breast', category: 'BBQ', price: 350, desc: 'Traditional red spicy charcoal grilled chicken piece.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' },
        { id: 304, name: 'Reshmi Kebab Platter', category: 'BBQ', price: 800, desc: 'Super soft chicken kebabs infused with cream and mild spices.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
        { id: 305, name: 'Beef Behari Kebab', category: 'BBQ', price: 900, desc: 'Thin strips of beef marinated with raw papaya and secret spices.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500' },
        { id: 306, name: 'Mutton Chops Grill (6pcs)', category: 'BBQ', price: 1350, desc: 'Tender lamb ribs marinated and roasted on fire.', rating: '5.0 ⭐', img: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500' },
        { id: 307, name: 'Fish Tikka BBQ (8pcs)', category: 'BBQ', price: 1100, desc: 'Boneless river fish chunks grilled with tangy spices.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500' },
        { id: 308, name: 'Mix BBQ Platter Deluxe', category: 'BBQ', price: 2200, desc: 'Assortment of Seekh Kebab, Malai Boti, Tikka, and Beef Behari.', rating: '5.0 ⭐', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' },
        { id: 309, name: 'Afghani Tikka Boti', category: 'BBQ', price: 880, desc: 'Juicy white meat chunks tossed in black pepper and lemon.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500' },
        { id: 310, name: 'Grilled Prawns BBQ', category: 'BBQ', price: 1500, desc: 'Jumbo prawns seasoned with garlic butter and herbs.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1565680314944-eac5617e13ae?w=500' },
        { id: 311, name: 'Garlic Mayo Chicken Boti', category: 'BBQ', price: 820, desc: 'Charcoal grilled chicken coated in signature garlic sauce.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' },
        { id: 312, name: 'Cheese Grilled Seekh Kebab', category: 'BBQ', price: 950, desc: 'Seekh kebabs wrapped in melted mozzarella cheese.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500' }
    ],
    'Drinks': [
        { id: 401, name: 'Chilled Soft Drink (500ml)', category: 'Drinks', price: 120, desc: 'Refreshing ice-cold carbonated beverage.', rating: '4.5 ⭐', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' },
        { id: 402, name: 'Fresh Mint Margarita', category: 'Drinks', price: 300, desc: 'Blended mint leaves, lemon juice, sprite and crushed ice.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500' },
        { id: 403, name: 'Pina Colada Special', category: 'Drinks', price: 450, desc: 'Creamy pineapple and coconut mocktail drink.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500' },
        { id: 404, name: 'Fresh Mango Shake', category: 'Drinks', price: 350, desc: 'Thick creamy milkshake made with ripe seasonal mangoes.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500' },
        { id: 405, name: 'Oreo Chocolate Shake', category: 'Drinks', price: 400, desc: 'Rich chocolate shake blended with crunchy oreo cookies.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500' },
        { id: 406, name: 'Strawberry Colada', category: 'Drinks', price: 380, desc: 'Sweet strawberry puree mixed with crushed ice and cream.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500' },
        { id: 407, name: 'Blue Lagoon Mocktail', category: 'Drinks', price: 320, desc: 'Refreshing citrus drink with blue curacao syrup.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500' },
        { id: 408, name: 'Cold Coffee with Ice Cream', category: 'Drinks', price: 420, desc: 'Chilled coffee topped with a large scoop of vanilla ice cream.', rating: '4.9 ⭐', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500' },
        { id: 409, name: 'Fresh Lime Soda (Namkeen/Meetha)', category: 'Drinks', price: 200, desc: 'Sparkling soda mixed with fresh lemon juice and black salt.', rating: '4.7 ⭐', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500' },
        { id: 410, name: 'Energy Drink (Red Bull)', category: 'Drinks', price: 350, desc: 'High performance energy booster beverage.', rating: '4.8 ⭐', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' },
        { id: 411, name: 'Peach Iced Tea', category: 'Drinks', price: 280, desc: 'Chilled black tea infused with sweet peach flavor.', rating: '4.6 ⭐', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500' },
        { id: 412, name: 'Mineral Water (Large)', category: 'Drinks', price: 90, desc: 'Pure filtered refreshing bottled water.', rating: '5.0 ⭐', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500' }
    ]
};

let menuItems = [
    ...defaultCategories['Fast Food'],
    ...defaultCategories['Desi'],
    ...defaultCategories['BBQ'],
    ...defaultCategories['Drinks']
];

let storedMenuItems = JSON.parse(localStorage.getItem('foodieMenuItems'));
if (storedMenuItems && storedMenuItems.length > 10) {
    menuItems = storedMenuItems;
} else {
    localStorage.setItem('foodieMenuItems', JSON.stringify(menuItems));
}

let cart = JSON.parse(localStorage.getItem('foodieCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('foodieWishlist')) || [];
let orderHistory = JSON.parse(localStorage.getItem('foodieOrderHistory')) || [];
let totalOrders = localStorage.getItem('totalOrders') ? parseInt(localStorage.getItem('totalOrders')) : 0;
let totalRevenue = localStorage.getItem('totalRevenue') ? parseInt(localStorage.getItem('totalRevenue')) : 0;

let currentCurrency = localStorage.getItem('foodieCurrency') || 'PKR';
let currencyRates = { PKR: 1, USD: 0.0036, EUR: 0.0033 };
let currencySymbols = { PKR: 'Rs. ', USD: '$', EUR: '€' };
let loyaltyCoins = localStorage.getItem('foodieCoins') ? parseInt(localStorage.getItem('foodieCoins')) : 150; 

const adminWhatsAppNumber = "923312969666";

let currentAuthMode = 'login';
let discountAmount = 0;
let isLoggedIn = localStorage.getItem('foodieLoggedIn') === 'true';

function saveMenuItemsToStorage() {
    localStorage.setItem('foodieMenuItems', JSON.stringify(menuItems));
}

function formatPrice(amountInPKR) {
    let rate = currencyRates[currentCurrency] || 1;
    let symbol = currencySymbols[currentCurrency] || 'Rs. ';
    let converted = (amountInPKR * rate).toFixed(currentCurrency === 'PKR' ? 0 : 2);
    return `${symbol}${converted}`;
}

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

function updateLoyaltyUI() {
    const coinEl = document.getElementById('coin-count');
    const dashCoins = document.getElementById('dash-user-coins');
    if (coinEl) coinEl.innerText = loyaltyCoins;
    if (dashCoins) dashCoins.innerText = loyaltyCoins;
    localStorage.setItem('foodieCoins', loyaltyCoins);
}

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

function filterMenu(categoryName, eventObj) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const targetBtn = eventObj ? eventObj.currentTarget : (event && event.currentTarget);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    playCustomSound(650, 0.1, 'sine');

    if (categoryName === 'All') {
        renderMenu(menuItems);
        showToast("Showing All Elite Delicacies");
    } else {
        const categoryItems = menuItems.filter(item => item.category === categoryName);
        renderMenu(categoryItems);
        showToast(`Opened ${categoryName} Menu (${categoryItems.length} Flavors Available)`);
    }
}

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

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

function saveCartToStorage() {
    localStorage.setItem('foodieCart', JSON.stringify(cart));
}

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
    
    if (totalEl) totalEl.innerText = formatPrice(finalTotal);
    if (countEl) countEl.innerText = count;
    if (floatingCountEl) floatingCountEl.innerText = count;

    updateLoyaltyUI();
}

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

function processOrder(e) {
    e.preventDefault();
    playCustomSound(523, 0.1, 'sine');

    const nameEl = document.getElementById('cust-name');
    const phoneEl = document.getElementById('cust-phone');
    const addressEl = document.getElementById('cust-address');
    const paymentEl = document.getElementById('payment-method');

    const name = nameEl ? nameEl.value : '';
    const phone = phoneEl ? phoneEl.value : '';
    const address = addressEl ? addressEl.value : '';
    const payment = paymentEl ? paymentEl.value : 'Cash on Delivery';

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
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.reset();
    closeCheckoutModal();

    window.open(whatsappUrl, '_blank');
    startOrderTrackingSimulation();
}

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
    
    const step1El = document.getElementById('step-1');
    if (step1El) step1El.classList.add('active');

    const interval = setInterval(() => {
        step++;
        if (step <= 4) {
            const stepEl = document.getElementById(`step-${step}`);
            if (stepEl) stepEl.classList.add('active');
        } else {
            clearInterval(interval);
        }
    }, 3000);
}

function handleTableReservation(e) {
    e.preventDefault();
    playCustomSound(800, 0.15, 'sine');
    showToast("VIP Table reserved successfully! We look forward to serving you.");
    const resForm = document.getElementById('reservation-form');
    if (resForm) resForm.reset();
}

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

            if (!activeMood) {
                showToast("Please select a mood first!", "error");
                return;
            }

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

function toggleChatbot() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) chatWindow.classList.toggle('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    if (!input || !input.value.trim() || !messages) return;

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

function changeLanguage() {
    const langSelector = document.getElementById('language-selector');
    if (!langSelector) return;
    const lang = langSelector.value;
    const root = document.getElementById('html-root') || document.documentElement;
    root.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);
    showToast(lang === 'ur' ? 'اردو زبان منتخب کی گئی' : 'English language selected');
}

function openAuthModal(mode = 'login') {
    const authModal = document.getElementById('auth-modal');
    const loginScreen = document.getElementById('login-screen');
    const signupScreen = document.getElementById('signup-screen');

    if (!authModal) return;

    if (mode === 'signup') {
        if (loginScreen) loginScreen.classList.add('hidden');
        if (signupScreen) signupScreen.classList.remove('hidden');
    } else {
        if (signupScreen) signupScreen.classList.add('hidden');
        if (loginScreen) loginScreen.classList.remove('hidden');
    }
    authModal.classList.add('active');
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
    isLoggedIn = true;
    localStorage.setItem('foodieLoggedIn', 'true');
    
    const dashBtn = document.getElementById('dashboard-btn');
    if (dashBtn) dashBtn.classList.remove('hidden');

    showToast(type === 'signup' ? 'Account created successfully!' : 'Logged in successfully!');
    closeAuthModal();
}

function openDashboardModal() {
    const dashModal = document.getElementById('dashboard-modal');
    if (dashModal) dashModal.classList.add('active');
}

function closeDashboardModal() {
    const dashModal = document.getElementById('dashboard-modal');
    if (dashModal) dashModal.classList.remove('active');
}

function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('foodieLoggedIn');
    const dashBtn = document.getElementById('dashboard-btn');
    if (dashBtn) dashBtn.classList.add('hidden');
    closeDashboardModal();
    showToast("Logged out successfully");
}

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
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    }
};
