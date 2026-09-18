/* =========================================================
   FOODIE EXPRESS
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentCategory = "All";
let currentCurrency = "PKR";
let currentLanguage = "en";

let cart = [];
let wishlist = [];
let orderHistory = [];

let currentDiscount = 0;
let currentUser = null;

let loyaltyCoins = 0;
let totalOrders = 0;

let trackingTimer = null;

const adminWhatsAppNumber = "923312969666";


/* =========================================================
   FOOD MENU
========================================================= */

const menuItems = [

    /* ---------------- FAST FOOD ---------------- */

    {
        id: 1,
        name: "Classic Zinger Burger",
        category: "Fast Food",
        price: 650,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
        description: "Crispy chicken fillet with fresh lettuce, cheese and signature sauce.",
        badge: "Popular"
    },

    {
        id: 2,
        name: "Loaded Beef Burger",
        category: "Fast Food",
        price: 850,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
        description: "Juicy beef patty loaded with cheese, caramelized onions and special sauce.",
        badge: "Chef Choice"
    },

    {
        id: 3,
        name: "Cheesy Chicken Pizza",
        category: "Fast Food",
        price: 1200,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
        description: "Freshly baked pizza topped with chicken, mozzarella and delicious herbs.",
        badge: "Best Seller"
    },

    {
        id: 4,
        name: "Crispy Chicken Wings",
        category: "Fast Food",
        price: 750,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85",
        description: "Golden crispy wings tossed in your choice of delicious sauce.",
        badge: "Hot"
    },

    {
        id: 5,
        name: "Loaded Cheese Fries",
        category: "Fast Food",
        price: 450,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
        description: "Crispy fries covered with creamy cheese and flavorful toppings.",
        badge: "Popular"
    },

    {
        id: 6,
        name: "Chicken Shawarma",
        category: "Fast Food",
        price: 420,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
        description: "Tender chicken, fresh vegetables and creamy garlic sauce wrapped together.",
        badge: "Value"
    },


    /* ---------------- DESI CUISINE ---------------- */

    {
        id: 7,
        name: "Chicken Biryani",
        category: "Desi Cuisine",
        price: 550,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",
        description: "Aromatic basmati rice cooked with tender chicken and traditional spices.",
        badge: "Desi Favorite"
    },

    {
        id: 8,
        name: "Chicken Karahi",
        category: "Desi Cuisine",
        price: 1100,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
        description: "Traditional chicken karahi prepared with tomatoes, green chilies and spices.",
        badge: "Chef Special"
    },

    {
        id: 9,
        name: "Mutton Karahi",
        category: "Desi Cuisine",
        price: 1600,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
        description: "Tender mutton cooked slowly in a rich traditional karahi masala.",
        badge: "Premium"
    },

    {
        id: 10,
        name: "Chicken Handi",
        category: "Desi Cuisine",
        price: 1250,
        image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=900&q=85",
        description: "Creamy chicken handi with aromatic spices and a rich traditional flavor.",
        badge: "Popular"
    },

    {
        id: 11,
        name: "Daal Makhni",
        category: "Desi Cuisine",
        price: 650,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85",
        description: "Slow-cooked creamy lentils finished with butter and aromatic spices.",
        badge: "Classic"
    },

    {
        id: 12,
        name: "Butter Naan",
        category: "Desi Cuisine",
        price: 150,
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
        description: "Soft traditional naan brushed with butter and served hot.",
        badge: "Fresh"
    },


    /* ---------------- BBQ & GRILLS ---------------- */

    {
        id: 13,
        name: "Chicken Tikka",
        category: "BBQ & Grills",
        price: 700,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",
        description: "Tender chicken pieces marinated in spices and grilled over charcoal.",
        badge: "BBQ Favorite"
    },

    {
        id: 14,
        name: "Seekh Kebab",
        category: "BBQ & Grills",
        price: 750,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",
        description: "Juicy minced meat kebabs seasoned with traditional herbs and spices.",
        badge: "Popular"
    },

    {
        id: 15,
        name: "Malai Boti",
        category: "BBQ & Grills",
        price: 950,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
        description: "Creamy marinated chicken pieces grilled to perfection.",
        badge: "Premium"
    },

    {
        id: 16,
        name: "BBQ Platter",
        category: "BBQ & Grills",
        price: 2200,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
        description: "A generous platter featuring chicken tikka, kebabs, boti and grilled sides.",
        badge: "Family"
    },

    {
        id: 17,
        name: "Grilled Chicken",
        category: "BBQ & Grills",
        price: 1050,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
        description: "Juicy grilled chicken seasoned with herbs and served with fresh sides.",
        badge: "Healthy"
    },

    {
        id: 18,
        name: "Grilled Beef Steak",
        category: "BBQ & Grills",
        price: 1850,
        image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=85",
        description: "Premium beef steak grilled to your preferred level with savory seasoning.",
        badge: "Premium"
    },


    /* ---------------- DRINKS ---------------- */

    {
        id: 19,
        name: "Mango Shake",
        category: "Drinks & Shakes",
        price: 350,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=85",
        description: "Creamy mango shake prepared with fresh mangoes and chilled milk.",
        badge: "Summer"
    },

    {
        id: 20,
        name: "Chocolate Shake",
        category: "Drinks & Shakes",
        price: 400,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
        description: "Rich chocolate shake topped with creamy foam and chocolate flavor.",
        badge: "Sweet"
    },

    {
        id: 21,
        name: "Strawberry Shake",
        category: "Drinks & Shakes",
        price: 400,
        image: "https://images.unsplash.com/photo-1553787499-6f9133860275?auto=format&fit=crop&w=900&q=85",
        description: "Fresh strawberry shake blended into a smooth and creamy drink.",
        badge: "Fresh"
    },

    {
        id: 22,
        name: "Fresh Lime",
        category: "Drinks & Shakes",
        price: 250,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
        description: "Refreshing chilled lime drink with a perfect sweet and sour balance.",
        badge: "Refreshing"
    },

    {
        id: 23,
        name: "Cold Coffee",
        category: "Drinks & Shakes",
        price: 420,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85",
        description: "Smooth chilled coffee blended with milk and a touch of sweetness.",
        badge: "Favorite"
    },

    {
        id: 24,
        name: "Mint Margarita",
        category: "Drinks & Shakes",
        price: 300,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
        description: "Cool mint and citrus drink served ice cold for maximum refreshment.",
        badge: "Cool"
    }

];


