/* =========================================================
   FOODIE EXPRESS - MAIN JAVASCRIPT
   Fully Interactive / Responsive / Functional
========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
========================================================= */

const WHATSAPP_NUMBER = "923001234567";

const currencyRates = {
    PKR: 1,
    USD: 0.00358,
    GBP: 0.00264,
    AED: 0.01315
};

const currencySymbols = {
    PKR: "PKR",
    USD: "$",
    GBP: "£",
    AED: "AED"
};


/* =========================================================
   FOOD DATABASE
========================================================= */

const menuData = [

    {
        id: 1,
        name: "Zinger Burger",
        category: "Fast Food",
        price: 650,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
        description: "Crispy chicken fillet, fresh lettuce, cheese and special sauce.",
        tags: ["burger", "chicken", "fast food", "zinger"]
    },

    {
        id: 2,
        name: "Beef Burger",
        category: "Fast Food",
        price: 750,
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=85",
        description: "Juicy grilled beef patty with cheese, lettuce and premium sauce.",
        tags: ["burger", "beef", "fast food"]
    },

    {
        id: 3,
        name: "Chicken Pizza",
        category: "Fast Food",
        price: 1250,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
        description: "Loaded chicken pizza with mozzarella, vegetables and herbs.",
        tags: ["pizza", "chicken", "fast food"]
    },

    {
        id: 4,
        name: "French Fries",
        category: "Fast Food",
        price: 350,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
        description: "Golden crispy fries served with our signature dip.",
        tags: ["fries", "potato", "fast food"]
    },

    {
        id: 5,
        name: "Chicken Biryani",
        category: "Desi Cuisine",
        price: 480,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85",
        description: "Aromatic basmati rice cooked with tender chicken and traditional spices.",
        tags: ["biryani", "rice", "chicken", "desi", "spicy"]
    },

    {
        id: 6,
        name: "Chicken Karahi",
        category: "Desi Cuisine",
        price: 1350,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
        description: "Traditional chicken karahi cooked with tomatoes, green chilies and spices.",
        tags: ["karahi", "chicken", "desi", "pakistani"]
    },

    {
        id: 7,
        name: "Chicken Handi",
        category: "Desi Cuisine",
        price: 1450,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=900&q=85",
        description: "Creamy chicken handi prepared with rich spices and fresh ingredients.",
        tags: ["handi", "chicken", "desi"]
    },

    {
        id: 8,
        name: "Seekh Kabab",
        category: "BBQ & Grills",
        price: 700,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",
        description: "Juicy grilled seekh kababs made with premium minced meat.",
        tags: ["kabab", "bbq", "grill", "beef"]
    },

    {
        id: 9,
        name: "Chicken Tikka",
        category: "BBQ & Grills",
        price: 850,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",
        description: "Charcoal grilled chicken tikka marinated with aromatic spices.",
        tags: ["tikka", "chicken", "bbq", "grill"]
    },

    {
        id: 10,
        name: "BBQ Platter",
        category: "BBQ & Grills",
        price: 2200,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
        description: "A premium platter featuring assorted BBQ favorites.",
        tags: ["bbq", "platter", "grill", "chicken", "kabab"]
    },

    {
        id: 11,
        name: "Mango Shake",
        category: "Drinks & Shakes",
        price: 450,
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85",
        description: "Creamy chilled mango shake made with fresh mangoes.",
        tags: ["mango", "shake", "drink"]
    },

    {
        id: 12,
        name: "Chocolate Shake",
        category: "Drinks & Shakes",
        price: 500,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
        description: "Rich chocolate milkshake topped with creamy goodness.",
        tags: ["chocolate", "shake", "drink"]
    },

    {
        id: 13,
        name: "Fresh Lime",
        category: "Drinks & Shakes",
        price: 250,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
        description: "Refreshing chilled lime drink with a perfect sweet and sour balance.",
        tags: ["lime", "drink", "fresh"]
    }

];


/* =========================================================
   GLOBAL STATE
========================================================= */

let cart = JSON.parse(localStorage.getItem("foodieCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("foodieWishlist") || "[]");
let orderHistory = JSON.parse(localStorage.getItem("foodieOrders") || "[]");

let currentCurrency =
    localStorage.getItem("foodieCurrency") || "PKR";

let currentLanguage =
    localStorage.getItem("foodieLanguage") || "en";

let currentUser =
    JSON.parse(localStorage.getItem("foodieUser") || "null");

let currentFilter = "All";
let searchTerm = "";
let appliedDiscount = 0;
let selectedDetailItem = null;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();
    initializeSelectors();
    renderMenu();
    updateCart();
    updateWishlist();
    updateDashboard();

    setupReservationDate();
    setupKeyboardShortcuts();
    setupScrollEffects();

});


