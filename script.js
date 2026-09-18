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

    const item =
        menuItems.find(
            product => product.id === normalizedItemId
        );

    if (!item) return;

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

            price: item.price,

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

    if (!item) return;

    item.id =
        normalizedItemId;

    item.quantity =
        Number(item.quantity) || 1;

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
            Number(item.quantity) || 1;

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

}


/* =========================================================
   CART TOGGLE
========================================================= */

function toggleCart() {

    const sidebar =
        document.getElementById("cart-sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");

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

    if (!code) {

        showToast(
            "Please enter a promo code.",
            "error"
        );

        return;
    }

    if (code === "FOODIE50") {

        currentDiscount = 10;

        showToast(
            "10% discount applied successfully!"
        );

    } else if (code === "WELCOME") {

        currentDiscount = 5;

        showToast(
            "5% welcome discount applied!"
        );

    } else {

        currentDiscount = 0;

        showToast(
            "Invalid promo code.",
            "error"
        );

    }

    updateCartUI();
}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(itemId) {

    const normalizedItemId =
        Number(itemId);

    const item =
        menuItems.find(
            product => product.id === normalizedItemId
        );

    if (!item) return;

    const index =
        wishlist.indexOf(normalizedItemId);

    if (index === -1) {

        wishlist.push(normalizedItemId);

        showToast(
            `${item.name} added to wishlist!`
        );

    } else {

        wishlist.splice(index, 1);

        showToast(
            `${item.name} removed from wishlist.`
        );

    }

    saveWishlistToStorage();

    updateWishlistUI();

    renderMenu(
        getVisibleMenuItems()
    );
}


function updateWishlistUI() {

    const count =
        document.getElementById("wishlist-count");

    const container =
        document.getElementById("wishlist-items");

    if (count) {

        count.textContent =
            wishlist.length;

    }

    if (!container) return;

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <i class="fa-regular fa-heart"></i>

                <h3>Your wishlist is empty</h3>

                <p>
                    Add your favorite dishes here.
                </p>

            </div>
        `;

        return;
    }

    container.innerHTML = "";

    wishlist.forEach(id => {

        const normalizedId =
            Number(id);

        const item =
            menuItems.find(
                product =>
                    product.id === normalizedId
            );

        if (!item) return;

        const element =
            document.createElement("div");

        element.className =
            "wishlist-item";

        element.innerHTML = `
            <img
                src="${item.image}"
                alt="${escapeHTML(item.name)}">

            <div class="wishlist-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                </p>

            </div>

            <div class="wishlist-item-actions">

                <button
                    type="button"
                    onclick="addToCart(${item.id})"
                    title="Add to Cart">

                    <i class="fa-solid fa-cart-plus"></i>

                </button>

                <button
                    type="button"
                    onclick="toggleWishlist(${item.id})"
                    title="Remove">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

        container.appendChild(element);

    });

}


function toggleWishlistModal() {

    const modal =
        document.getElementById("wishlist-modal");

    if (!modal) return;

    modal.classList.toggle("hidden");

    updateWishlistUI();
}


/* =========================================================
   VISIBLE MENU
========================================================= */

function getVisibleMenuItems() {

    const searchInput =
        document.getElementById("search-input");

    const query =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    return menuItems.filter(item => {

        const categoryMatch =
            currentCategory === "All" ||
            item.category === currentCategory;

        const searchMatch =
            !query ||
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query);

        return categoryMatch && searchMatch;

    });
}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty. Add some food first.",
            "error"
        );

        return;
    }

    const modal =
        document.getElementById("checkout-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

}


function closeCheckoutModal() {

    const modal =
        document.getElementById("checkout-modal");

    if (modal) {

        modal.classList.add("hidden");

    }
}


function togglePaymentInfo() {

    const method =
        document.getElementById("payment-method");

    const details =
        document.getElementById("online-payment-details");

    if (!method || !details) return;

    const onlineMethods =
        [
            "JazzCash",
            "EasyPaisa",
            "Card"
        ];

    details.classList.toggle(
        "hidden",
        !onlineMethods.includes(method.value)
    );
}