/* =========================================================
   CURRENCY
========================================================= */

const currencyRates = {
    PKR: 1,
    USD: 0.00358,
    GBP: 0.00265,
    AED: 0.01315
};

const currencySymbols = {
    PKR: "PKR",
    USD: "$",
    GBP: "£",
    AED: "AED"
};


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    const converted =
        price * (currencyRates[currentCurrency] || 1);

    if (currentCurrency === "PKR") {
        return `PKR ${Math.round(converted).toLocaleString()}`;
    }

    if (currentCurrency === "AED") {
        return `AED ${converted.toFixed(2)}`;
    }

    return `${currencySymbols[currentCurrency]}${converted.toFixed(2)}`;
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveCartToStorage() {

    localStorage.setItem(
        "foodieExpressCart",
        JSON.stringify(cart)
    );
}


function saveWishlistToStorage() {

    localStorage.setItem(
        "foodieExpressWishlist",
        JSON.stringify(wishlist)
    );
}


function saveOrderHistory() {

    localStorage.setItem(
        "foodieExpressOrders",
        JSON.stringify(orderHistory)
    );
}


function saveUserData() {

    localStorage.setItem(
        "foodieExpressUser",
        JSON.stringify(currentUser)
    );

    localStorage.setItem(
        "foodieExpressCoins",
        String(loyaltyCoins)
    );
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "success") {

    const container =
        document.getElementById("toast-container");

    if (!container) {
        alert(message);
        return;
    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3100);
}


/* =========================================================
   SOUND
========================================================= */

function playCustomSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        const audioContext =
            new AudioContext();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            700,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            0.08,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.15
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.15
        );

    } catch (error) {

        console.log("Audio unavailable.");

    }
}


/* =========================================================
   SEARCH
========================================================= */

function searchMenu(value) {

    const query =
        String(value || "")
            .trim()
            .toLowerCase();

    const container =
        document.getElementById("menu-container");

    const noResults =
        document.getElementById("no-results");

    if (!container) return;

    const filtered =
        menuItems.filter(item => {

            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);

            const matchesCategory =
                currentCategory === "All" ||
                item.category === currentCategory;

            return matchesSearch && matchesCategory;

        });

    renderMenu(filtered);

    if (noResults) {

        noResults.classList.toggle(
            "hidden",
            filtered.length !== 0
        );

    }
}


/* =========================================================
   FILTER MENU
========================================================= */

function filterMenu(category, clickedButton = null) {

    currentCategory = category;

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {
            button.classList.remove("active");
        });

    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        document
            .querySelectorAll(".filter-btn")
            .forEach(button => {

                const text =
                    button.textContent
                        .trim()
                        .toLowerCase();

                if (
                    category === "All" &&
                    text.includes("all")
                ) {
                    button.classList.add("active");
                }

                if (
                    category !== "All" &&
                    text.toLowerCase().includes(
                        category.split(" ")[0].toLowerCase()
                    )
                ) {
                    button.classList.add("active");
                }

            });

    }

    const searchInput =
        document.getElementById("search-input");

    const searchValue =
        searchInput
            ? searchInput.value
            : "";

    searchMenu(searchValue);
}