/* =========================================================
   THEME
========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("foodieTheme") || "light";

    document.documentElement.dataset.theme = savedTheme;

    updateThemeIcon();
}


function toggleDarkMode() {

    const html = document.documentElement;

    const newTheme =
        html.dataset.theme === "dark"
            ? "light"
            : "dark";

    html.dataset.theme = newTheme;

    localStorage.setItem("foodieTheme", newTheme);

    updateThemeIcon();

    playClickSound();

    showToast(
        newTheme === "dark"
            ? "Dark mode enabled 🌙"
            : "Light mode enabled ☀️"
    );
}


function updateThemeIcon() {

    const button =
        document.getElementById("dark-mode-btn");

    if (!button) return;

    const icon = button.querySelector("i");

    if (!icon) return;

    if (document.documentElement.dataset.theme === "dark") {

        icon.className = "fa-solid fa-sun";

    } else {

        icon.className = "fa-solid fa-moon";

    }
}


/* =========================================================
   SELECTORS
========================================================= */

function initializeSelectors() {

    const currency =
        document.getElementById("currency-selector");

    const language =
        document.getElementById("language-selector");

    if (currency)
        currency.value = currentCurrency;

    if (language)
        language.value = currentLanguage;
}


function changeCurrency(currency) {

    currentCurrency = currency;

    localStorage.setItem(
        "foodieCurrency",
        currency
    );

    renderMenu();
    updateCart();

    showToast(
        `Currency changed to ${currencySymbols[currency]}`
    );

}


function changeLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
        "foodieLanguage",
        language
    );

    showToast(
        language === "ur"
            ? "Language changed to Urdu"
            : "Language changed to English"
    );

}


/* =========================================================
   CURRENCY FORMAT
========================================================= */

function formatPrice(price) {

    const converted =
        price * (currencyRates[currentCurrency] || 1);

    if (currentCurrency === "PKR") {

        return `PKR ${Math.round(converted).toLocaleString()}`;

    }

    return `${currencySymbols[currentCurrency]}${converted.toFixed(2)}`;
}


/* =========================================================
   MENU RENDERING
========================================================= */