/* =========================================================
   PROCESS ORDER
========================================================= */

function processOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {

        showToast(
            "Your cart is empty.",
            "error"
        );

        return;
    }

    const name =
        document.getElementById("cust-name")
            ?.value.trim();

    const phone =
        document.getElementById("cust-phone")
            ?.value.trim();

    const address =
        document.getElementById("cust-address")
            ?.value.trim();

    const payment =
        document.getElementById("payment-method")
            ?.value;

    if (!name || !phone || !address || !payment) {

        showToast(
            "Please complete all checkout fields.",
            "error"
        );

        return;
    }

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });

    const discount =
        subtotal * (currentDiscount / 100);

    const total =
        Math.max(
            0,
            subtotal - discount
        );

    const orderId =
        "FE-" +
        Date.now()
            .toString()
            .slice(-8);

    const order = {

        id: orderId,

        customer: {
            name,
            phone,
            address
        },

        payment,

        items: JSON.parse(
            JSON.stringify(cart)
        ),

        subtotal,

        discount,

        total,

        currency: currentCurrency,

        date:
            new Date().toLocaleString(),

        status: "Order Placed"

    };

    orderHistory.unshift(order);

    totalOrders += 1;

    loyaltyCoins +=
        Math.floor(total / 100);

    saveOrderHistory();

    saveUserData();


    /* ---------------- CLEAR CART ---------------- */

    cart = [];

    currentDiscount = 0;

    saveCartToStorage();

    updateCartUI();

    renderOrderHistory();


    /* ---------------- CLOSE CHECKOUT ---------------- */

    closeCheckoutModal();

    const form =
        document.getElementById("checkout-form");

    if (form) {

        form.reset();

    }


    showToast(
        `Order ${orderId} placed successfully!`
    );

    playCustomSound();

    startOrderTrackingSimulation();


    const sidebar =
        document.getElementById("cart-sidebar");

    if (sidebar) {

        sidebar.classList.remove("open");

    }


    const tracking =
        document.getElementById("tracking-section");

    if (tracking) {

        setTimeout(() => {

            tracking.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 500);

    }
}


/* =========================================================
   ORDER TRACKING
========================================================= */

function startOrderTrackingSimulation() {

    const section =
        document.getElementById("tracking-section");

    if (!section) return;

    section.classList.remove("hidden");

    const steps =
        [
            "step-1",
            "step-2",
            "step-3",
            "step-4"
        ];

    steps.forEach((id, index) => {

        const step =
            document.getElementById(id);

        if (step) {

            step.classList.toggle(
                "active",
                index === 0
            );

        }

    });

    if (trackingTimer) {

        clearInterval(trackingTimer);

    }

    let currentStep = 1;

    trackingTimer =
        setInterval(() => {

            const step =
                document.getElementById(
                    `step-${currentStep}`
                );

            if (step) {

                step.classList.add("active");

            }

            currentStep++;

            if (currentStep > 4) {

                clearInterval(trackingTimer);

                showToast(
                    "Your order has been delivered! Enjoy your meal 🎉"
                );

            }

        }, 3500);
}


/* =========================================================
   ORDER HISTORY
========================================================= */

function renderOrderHistory() {

    const container =
        document.getElementById("history-container");

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

    container.innerHTML = "";

    orderHistory.forEach(order => {

        const element =
            document.createElement("div");

        element.className =
            "history-item";

        const itemNames =
            order.items
                .map(
                    item =>
                        `${item.name} × ${item.quantity}`
                )
                .join(", ");

        element.innerHTML = `
            <div class="history-item-top">

                <strong>
                    ${escapeHTML(order.id)}
                </strong>

                <span>
                    ${formatPrice(
                        order.total
                    )}
                </span>

            </div>

            <div>
                ${escapeHTML(itemNames)}
            </div>

            <small>
                ${escapeHTML(order.date)}
            </small>

        `;

        container.appendChild(element);

    });
}


/* =========================================================
   DASHBOARD
========================================================= */

function openDashboardModal() {

    const modal =
        document.getElementById("dashboard-modal");

    if (!modal) return;

    updateDashboard();

    modal.classList.remove("hidden");
}