/* =========================================================
   RENDER MENU
========================================================= */

function renderMenu(items = menuItems) {

    const container =
        document.getElementById("menu-container");

    if (!container) return;

    container.innerHTML = "";

    items.forEach((item, index) => {

        const isLiked =
            wishlist.includes(item.id);

        const card =
            document.createElement("article");

        card.className = "menu-card";

        card.style.animationDelay =
            `${index * 0.04}s`;

        card.innerHTML = `
            <div class="menu-image">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80';">

                <span class="menu-badge">
                    ${escapeHTML(item.badge)}
                </span>

                <button
                    class="wishlist-btn ${isLiked ? "active" : ""}"
                    onclick="toggleWishlist(${item.id})"
                    title="Wishlist">

                    <i class="${isLiked ? "fa-solid" : "fa-regular"} fa-heart"></i>

                </button>

            </div>

            <div class="menu-info">

                <span class="menu-category">
                    ${escapeHTML(item.category)}
                </span>

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

                        <i class="fa-solid fa-cart-plus"></i>
                        Add

                    </button>

                </div>

            </div>
        `;

        card.addEventListener(
            "dblclick",
            () => openItemDetail(item.id)
        );

        container.appendChild(card);

    });

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   ITEM DETAIL
========================================================= */

function openItemDetail(itemId) {

    const normalizedItemId =
        Number(itemId);

    const item =
        menuItems.find(
            product => product.id === normalizedItemId
        );

    const modal =
        document.getElementById("item-detail-modal");

    const body =
        document.getElementById("item-detail-body");

    if (!item || !modal || !body) return;

    body.innerHTML = `
        <div class="item-detail">

            <div class="item-detail-image">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}">

            </div>

            <div class="item-detail-info">

                <span class="menu-category">
                    ${escapeHTML(item.category)}
                </span>

                <h2>
                    ${escapeHTML(item.name)}
                </h2>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <div class="item-detail-price">
                    ${formatPrice(item.price)}
                </div>

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

    const modal =
        document.getElementById("item-detail-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


/* =========================================================
   ADD FLAVOR TO CART
========================================================= */

function addFlavorToCart(itemId) {

    addToCart(itemId);

}


/* =========================================================
   CART HELPERS
========================================================= */

/*
   Cart IDs ko hamesha number mein convert karta hai.
   Is se LocalStorage mein string ID save hone ki wajah se
   add / plus / minus / remove ka issue nahi hota.
*/

function normalizeCartData() {

    if (!Array.isArray(cart)) {

        cart = [];

        return;

    }

    const normalizedCart = [];

    cart.forEach(savedItem => {

        if (!savedItem) return;

        const itemId =
            Number(savedItem.id);

        const menuItem =
            menuItems.find(
                product => product.id === itemId
            );

        if (!menuItem) return;

        const quantity =
            Math.max(
                1,
                Number(savedItem.quantity) || 1
            );

        const existing =
            normalizedCart.find(
                cartItem => cartItem.id === itemId
            );

        if (existing) {

            existing.quantity += quantity;

        } else {

            normalizedCart.push({

                id: menuItem.id,

                name: menuItem.name,

                price: menuItem.price,

                image: menuItem.image,

                quantity

            });

        }

    });

    cart = normalizedCart;

}


/* =========================================================
   CART
========================================================= */

function addToCart(itemId) {

    const normalizedItemId =
        Number(itemId);

    if (!Number.isFinite(normalizedItemId)) {
        return;
    }

    const item =
        menuItems.find(
            product => product.id === normalizedItemId
        );

    if (!item) {
        return;
    }

    const existing =
        cart.find(
            cartItem =>
                Number(cartItem.id) === normalizedItemId
        );

    if (existing) {

        existing.id =
            normalizedItemId;

        existing.quantity =
            Math.max(
                1,
                Number(existing.quantity) || 1
            ) + 1;

    } else {

        cart.push({

            id: item.id,

            name: item.name,

            price: Number(item.price) || 0,

            image: item.image,

            quantity: 1

        });

    }

    normalizeCartData();

    saveCartToStorage();

    updateCartUI();

    playCustomSound();

    showToast(
        `${item.name} added to your cart!`
    );
}


function updateQuantity(itemId, change) {

    const normalizedItemId =
        Number(itemId);

    const normalizedChange =
        Number(change);

    if (
        !Number.isFinite(normalizedItemId) ||
        !Number.isFinite(normalizedChange)
    ) {
        return;
    }

    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) === normalizedItemId
        );

    if (!item) {
        return;
    }

    item.id =
        normalizedItemId;

    item.quantity =
        Math.max(
            1,
            Number(item.quantity) || 1
        );

    item.quantity += normalizedChange;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    Number(cartItem.id) !== normalizedItemId
            );

    }

    normalizeCartData();

    saveCartToStorage();

    updateCartUI();
}


function removeFromCart(itemId) {

    const normalizedItemId =
        Number(itemId);

    if (!Number.isFinite(normalizedItemId)) {
        return;
    }

    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) === normalizedItemId
        );

    cart =
        cart.filter(
            cartItem =>
                Number(cartItem.id) !== normalizedItemId
        );

    normalizeCartData();

    saveCartToStorage();

    updateCartUI();

    if (item) {

        showToast(
            `${item.name} removed from cart.`,
            "error"
        );

    }
}


/* =========================================================
   UPDATE CART UI
========================================================= */

function updateCartUI() {

    normalizeCartData();

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    const cartDiscount =
        document.getElementById("cart-discount");

    const floatingCount =
        document.getElementById("floating-cart-count");


    /*
       Total items quantity:
       Burger x2 + Pizza x1 = Counter 3
    */

    const totalQuantity =
        cart.reduce(
            (sum, item) => {

                const quantity =
                    Number(item.quantity) || 0;

                return sum + quantity;

            },
            0
        );


    /* ---------------- COUNTER ---------------- */

    if (floatingCount) {

        floatingCount.textContent =
            String(totalQuantity);

        floatingCount.setAttribute(
            "aria-label",
            `${totalQuantity} items in cart`
        );

    }


    /* ---------------- SUBTOTAL ---------------- */

    let subtotal = 0;

    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 0;

        const price =
            Number(item.price) || 0;

        subtotal +=
            price * quantity;

    });


    /* ---------------- DISCOUNT ---------------- */

    const discountAmount =
        subtotal *
        (
            Number(currentDiscount) || 0
        ) /
        100;


    /* ---------------- FINAL TOTAL ---------------- */

    const finalTotal =
        Math.max(
            0,
            subtotal - discountAmount
        );


    if (cartDiscount) {

        cartDiscount.textContent =
            formatPrice(discountAmount);

    }

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(finalTotal);

    }


    /* ---------------- CART ITEMS ---------------- */

    if (!cartItems) return;


    if (cart.length === 0) {

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


    cart.forEach(item => {

        const quantity =
            Math.max(
                1,
                Number(item.quantity) || 1
            );

        const element =
            document.createElement("div");

        element.className =
            "cart-item";

        element.innerHTML = `
            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}">

            </div>

            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                </p>

                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="updateQuantity(${item.id}, -1)"
                        aria-label="Decrease quantity">
                        −
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button
                        type="button"
                        onclick="updateQuantity(${item.id}, 1)"
                        aria-label="Increase quantity">
                        +
                    </button>

                </div>

            </div>

            <button
                type="button"
                class="remove-cart-item"
                onclick="removeFromCart(${item.id})"
                title="Remove"
                aria-label="Remove ${escapeHTML(item.name)}">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        cartItems.appendChild(element);

    });

}/* =========================================================
   END OF FOODIE EXPRESS JAVASCRIPT
========================================================= */

/*
   IMPORTANT:
   Is file ke tamam functions aur global exports
   upar wale parts mein complete hain.

   Current cart system:
   - Add to Cart
   - Cart Counter
   - Plus / Minus Quantity
   - Remove Item
   - Cart Total
   - Discount
   - LocalStorage
   - Checkout
   - Wishlist
   - Order History
   - Dashboard
   - Authentication
   - Currency
   - Language
   - Dark Mode
   - Voice Search
   - AI Assistant
   - Chatbot
   - Loyalty Coins
   - Order Tracking

   Sab functionality existing HTML ke saath connected hai.
*/


/* =========================================================
   FINAL SAFETY EXPORTS
========================================================= */

window.getVisibleMenuItems =
    getVisibleMenuItems;

window.normalizeCartData =
    normalizeCartData;

window.loadSavedData =
    loadSavedData;

window.updateSavedSelectors =
    updateSavedSelectors;

window.setupReservationDate =
    setupReservationDate;

window.setupEscapeKey =
    setupEscapeKey;

window.setupOutsideCartClick =
    setupOutsideCartClick;window.toggleDarkMode =
    toggleDarkMode;