function renderMenu() {

    const container =
        document.getElementById("menu-container");

    const noResults =
        document.getElementById("no-results");

    if (!container) return;

    const filteredItems =
        menuData.filter(item => {

            const categoryMatch =
                currentFilter === "All" ||
                item.category === currentFilter;

            if (!searchTerm.trim()) {
                return categoryMatch;
            }

            const query =
                searchTerm.toLowerCase().trim();

            const searchableText = [
                item.name,
                item.category,
                item.description,
                ...(item.tags || [])
            ]
                .join(" ")
                .toLowerCase();

            return (
                categoryMatch &&
                searchableText.includes(query)
            );

        });


    container.innerHTML = "";


    if (filteredItems.length === 0) {

        if (noResults)
            noResults.classList.remove("hidden");

        return;

    }


    if (noResults)
        noResults.classList.add("hidden");


    filteredItems.forEach(item => {

        const card =
            document.createElement("article");

        card.className = "menu-card";

        const isWishlisted =
            wishlist.includes(item.id);

        card.innerHTML = `

            <div class="menu-image-wrap">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'">

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${item.id}, event)"
                    aria-label="Add to wishlist">

                    <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>

                </button>

                <span class="food-badge">
                    ${escapeHTML(item.category)}
                </span>

            </div>

            <div class="menu-info">

                <div class="menu-category">
                    ${escapeHTML(item.category)}
                </div>

                <h3>
                    ${escapeHTML(item.name)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <div class="menu-bottom">

                    <strong class="menu-price">
                        ${formatPrice(item.price)}
                    </strong>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${item.id})">

                        <i class="fa-solid fa-plus"></i>
                        Add

                    </button>

                </div>

                <button
                    class="view-detail-btn"
                    onclick="openItemDetailModal(${item.id})">

                    View Details
                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


/* =========================================================
   SEARCH
========================================================= */

function searchMenu(value) {

    searchTerm = value || "";

    currentFilter = "All";

    updateFilterButtons();

    renderMenu();

}


/* =========================================================
   SEARCH ENTER KEY
========================================================= */

const searchInput =
    document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            searchMenu(searchInput.value);

            document
                .getElementById("menu")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            playClickSound();

        }

    });

}


/* =========================================================
   FILTER MENU
========================================================= */

function filterMenu(category, button = null) {

    currentFilter = category;

    searchTerm = "";

    const search =
        document.getElementById("search-input");

    if (search)
        search.value = "";

    updateFilterButtons(button);

    renderMenu();

    document
        .getElementById("menu")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


function updateFilterButtons(activeButton = null) {

    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove("active");

            if (
                activeButton &&
                btn === activeButton
            ) {

                btn.classList.add("active");

            }

        });


    if (!activeButton) {

        document
            .querySelectorAll(".filter-btn")
            .forEach(btn => {

                const text =
                    btn.textContent
                        .trim()
                        .toLowerCase();

                if (
                    (currentFilter === "All" &&
                        text.includes("all delicacies")) ||
                    text.includes(
                        currentFilter.toLowerCase()
                    )
                ) {

                    btn.classList.add("active");

                }

            });

    }

}


/* =========================================================
   VOICE SEARCH
========================================================= */

function startVoiceSearch() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        showToast(
            "Voice search is not supported in this browser."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();

    recognition.lang =
        currentLanguage === "ur"
            ? "ur-PK"
            : "en-US";

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;


    showToast("Listening... 🎤");

    playNotificationSound();


    recognition.start();


    recognition.onresult = event => {

        const text =
            event.results[0][0].transcript;

        const input =
            document.getElementById("search-input");

        if (input)
            input.value = text;

        searchMenu(text);

        document
            .getElementById("menu")
            ?.scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            `Searching for "${text}"`
        );

    };


    recognition.onerror = () => {

        showToast(
            "Voice search could not understand that. Please try again."
        );

    };

}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

    const item =
        menuData.find(food => food.id === id);

    if (!item) return;


    const existing =
        cart.find(cartItem => cartItem.id === id);


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: item.id,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast(
        `${item.name} added to cart 🛒`
    );

    playSuccessSound();

}


function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    updateCart();

}


function changeCartQuantity(id, amount) {

    const item =
        cart.find(cartItem => cartItem.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCart();

}


function getCartItems() {

    return cart
        .map(cartItem => {

            const food =
                menuData.find(
                    item => item.id === cartItem.id
                );

            if (!food) return null;

            return {
                ...food,
                quantity: cartItem.quantity
            };

        })
        .filter(Boolean);

}


function getCartSubtotal() {

    return getCartItems()
        .reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

}


function getCartTotal() {

    return Math.max(
        0,
        getCartSubtotal() - appliedDiscount
    );

}


function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    const discountElement =
        document.getElementById("cart-discount");

    const floatingCount =
        document.getElementById(
            "floating-cart-count"
        );


    const items =
        getCartItems();


    const totalQuantity =
        items.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    if (floatingCount)
        floatingCount.textContent =
            totalQuantity;


    if (discountElement)
        discountElement.textContent =
            formatPrice(appliedDiscount);


    if (cartTotal)
        cartTotal.textContent =
            formatPrice(getCartTotal());


    if (!cartItems) return;


    if (items.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-basket-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add something delicious!</p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML = "";


    items.forEach(item => {

        const row =
            document.createElement("div");

        row.className = "cart-item";

        row.innerHTML = `

            <img
                src="${item.image}"
                alt="${escapeHTML(item.name)}">

            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <strong>
                    ${formatPrice(item.price)}
                </strong>

                <div class="quantity-controls">

                    <button
                        onclick="changeCartQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeCartQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-cart-btn"
                onclick="removeFromCart(${item.id})"
                aria-label="Remove item">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        cartItems.appendChild(row);

    });

}