function closeDashboardModal() {

    const modal =
        document.getElementById("dashboard-modal");

    if (modal) {

        modal.classList.add("hidden");

    }
}


function updateDashboard() {

    const name =
        document.getElementById("dash-user-name");

    const email =
        document.getElementById("dash-user-email");

    const coins =
        document.getElementById("dash-user-coins");

    const orders =
        document.getElementById("dash-total-orders");

    if (currentUser) {

        if (name) {

            name.textContent =
                currentUser.name || "User";

        }

        if (email) {

            email.textContent =
                currentUser.email || "";

        }

    } else {

        if (name) {

            name.textContent =
                "Guest User";

        }

        if (email) {

            email.textContent =
                "Login to unlock your account.";

        }

    }

    if (coins) {

        coins.textContent =
            loyaltyCoins;

    }

    if (orders) {

        orders.textContent =
            totalOrders;

    }

    renderOrderHistory();
}


/* =========================================================
   AUTH MODAL
========================================================= */

function openAuthModal() {

    const modal =
        document.getElementById("auth-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

    switchAuthScreen("login");
}


function closeAuthModal() {

    const modal =
        document.getElementById("auth-modal");

    if (modal) {

        modal.classList.add("hidden");

    }
}


function switchAuthScreen(screen) {

    const login =
        document.getElementById("login-screen");

    const signup =
        document.getElementById("signup-screen");

    if (!login || !signup) return;

    if (screen === "signup") {

        login.classList.add("hidden");
        signup.classList.remove("hidden");

    } else {

        signup.classList.add("hidden");
        login.classList.remove("hidden");

    }
}


/* =========================================================
   AUTH HANDLER
========================================================= */

function handleAuth(event, type) {

    event.preventDefault();

    if (type === "signup") {

        const name =
            document.getElementById("signup-name")
                ?.value.trim();

        const email =
            document.getElementById("signup-email")
                ?.value.trim();

        const password =
            document.getElementById("signup-password")
                ?.value;

        if (!name || !email || !password) {

            showToast(
                "Please complete all fields.",
                "error"
            );

            return;
        }

        const user = {
            name,
            email,
            password
        };

        localStorage.setItem(
            "foodieExpressAccount",
            JSON.stringify(user)
        );

        currentUser = {
            name,
            email
        };

        saveUserData();

        showToast(
            "Account created successfully!"
        );

        closeAuthModal();

        updateDashboard();

        return;
    }


    /* ---------------- LOGIN ---------------- */

    const email =
        document.getElementById("login-email")
            ?.value.trim();

    const password =
        document.getElementById("login-password")
            ?.value;

    const saved =
        localStorage.getItem(
            "foodieExpressAccount"
        );

    if (!saved) {

        showToast(
            "No account found. Please create an account first.",
            "error"
        );

        switchAuthScreen("signup");

        return;
    }

    let account;

    try {

        account =
            JSON.parse(saved);

    } catch {

        showToast(
            "Account data is corrupted.",
            "error"
        );

        return;
    }

    if (
        account.email === email &&
        account.password === password
    ) {

        currentUser = {
            name: account.name,
            email: account.email
        };

        saveUserData();

        showToast(
            `Welcome back, ${account.name}!`
        );

        closeAuthModal();

        updateDashboard();

    } else {

        showToast(
            "Incorrect email or password.",
            "error"
        );

    }
}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    currentUser = null;

    localStorage.removeItem(
        "foodieExpressUser"
    );

    closeDashboardModal();

    showToast(
        "You have been logged out."
    );
}


/* =========================================================
   CURRENCY
========================================================= */

function changeCurrency(currency) {

    if (!currencyRates[currency]) return;

    currentCurrency = currency;

    localStorage.setItem(
        "foodieExpressCurrency",
        currency
    );

    renderMenu(
        getVisibleMenuItems()
    );

    updateCartUI();

    updateWishlistUI();

    renderOrderHistory();

    showToast(
        `Currency changed to ${currency}.`
    );
}


/* =========================================================
   LANGUAGE
========================================================= */

function changeLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
        "foodieExpressLanguage",
        language
    );

    if (language === "ur") {

        showToast(
            "Urdu language selected. Food names remain in English for consistency."
        );

    } else {

        showToast(
            "English language selected."
        );

    }
}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

    const root =
        document.getElementById("html-root");

    if (!root) return;

    const current =
        root.getAttribute("data-theme") ||
        "light";

    const next =
        current === "dark"
            ? "light"
            : "dark";

    root.setAttribute(
        "data-theme",
        next
    );

    localStorage.setItem(
        "foodieExpressTheme",
        next
    );

    const button =
        document.getElementById("dark-mode-btn");

    if (button) {

        button.innerHTML =
            next === "dark"
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

    }
}


/* =========================================================
   LOCATION
========================================================= */

function detectUserLocation() {

    if (!navigator.geolocation) {

        showToast(
            "Location is not supported by your browser.",
            "error"
        );

        return;
    }

    showToast(
        "Requesting your location..."
    );

    navigator.geolocation.getCurrentPosition(

        position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            showToast(
                `Location detected: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
            );

        },

        () => {

            showToast(
                "Location permission was not granted.",
                "error"
            );

        }

    );
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
            "Voice search is not supported in this browser.",
            "error"
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    showToast(
        "Listening... Please say a food name."
    );

    recognition.onresult =
        event => {

            const text =
                event.results[0][0].transcript;

            const input =
                document.getElementById(
                    "search-input"
                );

            if (input) {

                input.value = text;

            }

            searchMenu(text);

        };

    recognition.onerror =
        () => {

            showToast(
                "Voice search could not be completed.",
                "error"
            );

        };
}


/* =========================================================
   AI ASSISTANT
========================================================= */

function startAICallSimulation() {

    const suggestions = [

        "Try our Classic Zinger Burger with Loaded Cheese Fries! 🍔",

        "For desi flavor, Chicken Biryani is a delicious choice! 🍛",

        "If you love BBQ, our BBQ Platter is perfect for sharing! 🔥",

        "Feeling thirsty? Try our creamy Mango Shake! 🥭",

        "For something premium, try our Grilled Beef Steak! 🥩"

    ];

    const suggestion =
        suggestions[
            Math.floor(
                Math.random() *
                suggestions.length
            )
        ];

    showToast(
        suggestion
    );
}


function startAIVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        showToast(
            "AI voice input is not supported in this browser.",
            "error"
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.start();

    showToast(
        "AI is listening..."
    );

    recognition.onresult =
        event => {

            const text =
                event.results[0][0].transcript;

            showToast(
                `AI heard: "${text}"`
            );

        };

    recognition.onerror =
        () => {

            showToast(
                "AI voice input failed.",
                "error"
            );

        };
}


/* =========================================================
   CHATBOT
========================================================= */

function toggleChatbot() {

    const chatWindow =
        document.getElementById(
            "chat-window"
        );

    if (!chatWindow) return;

    chatWindow.classList.toggle(
        "hidden"
    );
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

    const userText =
        input.value.trim();

    if (!userText) return;

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "chat-msg user";

    userMessage.textContent =
        userText;

    messages.appendChild(
        userMessage
    );

    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;


    setTimeout(() => {

        const reply =
            getChatbotReply(userText);

        const botMessage =
            document.createElement("div");

        botMessage.className =
            "chat-msg bot";

        botMessage.textContent =
            reply;

        messages.appendChild(
            botMessage
        );

        messages.scrollTop =
            messages.scrollHeight;

    }, 500);
}


function getChatbotReply(text) {

    const message =
        text.toLowerCase();

    if (
        message.includes("delivery") ||
        message.includes("deliver")
    ) {

        return "Our estimated delivery time is around 30 minutes, depending on your location.";

    }

    if (
        message.includes("discount") ||
        message.includes("promo") ||
        message.includes("coupon")
    ) {

        return "Try promo code FOODIE50 to receive a 10% discount.";

    }

    if (
        message.includes("burger")
    ) {

        return "Our Classic Zinger Burger and Loaded Beef Burger are popular choices.";

    }

    if (
        message.includes("biryani") ||
        message.includes("desi")
    ) {

        return "For desi food, try our Chicken Biryani or Chicken Karahi.";

    }

    if (
        message.includes("bbq") ||
        message.includes("grill")
    ) {

        return "Our BBQ Platter, Chicken Tikka and Malai Boti are great BBQ options.";

    }

    if (
        message.includes("drink") ||
        message.includes("shake")
    ) {

        return "You can try our Mango Shake, Chocolate Shake or Fresh Lime.";

    }

    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {

        return "Hello! 👋 Welcome to Foodie Express. What delicious food are you looking for?";

    }

    if (
        message.includes("price") ||
        message.includes("cost")
    ) {

        return "You can see the current price of every item directly on its food card.";

    }

    if (
        message.includes("thank")
    ) {

        return "You're very welcome! ❤️ Enjoy your meal.";

    }

    return "I can help you with food, prices, delivery, discounts and menu categories. What would you like to know?";
}


/* =========================================================
   LOYALTY UI
========================================================= */

function updateLoyaltyUI() {

    const coins =
        document.getElementById(
            "dash-user-coins"
        );

    if (coins) {

        coins.textContent =
            loyaltyCoins;

    }
}


/* =========================================================
   INITIALIZATION
========================================================= */

function loadSavedData() {

    try {

        const savedCart =
            localStorage.getItem(
                "foodieExpressCart"
            );

        if (savedCart) {

            cart =
                JSON.parse(savedCart);

        }

    } catch {

        cart = [];

    }


    /*
       IMPORTANT:
       Purani LocalStorage cart values ko clean aur
       numeric IDs / quantities mein convert karte hain.
    */

    normalizeCartData();

    saveCartToStorage();


    try {

        const savedWishlist =
            localStorage.getItem(
                "foodieExpressWishlist"
            );

        if (savedWishlist) {

            wishlist =
                JSON.parse(savedWishlist);

        }

    } catch {

        wishlist = [];

    }


    /*
       Wishlist IDs ko bhi numbers mein normalize karna.
    */

    if (Array.isArray(wishlist)) {

        wishlist =
            wishlist
                .map(id => Number(id))
                .filter(
                    id =>
                        menuItems.some(
                            item => item.id === id
                        )
                );

    } else {

        wishlist = [];

    }

    saveWishlistToStorage();


    try {

        const savedOrders =
            localStorage.getItem(
                "foodieExpressOrders"
            );

        if (savedOrders) {

            orderHistory =
                JSON.parse(savedOrders);

        }

    } catch {

        orderHistory = [];

    }


    if (!Array.isArray(orderHistory)) {

        orderHistory = [];

    }


    try {

        const savedUser =
            localStorage.getItem(
                "foodieExpressUser"
            );

        if (savedUser) {

            currentUser =
                JSON.parse(savedUser);

        }

    } catch {

        currentUser = null;

    }


    const savedCoins =
        localStorage.getItem(
            "foodieExpressCoins"
        );

    if (savedCoins) {

        loyaltyCoins =
            Number(savedCoins) || 0;

    }


    totalOrders =
        orderHistory.length;


    const savedCurrency =
        localStorage.getItem(
            "foodieExpressCurrency"
        );

    if (
        savedCurrency &&
        currencyRates[savedCurrency]
    ) {

        currentCurrency =
            savedCurrency;

    }


    const savedLanguage =
        localStorage.getItem(
            "foodieExpressLanguage"
        );

    if (savedLanguage) {

        currentLanguage =
            savedLanguage;

    }


    const savedTheme =
        localStorage.getItem(
            "foodieExpressTheme"
        );

    const root =
        document.getElementById(
            "html-root"
        );

    if (root) {

        root.setAttribute(
            "data-theme",
            savedTheme === "dark"
                ? "dark"
                : "light"
        );

    }

}


/* =========================================================
   UPDATE SELECTORS
========================================================= */

function updateSavedSelectors() {

    const currency =
        document.getElementById(
            "currency-selector"
        );

    const language =
        document.getElementById(
            "language-selector"
        );

    if (currency) {

        currency.value =
            currentCurrency;

    }

    if (language) {

        language.value =
            currentLanguage;

    }

}


/* =========================================================
   SETUP DATE
========================================================= */

function setupReservationDate() {

    const dateInput =
        document.getElementById(
            "reservation-date"
        );

    if (!dateInput) return;

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;

}


/* =========================================================
   NAVIGATION CLOSE ON ESC
========================================================= */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            const modals =
                document.querySelectorAll(
                    ".modal:not(.hidden)"
                );

            modals.forEach(modal => {

                modal.classList.add(
                    "hidden"
                );

            });

            const sidebar =
                document.getElementById(
                    "cart-sidebar"
                );

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );
}


/* =========================================================
   CLICK OUTSIDE CART
========================================================= */

function setupOutsideCartClick() {

    document.addEventListener(
        "click",
        event => {

            const sidebar =
                document.getElementById(
                    "cart-sidebar"
                );

            const cartButton =
                document.querySelector(
                    ".floating-cart"
                );

            if (!sidebar || !cartButton) {
                return;
            }

            if (
                !sidebar.classList.contains(
                    "open"
                )
            ) {
                return;
            }

            if (
                sidebar.contains(event.target) ||
                cartButton.contains(event.target)
            ) {
                return;
            }

            sidebar.classList.remove(
                "open"
            );

        }
    );
}


/* =========================================================
   WINDOW LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        loadSavedData();

        updateSavedSelectors();

        renderMenu(
            getVisibleMenuItems()
        );

        updateCartUI();

        updateWishlistUI();

        updateDashboard();

        updateLoyaltyUI();

        setupReservationDate();

        setupEscapeKey();

        setupOutsideCartClick();

    }
);


/* =========================================================
   GLOBAL EXPORTS
   Helpful when HTML inline onclick is used.
========================================================= */

window.playCustomSound =
    playCustomSound;

window.formatPrice =
    formatPrice;

window.changeCurrency =
    changeCurrency;

window.updateLoyaltyUI =
    updateLoyaltyUI;

window.showToast =
    showToast;

window.startVoiceSearch =
    startVoiceSearch;

window.detectUserLocation =
    detectUserLocation;

window.openItemDetail =
    openItemDetail;

window.closeItemDetailModal =
    closeItemDetailModal;

window.addFlavorToCart =
    addFlavorToCart;

window.renderMenu =
    renderMenu;

window.searchMenu =
    searchMenu;

window.filterMenu =
    filterMenu;

window.toggleWishlist =
    toggleWishlist;

window.updateWishlistUI =
    updateWishlistUI;

window.toggleWishlistModal =
    toggleWishlistModal;

window.toggleCart =
    toggleCart;

window.saveCartToStorage =
    saveCartToStorage;

window.addToCart =
    addToCart;

window.updateQuantity =
    updateQuantity;

window.removeFromCart =
    removeFromCart;

window.applyCoupon =
    applyCoupon;

window.updateCartUI =
    updateCartUI;

window.togglePaymentInfo =
    togglePaymentInfo;

window.checkout =
    checkout;

window.closeCheckoutModal =
    closeCheckoutModal;

window.processOrder =
    processOrder;

window.startOrderTrackingSimulation =
    startOrderTrackingSimulation;

window.renderOrderHistory =
    renderOrderHistory;

window.toggleChatbot =
    toggleChatbot;

window.sendChatMessage =
    sendChatMessage;

window.handleChatKeyPress =
    handleChatKeyPress;

window.startAICallSimulation =
    startAICallSimulation;

window.startAIVoiceInput =
    startAIVoiceInput;

window.changeLanguage =
    changeLanguage;

window.openAuthModal =
    openAuthModal;

window.switchAuthScreen =
    switchAuthScreen;

window.closeAuthModal =
    closeAuthModal;

window.handleAuth =
    handleAuth;

window.openDashboardModal =
    openDashboardModal;

window.closeDashboardModal =
    closeDashboardModal;

window.handleLogout =
    handleLogout;

window.toggleDarkMode =
    toggleDarkMode;