function saveCart() {

    localStorage.setItem(
        "foodieCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   CART SIDEBAR
========================================================= */

function toggleCart() {

    const sidebar =
        document.getElementById("cart-sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");

    document.body.classList.toggle(
        "cart-open",
        sidebar.classList.contains("open")
    );

}


/* =========================================================
   COUPON
========================================================= */

function applyCoupon() {

    const input =
        document.getElementById("coupon-input");

    if (!input) return;


    const code =
        input.value
            .trim()
            .toUpperCase();


    const subtotal =
        getCartSubtotal();


    if (!code) {

        showToast(
            "Please enter a promo code."
        );

        return;

    }


    if (code === "FOODIE10") {

        appliedDiscount =
            Math.round(subtotal * 0.10);

        showToast(
            "10% discount applied 🎉"
        );

    } else if (code === "WELCOME200") {

        appliedDiscount =
            Math.min(200, subtotal);

        showToast(
            "PKR 200 discount applied 🎉"
        );

    } else {

        appliedDiscount = 0;

        showToast(
            "Invalid promo code."
        );

    }


    updateCart();

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id, event) {

    if (event)
        event.stopPropagation();


    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(itemId => itemId !== id);

        showToast("Removed from wishlist.");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist ❤️");

        playSuccessSound();

    }


    localStorage.setItem(
        "foodieWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlist();

    renderMenu();

}


function updateWishlist() {

    const count =
        document.getElementById("wishlist-count");

    if (count)
        count.textContent =
            wishlist.length;


    renderWishlistItems();

}


function renderWishlistItems() {

    const container =
        document.getElementById("wishlist-items");

    if (!container) return;


    const items =
        menuData.filter(item =>
            wishlist.includes(item.id)
        );


    if (items.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-heart"></i>

                <h3>Your wishlist is empty</h3>

                <p>Add your favorite dishes here.</p>

            </div>

        `;

        return;

    }


    container.innerHTML = items
        .map(item => `

            <div class="wishlist-item">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}">

                <div>

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <strong>
                        ${formatPrice(item.price)}
                    </strong>

                </div>

                <button
                    onclick="addToCart(${item.id})">

                    <i class="fa-solid fa-cart-plus"></i>

                </button>

                <button
                    onclick="toggleWishlist(${item.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `)
        .join("");

}


function toggleWishlistModal() {

    const modal =
        document.getElementById(
            "wishlist-modal"
        );

    if (!modal) return;

    modal.classList.toggle("hidden");

    renderWishlistItems();

}


/* =========================================================
   ITEM DETAIL
========================================================= */

function openItemDetailModal(id) {

    const item =
        menuData.find(food => food.id === id);

    if (!item) return;


    selectedDetailItem = item;


    const modal =
        document.getElementById(
            "item-detail-modal"
        );

    const body =
        document.getElementById(
            "item-detail-body"
        );


    if (!modal || !body) return;


    body.innerHTML = `

        <div class="detail-layout">

            <img
                src="${item.image}"
                alt="${escapeHTML(item.name)}">

            <div class="detail-info">

                <span>
                    ${escapeHTML(item.category)}
                </span>

                <h2>
                    ${escapeHTML(item.name)}
                </h2>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <strong class="detail-price">
                    ${formatPrice(item.price)}
                </strong>

                <button
                    class="primary-btn full-btn"
                    onclick="addToCart(${item.id}); closeItemDetailModal();">

                    <i class="fa-solid fa-cart-plus"></i>
                    Add To Cart

                </button>

            </div>

        </div>

    `;


    modal.classList.remove("hidden");

}


function closeItemDetailModal() {

    document
        .getElementById("item-detail-modal")
        ?.classList.add("hidden");

}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty. Add food first!"
        );

        return;

    }


    const modal =
        document.getElementById(
            "checkout-modal"
        );

    if (!modal) return;


    modal.classList.remove("hidden");

    toggleCartIfOpen();

}


function toggleCartIfOpen() {

    const sidebar =
        document.getElementById(
            "cart-sidebar"
        );

    if (
        sidebar &&
        sidebar.classList.contains("open")
    ) {

        sidebar.classList.remove("open");

        document.body.classList.remove(
            "cart-open"
        );

    }

}


function closeCheckoutModal() {

    document
        .getElementById("checkout-modal")
        ?.classList.add("hidden");

}


function togglePaymentInfo() {

    const select =
        document.getElementById(
            "payment-method"
        );

    const details =
        document.getElementById(
            "online-payment-details"
        );

    if (!select || !details) return;


    if (
        select.value === "Cash on Delivery" ||
        !select.value
    ) {

        details.classList.add("hidden");

    } else {

        details.classList.remove("hidden");

    }

}


/* =========================================================
   PROCESS ORDER
========================================================= */

function processOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        showToast(
            "Your cart is empty."
        );

        return;

    }


    const name =
        document.getElementById(
            "cust-name"
        )?.value.trim();


    const phone =
        document.getElementById(
            "cust-phone"
        )?.value.trim();


    const address =
        document.getElementById(
            "cust-address"
        )?.value.trim();


    const payment =
        document.getElementById(
            "payment-method"
        )?.value;


    if (
        !name ||
        !phone ||
        !address ||
        !payment
    ) {

        showToast(
            "Please complete all checkout fields."
        );

        return;

    }


    const orderNumber =
        "FE" +
        Date.now()
            .toString()
            .slice(-8);


    const order = {

        id: orderNumber,

        date:
            new Date().toLocaleString(),

        customer: {
            name,
            phone,
            address
        },

        payment,

        items: getCartItems(),

        subtotal: getCartSubtotal(),

        discount: appliedDiscount,

        total: getCartTotal()

    };


    orderHistory.unshift(order);


    localStorage.setItem(
        "foodieOrders",
        JSON.stringify(orderHistory)
    );


    sendOrderToWhatsApp(order);


    cart = [];

    appliedDiscount = 0;

    saveCart();

    updateCart();

    updateDashboard();


    closeCheckoutModal();


    showTracking();


    showToast(
        `Order ${orderNumber} placed successfully! 🎉`
    );


    playSuccessSound();


    document
        .getElementById("checkout-form")
        ?.reset();


    togglePaymentInfo();

}


/* =========================================================
   WHATSAPP ORDER
========================================================= */

function sendOrderToWhatsApp(order) {

    const itemsText =
        order.items
            .map(item =>
                `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
            )
            .join("\n");


    const message = `

🍔 *FOODIE EXPRESS ORDER*

📦 Order ID: ${order.id}

👤 Customer:
${order.customer.name}

📱 Phone:
${order.customer.phone}

📍 Address:
${order.customer.address}

💳 Payment:
${order.payment}

🍽️ Items:
${itemsText}

💰 Subtotal:
${formatPrice(order.subtotal)}

🎁 Discount:
${formatPrice(order.discount)}

💵 *Total:
${formatPrice(order.total)}*

Please confirm my order.

`.trim();


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   TRACKING
========================================================= */

function showTracking() {

    const section =
        document.getElementById(
            "tracking-section"
        );

    if (!section) return;


    section.classList.remove("hidden");


    section.scrollIntoView({
        behavior: "smooth"
    });


    animateTracking();


}


function animateTracking() {

    const steps =
        document.querySelectorAll(
            ".tracking-step"
        );


    steps.forEach(step =>
        step.classList.remove("active")
    );


    steps.forEach((step, index) => {

        setTimeout(() => {

            step.classList.add("active");

        }, index * 1300);

    });

}


/* =========================================================
   AUTH
========================================================= */

function openAuthModal() {

    const modal =
        document.getElementById("auth-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

    switchAuthScreen(
        currentUser
            ? "login"
            : "login"
    );

}


function closeAuthModal() {

    document
        .getElementById("auth-modal")
        ?.classList.add("hidden");

}


function switchAuthScreen(screen) {

    const login =
        document.getElementById(
            "login-screen"
        );

    const signup =
        document.getElementById(
            "signup-screen"
        );


    if (!login || !signup) return;


    login.classList.toggle(
        "hidden",
        screen !== "login"
    );


    signup.classList.toggle(
        "hidden",
        screen !== "signup"
    );

}


function handleAuth(event, type) {

    event.preventDefault();


    if (type === "signup") {

        const name =
            document.getElementById(
                "signup-name"
            )?.value.trim();


        const email =
            document.getElementById(
                "signup-email"
            )?.value.trim();


        const password =
            document.getElementById(
                "signup-password"
            )?.value;


        if (!name || !email || !password) {

            showToast(
                "Please complete all signup fields."
            );

            return;

        }


        currentUser = {

            name,
            email,

            coins: 0

        };


        localStorage.setItem(
            "foodieUser",
            JSON.stringify(currentUser)
        );


        showToast(
            "Account created successfully 🎉"
        );


        switchAuthScreen("login");

        return;

    }


    const email =
        document.getElementById(
            "login-email"
        )?.value.trim();


    const password =
        document.getElementById(
            "login-password"
        )?.value;


    if (!email || !password) {

        showToast(
            "Please enter email and password."
        );

        return;

    }


    currentUser = {

        name:
            email.split("@")[0],

        email,

        coins:
            currentUser?.coins || 0

    };


    localStorage.setItem(
        "foodieUser",
        JSON.stringify(currentUser)
    );


    closeAuthModal();

    updateDashboard();

    showToast(
        `Welcome back, ${currentUser.name}! 👋`
    );

}


function handleLogout() {

    currentUser = null;

    localStorage.removeItem(
        "foodieUser"
    );

    updateDashboard();

    closeDashboardModal();

    showToast(
        "You have been logged out."
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function openDashboardModal() {

    const modal =
        document.getElementById(
            "dashboard-modal"
        );

    if (!modal) return;

    updateDashboard();

    modal.classList.remove("hidden");

}


function closeDashboardModal() {

    document
        .getElementById(
            "dashboard-modal"
        )
        ?.classList.add("hidden");

}


function updateDashboard() {

    const name =
        document.getElementById(
            "dash-user-name"
        );

    const email =
        document.getElementById(
            "dash-user-email"
        );

    const coins =
        document.getElementById(
            "dash-user-coins"
        );

    const totalOrders =
        document.getElementById(
            "dash-total-orders"
        );


    if (name) {

        name.textContent =
            currentUser?.name ||
            "Guest User";

    }


    if (email) {

        email.textContent =
            currentUser?.email ||
            "Login to unlock your account.";

    }


    if (coins) {

        coins.textContent =
            currentUser?.coins ||
            0;

    }


    if (totalOrders) {

        totalOrders.textContent =
            orderHistory.length;

    }


    renderOrderHistory();

}


function renderOrderHistory() {

    const container =
        document.getElementById(
            "history-container"
        );

    if (!container) return;


    if (orderHistory.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-receipt"></i>

                <h3>No orders yet</h3>

                <p>
                    Your completed orders will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        orderHistory
            .map(order => `

                <div class="history-item">

                    <div>

                        <strong>
                            ${escapeHTML(order.id)}
                        </strong>

                        <p>
                            ${escapeHTML(order.date)}
                        </p>

                    </div>

                    <strong>
                        ${formatPrice(order.total)}
                    </strong>

                </div>

            `)
            .join("");

}


/* =========================================================
   AI FOOD ASSISTANT
========================================================= */

function startAICallSimulation() {

    const suggestions = [

        "Try our Zinger Burger 🍔",
        "Chicken Biryani is a customer favorite 🍚",
        "Our BBQ Platter is perfect for sharing 🔥",
        "Want something sweet? Try our Chocolate Shake 🍫",
        "For a refreshing choice, try Fresh Lime 🍋",
        "Chicken Pizza would be a delicious choice 🍕"

    ];


    const random =
        suggestions[
            Math.floor(
                Math.random() *
                suggestions.length
            )
        ];


    showToast(
        `AI Recommendation: ${random}`,
        5000
    );


    setTimeout(() => {

        const match =
            menuData.find(item =>
                random
                    .toLowerCase()
                    .includes(
                        item.name
                            .toLowerCase()
                    )
            );


        if (match) {

            openItemDetailModal(match.id);

        }

    }, 1000);

}


function startAIVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        showToast(
            "AI voice is not supported in this browser."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        currentLanguage === "ur"
            ? "ur-PK"
            : "en-US";


    recognition.onstart = () => {

        showToast(
            "AI is listening... 🎤"
        );

    };


    recognition.onresult = event => {

        const text =
            event.results[0][0].transcript;


        const lower =
            text.toLowerCase();


        const result =
            menuData.find(item =>
                (
                    item.name +
                    " " +
                    item.category +
                    " " +
                    item.tags.join(" ")
                )
                .toLowerCase()
                .includes(lower)
            );


        if (result) {

            openItemDetailModal(result.id);

        } else {

            showToast(
                `AI heard: "${text}". Try saying a food name.`
            );

        }

    };


    recognition.start();

}


/* =========================================================
   CHATBOT
========================================================= */

function toggleChatbot() {

    const chat =
        document.getElementById(
            "chat-window"
        );

    if (!chat) return;

    chat.classList.toggle("hidden");

    if (!chat.classList.contains("hidden")) {

        document
            .getElementById("chat-input")
            ?.focus();

    }

}


function handleChatKeyPress(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendChatMessage();

    }

}


function sendChatMessage() {

    const input =
        document.getElementById(
            "chat-input"
        );


    const messages =
        document.getElementById(
            "chat-messages"
        );


    if (!input || !messages) return;


    const text =
        input.value.trim();


    if (!text) return;


    addChatMessage(
        text,
        "user"
    );


    input.value = "";


    setTimeout(() => {

        const reply =
            generateChatReply(text);


        addChatMessage(
            reply,
            "bot"
        );

    }, 500);

}


function addChatMessage(text, type) {

    const messages =
        document.getElementById(
            "chat-messages"
        );


    if (!messages) return;


    const message =
        document.createElement("div");


    message.className =
        `chat-msg ${type}`;


    message.textContent =
        text;


    messages.appendChild(message);


    messages.scrollTop =
        messages.scrollHeight;

}


function generateChatReply(message) {

    const text =
        message
            .toLowerCase()
            .trim();


    /* Greeting */

    if (
        /\b(hi|hello|hey|salam|assalam|aoa)\b/
            .test(text)
    ) {

        return "Hello! 👋 Welcome to Foodie Express. Aap menu, order, delivery, price ya recommendation ke bare mein pooch sakte hain.";

    }


    /* Menu */

    if (
        text.includes("menu") ||
        text.includes("food")
    ) {

        return "Hamare menu mein Fast Food, Desi Cuisine, BBQ & Grills aur Drinks & Shakes available hain. Aap kisi bhi food ka naam search kar sakte hain.";

    }


    /* Fast Food */

    if (
        text.includes("fast food") ||
        text.includes("burger") ||
        text.includes("pizza")
    ) {

        return "Fast Food mein Zinger Burger, Beef Burger, Chicken Pizza aur French Fries available hain. Menu mein Fast Food filter select karein.";

    }


    /* Biryani */

    if (text.includes("biryani")) {

        return "Chicken Biryani hamare Desi Cuisine section mein hai. Aap menu mein 'Biryani' search karke directly dekh sakte hain.";

    }


    /* BBQ */

    if (
        text.includes("bbq") ||
        text.includes("kabab") ||
        text.includes("tikka")
    ) {

        return "BBQ section mein Seekh Kabab, Chicken Tikka aur BBQ Platter available hain.";

    }


    /* Drinks */

    if (
        text.includes("drink") ||
        text.includes("shake") ||
        text.includes("juice")
    ) {

        return "Drinks & Shakes mein Mango Shake, Chocolate Shake aur Fresh Lime available hain.";

    }


    /* Price */

    if (
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("kitne")
    ) {

        const found =
            menuData.find(item =>
                text.includes(
                    item.name.toLowerCase()
                )
            );


        if (found) {

            return `${found.name} ki price ${formatPrice(found.price)} hai.`;

        }


        return "Aap jis food ki price poochna chahte hain uska naam likhein, example: Zinger Burger price.";

    }


    /* Delivery */

    if (
        text.includes("delivery") ||
        text.includes("deliver")
    ) {

        return "Foodie Express ka focus fast aur safe food delivery par hai. Checkout mein apna complete address enter karein.";

    }


    /* Order */

    if (
        text.includes("order") ||
        text.includes("checkout")
    ) {

        return "Food select karein → Add to Cart press karein → Cart open karein → Proceed to Checkout press karein → details fill karein → Place Order.";

    }


    /* WhatsApp */

    if (
        text.includes("whatsapp") ||
        text.includes("contact")
    ) {

        return "Checkout complete karne ke baad order details WhatsApp par automatically open ho jayengi.";

    }


    /* Thanks */

    if (
        text.includes("thanks") ||
        text.includes("thank you")
    ) {

        return "You're welcome! ❤️ Enjoy your meal! 🍔";

    }


    /* Help */

    if (
        text.includes("help") ||
        text.includes("how")
    ) {

        return "Main menu search, food recommendations, prices, ordering, checkout aur delivery ke bare mein help kar sakta hoon.";

    }


    /* Food-specific dynamic search */

    const foundFood =
        menuData.find(item => {

            const words = [
                item.name,
                ...item.tags
            ];

            return words.some(word =>
                text.includes(
                    word.toLowerCase()
                )
            );

        });


    if (foundFood) {

        return `${foundFood.name} ${formatPrice(foundFood.price)} ka hai. Isay menu se Add to Cart kar sakte hain.`;

    }


    return "Main aapki help karna chahta hoon 😊 Aap food ka naam, price, menu, order, checkout, delivery ya WhatsApp ke bare mein pooch sakte hain.";

}


/* =========================================================
   RESERVATION
========================================================= */

function setupReservationDate() {

    const date =
        document.getElementById(
            "reservation-date"
        );

    if (!date) return;


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    date.min = today;

}


function submitReservation() {

    showToast(
        "Reservation request submitted successfully! 📅"
    );

}


/* =========================================================
   LOCATION
========================================================= */

function detectUserLocation() {

    if (!navigator.geolocation) {

        showToast(
            "Location is not supported by this browser."
        );

        return;

    }


    showToast(
        "Detecting your location... 📍"
    );


    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;


            const mapsUrl =
                `https://www.google.com/maps/search/restaurants/@${lat},${lng},14z`;


            window.open(
                mapsUrl,
                "_blank",
                "noopener,noreferrer"
            );


            showToast(
                "Nearby restaurants opened 📍"
            );

        },

        () => {

            showToast(
                "Location permission was denied."
            );

        }

    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message, duration = 3000) {

    const container =
        document.getElementById(
            "toast-container"
        );


    if (!container) {

        alert(message);

        return;

    }


    const toast =
        document.createElement("div");


    toast.className =
        "toast";


    toast.innerHTML = `

        <span>
            ${escapeHTML(message)}
        </span>

        <button
            aria-label="Close notification">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    toast
        .querySelector("button")
        ?.addEventListener(
            "click",
            () => toast.remove()
        );


    container.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("hide");

        setTimeout(
            () => toast.remove(),
            300
        );

    }, duration);

}


/* =========================================================
   SOUND SYSTEM
========================================================= */

let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioCtx)
            return null;

        audioContext =
            new AudioCtx();

    }


    return audioContext;

}


function playTone(
    frequency = 600,
    duration = 0.08,
    type = "sine"
) {

    const ctx =
        getAudioContext();

    if (!ctx) return;


    if (ctx.state === "suspended") {

        ctx.resume();

    }


    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.type = type;

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.08,
        ctx.currentTime + 0.01
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(ctx.destination);


    oscillator.start();

    oscillator.stop(
        ctx.currentTime + duration
    );

}


function playClickSound() {

    playTone(
        650,
        0.06,
        "sine"
    );

}


function playSuccessSound() {

    playTone(
        600,
        0.08,
        "sine"
    );


    setTimeout(
        () =>
            playTone(
                850,
                0.12,
                "sine"
            ),
        90
    );

}


function playNotificationSound() {

    playTone(
        750,
        0.08,
        "triangle"
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /* ESC closes modals */

            if (event.key === "Escape") {

                closeAllOverlays();

            }


            /* CTRL + K focuses search */

            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                document
                    .getElementById(
                        "search-input"
                    )
                    ?.focus();

            }

        }
    );

}


function closeAllOverlays() {

    [
        "wishlist-modal",
        "checkout-modal",
        "auth-modal",
        "dashboard-modal",
        "item-detail-modal"
    ]
        .forEach(id => {

            document
                .getElementById(id)
                ?.classList.add("hidden");

        });


    document
        .getElementById("chat-window")
        ?.classList.add("hidden");


    const sidebar =
        document.getElementById(
            "cart-sidebar"
        );


    if (sidebar) {

        sidebar.classList.remove("open");

        document.body.classList.remove(
            "cart-open"
        );

    }

}


/* =========================================================
   SCROLL EFFECTS
========================================================= */

function setupScrollEffects() {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 20) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        },
        { passive: true }
    );

}


/* =========================================================
   SECURITY / HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            updateCart();

        }

    }
);


/* =========================================================
   GLOBAL CLICK SOUND
========================================================= */

document.addEventListener(
    "click",
    event => {

        const target =
            event.target.closest(
                "button, .primary-btn, .secondary-btn, .filter-btn, .add-cart-btn"
            );


        if (target) {

            try {

                playClickSound();

            } catch (error) {

                /* Audio is optional */

            }

        }

    }
);


/* =========================================================
   PREVENT BROKEN # LINKS
========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   EXPORT GLOBAL FUNCTIONS
   Required because HTML onclick attributes use them.
========================================================= */

window.toggleDarkMode = toggleDarkMode;
window.changeCurrency = changeCurrency;
window.changeLanguage = changeLanguage;

window.searchMenu = searchMenu;
window.startVoiceSearch = startVoiceSearch;
window.filterMenu = filterMenu;

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeCartQuantity = changeCartQuantity;
window.toggleCart = toggleCart;
window.applyCoupon = applyCoupon;
window.checkout = checkout;

window.toggleWishlist = toggleWishlist;
window.toggleWishlistModal = toggleWishlistModal;

window.openItemDetailModal =
    openItemDetailModal;

window.closeItemDetailModal =
    closeItemDetailModal;

window.closeCheckoutModal =
    closeCheckoutModal;

window.togglePaymentInfo =
    togglePaymentInfo;

window.processOrder =
    processOrder;

window.openAuthModal =
    openAuthModal;

window.closeAuthModal =
    closeAuthModal;

window.switchAuthScreen =
    switchAuthScreen;

window.handleAuth =
    handleAuth;

window.handleLogout =
    handleLogout;

window.openDashboardModal =
    openDashboardModal;

window.closeDashboardModal =
    closeDashboardModal;

window.startAICallSimulation =
    startAICallSimulation;

window.startAIVoiceInput =
    startAIVoiceInput;

window.toggleChatbot =
    toggleChatbot;

window.handleChatKeyPress =
    handleChatKeyPress;

window.sendChatMessage =
    sendChatMessage;

window.detectUserLocation =
    detectUserLocation;

window.showToast =
    showToast;


/* =========================================================
   END
========================================================= */
