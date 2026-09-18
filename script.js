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

}/* =========================================================
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

    const item =
        menuItems.find(
            product => product.id === itemId
        );

    if (!item) return;

    const modal =
        document.getElementById("item-detail-modal");

    if (!modal) return;

    const image =
        document.getElementById("detail-image");

    const name =
        document.getElementById("detail-name");

    const category =
        document.getElementById("detail-category");

    const description =
        document.getElementById("detail-description");

    const price =
        document.getElementById("detail-price");

    const rating =
        document.getElementById("detail-rating");

    const quantityInput =
        document.getElementById("detail-quantity");

    const addButton =
        document.getElementById("detail-add-btn");

    if (image) {
        image.src = item.image;
        image.alt = item.name;
    }

    if (name) {
        name.textContent = item.name;
    }

    if (category) {
        category.textContent = item.category;
    }

    if (description) {
        description.textContent =
            item.description || "Delicious food made with fresh ingredients.";
    }

    if (price) {
        price.textContent =
            formatPrice(item.price);
    }

    if (rating) {
        rating.innerHTML =
            `
            <span class="stars">
                ${generateStars(item.rating || 5)}
            </span>
            <span>
                ${item.rating || 5}
            </span>
            `;
    }

    if (quantityInput) {
        quantityInput.value = 1;
    }

    if (addButton) {

        addButton.onclick = () => {

            const quantity =
                parseInt(
                    quantityInput?.value || 1,
                    10
                );

            addToCart(
                item.id,
                quantity
            );

            closeItemDetail();

        };
    }

    modal.classList.remove("hidden");

    document.body.classList.add("no-scroll");
}


/* =========================================================
   CLOSE ITEM DETAIL
========================================================= */

function closeItemDetail() {

    const modal =
        document.getElementById("item-detail-modal");

    if (modal) {
        modal.classList.add("hidden");
    }

    document.body.classList.remove("no-scroll");
}


/* =========================================================
   DETAIL QUANTITY
========================================================= */

function increaseDetailQuantity() {

    const input =
        document.getElementById("detail-quantity");

    if (!input) return;

    let value =
        parseInt(input.value || 1, 10);

    value++;

    input.value = value;
}


function decreaseDetailQuantity() {

    const input =
        document.getElementById("detail-quantity");

    if (!input) return;

    let value =
        parseInt(input.value || 1, 10);

    if (value > 1) {
        value--;
    }

    input.value = value;
}


/* =========================================================
   SEARCH
========================================================= */

function searchMenu() {

    const searchInput =
        document.getElementById("search-input");

    if (!searchInput) return;

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    if (!searchTerm) {

        renderMenu(
            currentCategory,
            currentSort
        );

        return;
    }

    const results =
        menuItems.filter(item => {

            const name =
                String(item.name || "")
                    .toLowerCase();

            const category =
                String(item.category || "")
                    .toLowerCase();

            const description =
                String(item.description || "")
                    .toLowerCase();

            return (
                name.includes(searchTerm) ||
                category.includes(searchTerm) ||
                description.includes(searchTerm)
            );
        });

    renderFilteredMenu(results);
}


/* =========================================================
   FILTERED MENU
========================================================= */

function renderFilteredMenu(items) {

    const container =
        document.getElementById("menu-grid");

    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>No food found</h3>
                <p>Try searching for another dish.</p>
            </div>
        `;

        return;
    }

    items.forEach(item => {

        const card =
            createFoodCard(item);

        container.insertAdjacentHTML(
            "beforeend",
            card
        );

    });
}


/* =========================================================
   SORT MENU
========================================================= */

function sortMenu(sortType) {

    currentSort = sortType;

    renderMenu(
        currentCategory,
        currentSort
    );
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterByCategory(category) {

    currentCategory = category;

    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.category === category
            ) {
                button.classList.add("active");
            }

        });

    renderMenu(
        currentCategory,
        currentSort
    );
}


/* =========================================================
   CART
========================================================= */

function addToCart(itemId, quantity = 1) {

    const item =
        menuItems.find(
            product => product.id === itemId
        );

    if (!item) return;

    const existingItem =
        cart.find(
            product => product.id === itemId
        );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            ...item,
            quantity
        });

    }

    saveCartToStorage();

    updateCartUI();

    showToast(
        `${item.name} added to cart!`
    );

    playCustomSound();
}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(itemId) {

    const index =
        cart.findIndex(
            item => item.id === itemId
        );

    if (index === -1) return;

    const item =
        cart[index];

    cart.splice(index, 1);

    saveCartToStorage();

    updateCartUI();

    showToast(
        `${item.name} removed from cart.`,
        "error"
    );
}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(itemId, change) {

    const item =
        cart.find(
            product => product.id === itemId
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(itemId);

        return;
    }

    saveCartToStorage();

    updateCartUI();
}


/* =========================================================
   UPDATE CART UI
========================================================= */

function updateCartUI() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartSubtotal =
        document.getElementById("cart-subtotal");

    const cartDiscount =
        document.getElementById("cart-discount");

    const cartTotal =
        document.getElementById("cart-total");

    let totalQuantity = 0;

    let subtotal = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

        subtotal +=
            item.price * item.quantity;

    });

    const discount =
        subtotal *
        (currentDiscount / 100);

    const total =
        Math.max(
            0,
            subtotal - discount
        );

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatPrice(subtotal);

    }

    if (cartDiscount) {

        cartDiscount.textContent =
            currentDiscount > 0
                ? `-${formatPrice(discount)}`
                : formatPrice(0);

    }

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(total);

    }

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious food to get started.</p>
            </div>
        `;

        return;
    }

    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80';">
            </div>

            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <span class="cart-item-price">
                    ${formatPrice(item.price)}
                </span>

                <div class="cart-item-controls">

                    <button
                        type="button"
                        onclick="changeCartQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="changeCartQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                type="button"
                class="remove-cart-item"
                onclick="removeFromCart(${item.id})"
                aria-label="Remove item">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        cartItems.appendChild(cartItem);

    });
}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");

    if (sidebar) {
        sidebar.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("open");
    }

    updateCartUI();
}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("open");
    }
}/* =========================================================
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

    const item =
        menuItems.find(
            product => product.id === itemId
        );

    if (!item) return;

    const modal =
        document.getElementById("item-detail-modal");

    if (!modal) return;

    const image =
        document.getElementById("detail-image");

    const name =
        document.getElementById("detail-name");

    const category =
        document.getElementById("detail-category");

    const description =
        document.getElementById("detail-description");

    const price =
        document.getElementById("detail-price");

    const rating =
        document.getElementById("detail-rating");

    const quantityInput =
        document.getElementById("detail-quantity");

    const addButton =
        document.getElementById("detail-add-btn");

    if (image) {
        image.src = item.image;
        image.alt = item.name;
    }

    if (name) {
        name.textContent = item.name;
    }

    if (category) {
        category.textContent = item.category;
    }

    if (description) {
        description.textContent =
            item.description;
    }

    if (price) {
        price.textContent =
            formatPrice(item.price);
    }

    if (rating) {

        rating.innerHTML = `
            ${generateStars(item.rating)}
            <span>${item.rating}</span>
        `;

    }

    if (quantityInput) {
        quantityInput.value = 1;
    }

    if (addButton) {

        addButton.onclick = () => {

            const quantity =
                parseInt(
                    quantityInput?.value || 1,
                    10
                );

            addToCart(
                item.id,
                quantity
            );

            closeItemDetail();

        };
    }

    modal.classList.remove("hidden");
}


/* =========================================================
   CLOSE ITEM DETAIL
========================================================= */

function closeItemDetail() {

    const modal =
        document.getElementById("item-detail-modal");

    if (!modal) return;

    modal.classList.add("hidden");
}


/* =========================================================
   DETAIL QUANTITY
========================================================= */

function increaseDetailQuantity() {

    const input =
        document.getElementById("detail-quantity");

    if (!input) return;

    let value =
        parseInt(
            input.value || 1,
            10
        );

    value++;

    input.value = value;
}


function decreaseDetailQuantity() {

    const input =
        document.getElementById("detail-quantity");

    if (!input) return;

    let value =
        parseInt(
            input.value || 1,
            10
        );

    if (value > 1) {
        value--;
    }

    input.value = value;
}


/* =========================================================
   SEARCH
========================================================= */

function searchMenu() {

    const input =
        document.getElementById("search-input");

    if (!input) return;

    const searchTerm =
        input.value
            .trim()
            .toLowerCase();

    if (!searchTerm) {

        renderMenu(
            currentCategory,
            currentSort
        );

        return;
    }

    const filteredItems =
        menuItems.filter(item => {

            return (
                item.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.category
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.description
                    .toLowerCase()
                    .includes(searchTerm)
            );

        });

    renderFilteredMenu(filteredItems);
}


/* =========================================================
   FILTERED MENU
========================================================= */

function renderFilteredMenu(items) {

    const container =
        document.getElementById("menu-grid");

    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-face-sad-tear"></i>
                <h3>No items found</h3>
                <p>Try searching for something else.</p>
            </div>
        `;

        return;
    }

    items.forEach(item => {

        container.insertAdjacentHTML(
            "beforeend",
            createFoodCard(item)
        );

    });
}


/* =========================================================
   SORT MENU
========================================================= */

function sortMenu(sortType) {

    currentSort = sortType;

    renderMenu(
        currentCategory,
        currentSort
    );
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterByCategory(category) {

    currentCategory = category;

    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.category === category
            ) {

                button.classList.add("active");

            }

        });

    renderMenu(
        currentCategory,
        currentSort
    );
}


/* =========================================================
   CART FUNCTIONS
========================================================= */

function addToCart(itemId, quantity = 1) {

    const item =
        menuItems.find(
            product => product.id === itemId
        );

    if (!item) return;

    const existingItem =
        cart.find(
            product => product.id === itemId
        );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            ...item,
            quantity
        });

    }

    saveCartToStorage();

    updateCartUI();

    showToast(
        `${item.name} added to cart!`
    );
}


function removeFromCart(itemId) {

    const index =
        cart.findIndex(
            item => item.id === itemId
        );

    if (index === -1) return;

    cart.splice(index, 1);

    saveCartToStorage();

    updateCartUI();
}


function changeCartQuantity(
    itemId,
    change
) {

    const item =
        cart.find(
            product => product.id === itemId
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(itemId);

        return;
    }

    saveCartToStorage();

    updateCartUI();
}
/* =========================================================
   FOODIE EXPRESS
   CURRENT HTML COMPATIBILITY + REMAINING FUNCTIONS
========================================================= */

let currentSort = "default";
let detailQuantity = 1;
let activeDetailItem = null;

/* =========================================================
   FOOD CARD
========================================================= */

function createFoodCard(item) {
    const isWishlisted = wishlist.some(id => Number(id) === Number(item.id));

    return `
        <article class="menu-card"
            ondblclick="openItemDetail(${item.id})">

            <div class="menu-image">
                <img src="${escapeHTML(item.image)}"
                     alt="${escapeHTML(item.name)}"
                     loading="lazy">

                ${item.badge ? `
                    <span class="menu-badge">${escapeHTML(item.badge)}</span>
                ` : ""}

                <button class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="event.stopPropagation(); toggleWishlist(${item.id})"
                    aria-label="Add to wishlist">
                    <i class="${isWishlisted ? "fas" : "far"} fa-heart"></i>
                </button>
            </div>

            <div class="menu-info">
                <span class="menu-category">
                    ${escapeHTML(item.category)}
                </span>

                <h3>${escapeHTML(item.name)}</h3>

                <p>${escapeHTML(item.description)}</p>

                <div class="menu-bottom">
                    <span class="menu-price">
                        ${formatPrice(item.price)}
                    </span>

                    <button class="add-cart-btn"
                        onclick="event.stopPropagation(); addToCart(${item.id})">
                        <i class="fas fa-cart-plus"></i>
                        Add
                    </button>
                </div>
            </div>
        </article>
    `;
}


/* =========================================================
   MENU RENDER
========================================================= */

function getCategoryMatch(item, category) {
    if (!category || category === "All") {
        return true;
    }

    const name = item.name.toLowerCase();

    switch (category.toLowerCase()) {
        case "burgers":
            return name.includes("burger");

        case "pizza":
            return name.includes("pizza");

        case "desi":
        case "desi cuisine":
            return item.category === "Desi Cuisine";

        case "bbq":
        case "bbq & grills":
            return item.category === "BBQ & Grills";

        case "drinks":
        case "drinks & shakes":
            return item.category === "Drinks & Shakes";

        case "desserts":
            return (
                item.category.toLowerCase().includes("dessert") ||
                name.includes("dessert") ||
                name.includes("cake") ||
                name.includes("ice cream")
            );

        case "fast food":
            return item.category === "Fast Food";

        default:
            return (
                item.category.toLowerCase() === category.toLowerCase()
            );
    }
}


function renderMenu(items = menuItems) {
    const menuGrid = document.getElementById("menu-grid");

    if (!menuGrid) return;

    if (!Array.isArray(items) || items.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-results-card">
                <i class="fas fa-utensils"></i>
                <h3>No food found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
        return;
    }

    menuGrid.innerHTML = items
        .map(item => createFoodCard(item))
        .join("");
}


function renderFilteredMenu(items) {
    renderMenu(items);
}


/* =========================================================
   SEARCH
========================================================= */

function searchMenu(value = null) {
    const input = document.getElementById("search-input");

    if (value === null && input) {
        value = input.value;
    }

    value = String(value || "").trim().toLowerCase();

    const filtered = menuItems.filter(item => {
        const categoryMatch = getCategoryMatch(item, currentCategory);

        const searchMatch =
            !value ||
            item.name.toLowerCase().includes(value) ||
            item.category.toLowerCase().includes(value) ||
            item.description.toLowerCase().includes(value);

        return categoryMatch && searchMatch;
    });

    renderMenu(filtered);

    const noResults = document.getElementById("no-results");

    if (noResults) {
        noResults.classList.toggle(
            "hidden",
            filtered.length !== 0
        );
    }

    return filtered;
}


function submitSearch(event) {
    if (event) {
        event.preventDefault();
    }

    searchMenu();

    const menuSection = document.getElementById("menu");

    if (menuSection) {
        menuSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


function handleSearchKeydown(event) {
    if (!event) return;

    if (event.key === "Enter") {
        event.preventDefault();
        submitSearch(event);
    }

    if (event.key === "Escape") {
        const input = document.getElementById("search-input");

        if (input) {
            input.value = "";
            searchMenu("");
        }
    }
}


function filterMenu(category, clickedButton = null) {
    const normalized =
        String(category || "All").toLowerCase();

    const categoryMap = {
        all: "All",
        burgers: "Burgers",
        pizza: "Pizza",
        desi: "Desi",
        bbq: "BBQ",
        drinks: "Drinks",
        desserts: "Desserts"
    };

    currentCategory =
        categoryMap[normalized] || category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    searchMenu();
}


function filterByCategory(category) {
    filterMenu(category);
}


function sortMenu(sortType = "default") {
    currentSort = sortType;

    let items = searchMenu();

    if (!Array.isArray(items)) {
        items = [...menuItems];
    }

    if (sortType === "price-low") {
        items.sort((a, b) => a.price - b.price);
    }

    if (sortType === "price-high") {
        items.sort((a, b) => b.price - a.price);
    }

    if (sortType === "name") {
        items.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    renderMenu(items);
}


/* =========================================================
   ITEM DETAIL MODAL
========================================================= */

function generateStars(rating = 5) {
    const safeRating = Math.max(
        0,
        Math.min(5, Number(rating) || 5)
    );

    let stars = "";

    for (let i = 1; i <= 5; i++) {
        stars += `
            <i class="${
                i <= Math.round(safeRating)
                    ? "fas"
                    : "far"
            } fa-star"></i>
        `;
    }

    return stars;
}


function openItemDetail(itemId) {
    const item = menuItems.find(
        food => Number(food.id) === Number(itemId)
    );

    const modal = document.getElementById("item-detail-modal");
    const body = document.getElementById("item-detail-body");

    if (!item || !modal || !body) return;

    activeDetailItem = item;
    detailQuantity = 1;

    body.innerHTML = `
        <div class="item-detail-content">

            <div class="item-detail-image">
                <img src="${escapeHTML(item.image)}"
                     alt="${escapeHTML(item.name)}">
            </div>

            <div class="item-detail-info">

                <span class="menu-category">
                    ${escapeHTML(item.category)}
                </span>

                <h2>${escapeHTML(item.name)}</h2>

                <div class="item-detail-rating">
                    ${generateStars(item.rating || 5)}
                    <span>5.0</span>
                </div>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <div class="item-detail-price">
                    ${formatPrice(item.price)}
                </div>

                <div class="detail-quantity">
                    <button
                        type="button"
                        onclick="decreaseDetailQuantity()">
                        -
                    </button>

                    <span id="detail-quantity">
                        1
                    </span>

                    <button
                        type="button"
                        onclick="increaseDetailQuantity()">
                        +
                    </button>
                </div>

                <button
                    type="button"
                    class="add-cart-btn detail-add-btn"
                    onclick="addDetailToCart()">
                    <i class="fas fa-cart-plus"></i>
                    Add To Cart
                </button>

            </div>
        </div>
    `;

    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
}


function closeItemDetailModal() {
    const modal =
        document.getElementById("item-detail-modal");

    if (modal) {
        modal.classList.add("hidden");
    }

    document.body.classList.remove("modal-open");
    activeDetailItem = null;
}


function closeItemDetail() {
    closeItemDetailModal();
}


function increaseDetailQuantity() {
    detailQuantity++;

    const quantity =
        document.getElementById("detail-quantity");

    if (quantity) {
        quantity.textContent = detailQuantity;
    }
}


function decreaseDetailQuantity() {
    if (detailQuantity <= 1) return;

    detailQuantity--;

    const quantity =
        document.getElementById("detail-quantity");

    if (quantity) {
        quantity.textContent = detailQuantity;
    }
}


function addDetailToCart() {
    if (!activeDetailItem) return;

    addToCart(
        activeDetailItem.id,
        detailQuantity
    );

    closeItemDetailModal();
}


/* =========================================================
   CART
========================================================= */

function addToCart(itemId, quantity = 1) {
    const item = menuItems.find(
        food => Number(food.id) === Number(itemId)
    );

    if (!item) return;

    quantity = Math.max(1, Number(quantity) || 1);

    const existing = cart.find(
        cartItem => Number(cartItem.id) === Number(itemId)
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            quantity
        });
    }

    saveCartToStorage();
    updateCartUI();

    showToast(
        `${item.name} cart mein add ho gaya!`,
        "success"
    );

    playCustomSound();
}


function removeFromCart(itemId) {
    cart = cart.filter(
        item => Number(item.id) !== Number(itemId)
    );

    saveCartToStorage();
    updateCartUI();
}


function changeCartQuantity(itemId, change) {
    const item = cart.find(
        cartItem => Number(cartItem.id) === Number(itemId)
    );

    if (!item) return;

    item.quantity += Number(change);

    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    saveCartToStorage();
    updateCartUI();
}


function updateCartUI() {
    const cartItemsContainer =
        document.getElementById("cart-items");

    const cartEmpty =
        document.getElementById("cart-empty");

    let subtotal = 0;
    let totalQuantity = 0;

    cart.forEach(cartItem => {
        const product = menuItems.find(
            item => Number(item.id) === Number(cartItem.id)
        );

        if (product) {
            subtotal +=
                product.price * cartItem.quantity;

            totalQuantity += cartItem.quantity;
        }
    });

    const discount =
        subtotal * (currentDiscount / 100);

    const total = Math.max(
        0,
        subtotal - discount
    );

    const subtotalEl =
        document.getElementById("cart-subtotal");

    const discountEl =
        document.getElementById("cart-discount");

    const totalEl =
        document.getElementById("cart-total");

    if (subtotalEl) {
        subtotalEl.textContent = formatPrice(subtotal);
    }

    if (discountEl) {
        discountEl.textContent =
            currentDiscount > 0
                ? `-${formatPrice(discount)}`
                : formatPrice(0);
    }

    if (totalEl) {
        totalEl.textContent = formatPrice(total);
    }

    const badges =
        document.querySelectorAll(".cart-count");

    badges.forEach(badge => {
        badge.textContent = totalQuantity;
        badge.classList.toggle(
            "hidden",
            totalQuantity === 0
        );
    });

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "";

        if (cartEmpty) {
            cartEmpty.classList.remove("hidden");
        }

        return;
    }

    if (cartEmpty) {
        cartEmpty.classList.add("hidden");
    }

    cartItemsContainer.innerHTML = cart
        .map(cartItem => {
            const item = menuItems.find(
                food =>
                    Number(food.id) === Number(cartItem.id)
            );

            if (!item) return "";

            return `
                <div class="cart-item">

                    <img
                        class="cart-item-image"
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}">

                    <div class="cart-item-info">
                        <h4>${escapeHTML(item.name)}</h4>

                        <span>
                            ${formatPrice(item.price)}
                        </span>

                        <div class="cart-item-controls">

                            <button
                                onclick="changeCartQuantity(${item.id}, -1)">
                                -
                            </button>

                            <span>
                                ${cartItem.quantity}
                            </span>

                            <button
                                onclick="changeCartQuantity(${item.id}, 1)">
                                +
                            </button>

                            <button
                                class="remove-cart-item"
                                onclick="removeFromCart(${item.id})"
                                aria-label="Remove item">
                                <i class="fas fa-trash"></i>
                            </button>

                        </div>
                    </div>

                </div>
            `;
        })
        .join("");
}


function toggleCart() {
    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");

    if (!sidebar) return;

    const isOpen =
        sidebar.classList.contains("active") ||
        sidebar.classList.contains("open");

    if (isOpen) {
        closeCart();
    } else {
        openCart();
    }
}


function openCart() {
    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");

    if (sidebar) {
        sidebar.classList.add("active");
        sidebar.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

    updateCartUI();
}


function closeCart() {
    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");

    if (sidebar) {
        sidebar.classList.remove("active");
        sidebar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }
}


/* =========================================================
   PROMO CODE
========================================================= */

function applyPromoCode() {
    const input =
        document.getElementById("promo-input");

    if (!input) return;

    const code =
        input.value.trim().toUpperCase();

    if (code === "WELCOME20") {
        currentDiscount = 20;

        updateCartUI();

        showToast(
            "Promo code applied! 20% discount mil gaya.",
            "success"
        );

        return;
    }

    currentDiscount = 0;
    updateCartUI();

    showToast(
        "Invalid promo code.",
        "error"
    );
}


function copyPromoCode() {
    const codeElement =
        document.getElementById("promo-code-text");

    if (!codeElement) return;

    const code =
        codeElement.textContent.trim();

    if (navigator.clipboard) {
        navigator.clipboard.writeText(code)
            .then(() => {
                showToast(
                    "Promo code copied!",
                    "success"
                );
            })
            .catch(() => {
                showToast(
                    `Promo Code: ${code}`,
                    "success"
                );
            });
    } else {
        showToast(
            `Promo Code: ${code}`,
            "success"
        );
    }
}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {
    if (cart.length === 0) {
        showToast(
            "Pehle cart mein item add karein.",
            "error"
        );
        return;
    }

    const checkoutScreen =
        document.getElementById("checkout-screen");

    if (!checkoutScreen) return;

    closeCart();

    checkoutScreen.classList.remove("hidden");

    updateCheckoutSummary();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function closeCheckoutModal() {
    const checkoutScreen =
        document.getElementById("checkout-screen");

    if (checkoutScreen) {
        checkoutScreen.classList.add("hidden");
    }
}


function updateCheckoutSummary() {
    const itemsContainer =
        document.getElementById("checkout-summary-items");

    const countElement =
        document.getElementById("checkout-summary-count");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const discountElement =
        document.getElementById("checkout-discount");

    const finalTotalElement =
        document.getElementById("checkout-final-total");

    let subtotal = 0;
    let count = 0;

    if (itemsContainer) {
        itemsContainer.innerHTML = "";
    }

    cart.forEach(cartItem => {
        const item = menuItems.find(
            product =>
                Number(product.id) === Number(cartItem.id)
        );

        if (!item) return;

        const itemTotal =
            item.price * cartItem.quantity;

        subtotal += itemTotal;
        count += cartItem.quantity;

        if (itemsContainer) {
            itemsContainer.innerHTML += `
                <div class="checkout-summary-item">

                    <div>
                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <small>
                            x ${cartItem.quantity}
                        </small>
                    </div>

                    <span>
                        ${formatPrice(itemTotal)}
                    </span>

                </div>
            `;
        }
    });

    const discount =
        subtotal * (currentDiscount / 100);

    const finalTotal =
        Math.max(0, subtotal - discount);

    if (countElement) {
        countElement.textContent =
            `${count} item${count === 1 ? "" : "s"}`;
    }

    if (subtotalElement) {
        subtotalElement.textContent =
            formatPrice(subtotal);
    }

    if (discountElement) {
        discountElement.textContent =
            currentDiscount > 0
                ? `-${formatPrice(discount)}`
                : formatPrice(0);
    }

    if (finalTotalElement) {
        finalTotalElement.textContent =
            formatPrice(finalTotal);
    }
}


function togglePaymentInfo() {
    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const extra =
        document.getElementById("payment-extra");

    const content =
        document.getElementById("payment-extra-content");

    if (!selected || !extra || !content) return;

    const method = selected.value;

    if (method === "Cash on Delivery") {
        extra.classList.add("hidden");
        content.innerHTML = "";
        return;
    }

    extra.classList.remove("hidden");

    if (method === "JazzCash") {
        content.innerHTML = `
            <input
                type="text"
                id="payment-account"
                placeholder="JazzCash mobile number"
                required>
        `;
    } else if (method === "EasyPaisa") {
        content.innerHTML = `
            <input
                type="text"
                id="payment-account"
                placeholder="EasyPaisa mobile number"
                required>
        `;
    } else if (method === "Card") {
        content.innerHTML = `
            <input
                type="text"
                id="card-number"
                placeholder="Card Number"
                maxlength="19"
                required>

            <div class="payment-row">
                <input
                    type="text"
                    id="card-expiry"
                    placeholder="MM/YY"
                    required>

                <input
                    type="text"
                    id="card-cvv"
                    placeholder="CVV"
                    maxlength="4"
                    required>
            </div>
        `;
    }
}


/* =========================================================
   PROCESS ORDER
========================================================= */

function processOrder(event) {
    if (event) {
        event.preventDefault();
    }

    if (cart.length === 0) {
        showToast(
            "Cart empty hai.",
            "error"
        );
        return;
    }

    const name =
        document.getElementById("cust-name")?.value.trim();

    const phone =
        document.getElementById("cust-phone")?.value.trim();

    const email =
        document.getElementById("cust-email")?.value.trim();

    const address =
        document.getElementById("cust-address")?.value.trim();

    const city =
        document.getElementById("cust-city")?.value.trim();

    const note =
        document.getElementById("delivery-note")?.value.trim();

    if (!name || !phone || !email || !address || !city) {
        showToast(
            "Please tamam required details fill karein.",
            "error"
        );
        return;
    }

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const paymentMethod =
        payment ? payment.value : "Cash on Delivery";

    let subtotal = 0;

    const orderItems = cart.map(cartItem => {
        const product = menuItems.find(
            item =>
                Number(item.id) === Number(cartItem.id)
        );

        if (!product) return null;

        const itemTotal =
            product.price * cartItem.quantity;

        subtotal += itemTotal;

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
            total: itemTotal
        };
    }).filter(Boolean);

    const discount =
        subtotal * (currentDiscount / 100);

    const finalTotal =
        Math.max(0, subtotal - discount);

    const orderId =
        "FE" +
        Date.now().toString().slice(-8);

    const order = {
        id: orderId,
        customer: {
            name,
            phone,
            email,
            address,
            city,
            note
        },
        items: orderItems,
        subtotal,
        discount,
        total: finalTotal,
        paymentMethod,
        status: "Order Placed",
        date: new Date().toISOString()
    };

    orderHistory.unshift(order);

    totalOrders++;

    loyaltyCoins += Math.floor(
        finalTotal / 100
    );

    saveOrderHistory();
    saveUserData();

    cart = [];
    currentDiscount = 0;

    saveCartToStorage();

    updateCartUI();

    const form =
        document.getElementById("checkout-form");

    if (form) {
        form.reset();
    }

    closeCheckoutModal();

    showOrderSuccess(order);

    startOrderTracking(order);

    showToast(
        `Order ${orderId} successfully place ho gaya!`,
        "success"
    );
}


/* =========================================================
   ORDER SUCCESS
========================================================= */

function showOrderSuccess(order) {
    let successScreen =
        document.getElementById("success-screen");

    if (!successScreen) {
        successScreen =
            document.createElement("section");

        successScreen.id = "success-screen";
        successScreen.className =
            "success-screen hidden";

        document.body.appendChild(successScreen);
    }

    successScreen.innerHTML = `
        <div class="success-card">

            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>

            <h2>Order Placed Successfully!</h2>

            <p>
                Thank you, ${escapeHTML(order.customer.name)}.
            </p>

            <p>
                Your Order ID:
                <strong>${escapeHTML(order.id)}</strong>
            </p>

            <p>
                Total:
                <strong>${formatPrice(order.total)}</strong>
            </p>

            <button
                class="add-cart-btn"
                onclick="closeSuccessScreen()">
                Continue Shopping
            </button>

        </div>
    `;

    successScreen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function closeSuccessScreen() {
    const screen =
        document.getElementById("success-screen");

    if (screen) {
        screen.classList.add("hidden");
    }

    const menu =
        document.getElementById("menu");

    if (menu) {
        menu.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================================================
   ORDER TRACKING
========================================================= */

function startOrderTracking(order) {
    const section =
        document.getElementById("tracking-section");

    const orderId =
        document.getElementById("tracking-order-id");

    const message =
        document.getElementById("tracking-message");

    if (!section) return;

    if (trackingTimer) {
        clearInterval(trackingTimer);
    }

    section.classList.remove("hidden");

    if (orderId) {
        orderId.textContent = order.id;
    }

    const steps = [
        "Order Placed",
        "Preparing",
        "On The Way",
        "Delivered"
    ];

    let currentStep = 0;

    updateTrackingUI(currentStep, steps);

    trackingTimer = setInterval(() => {
        currentStep++;

        if (currentStep >= steps.length) {
            clearInterval(trackingTimer);
            trackingTimer = null;
            currentStep = steps.length - 1;
        }

        updateTrackingUI(currentStep, steps);
    }, 5000);

    if (message) {
        message.textContent =
            "Your order is being processed.";
    }
}


function updateTrackingUI(activeStep, steps) {
    const trackingSteps =
        document.querySelectorAll(
            "#tracking-section .tracking-step"
        );

    trackingSteps.forEach((step, index) => {
        step.classList.toggle(
            "active",
            index <= activeStep
        );

        step.classList.toggle(
            "completed",
            index < activeStep
        );

        const title =
            step.querySelector("h4, h3, span");

        if (title && steps[index]) {
            const existing =
                title.textContent.trim();

            if (!existing) {
                title.textContent = steps[index];
            }
        }
    });

    const message =
        document.getElementById("tracking-message");

    if (message && steps[activeStep]) {
        message.textContent =
            `Status: ${steps[activeStep]}`;
    }
}


/* =========================================================
   RESERVATION
========================================================= */

function submitReservation(event) {
    if (event) {
        event.preventDefault();
    }

    const name =
        document.getElementById("reservation-name")?.value.trim();

    const phone =
        document.getElementById("reservation-phone")?.value.trim();

    const date =
        document.getElementById("reservation-date")?.value;

    const time =
        document.getElementById("reservation-time")?.value;

    const guests =
        document.getElementById("reservation-guests")?.value;

    const note =
        document.getElementById("reservation-note")?.value.trim();

    if (!name || !phone || !date || !time || !guests) {
        showToast(
            "Please reservation form complete karein.",
            "error"
        );
        return;
    }

    const reservation = {
        name,
        phone,
        date,
        time,
        guests,
        note,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(
        "foodieExpressReservation",
        JSON.stringify(reservation)
    );

    showToast(
        `Reservation confirmed for ${name}!`,
        "success"
    );

    const form =
        document.querySelector(
            'form[onsubmit="submitReservation(event)"]'
        );

    if (form) {
        form.reset();
    }
}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(itemId) {
    itemId = Number(itemId);

    const index =
        wishlist.findIndex(
            id => Number(id) === itemId
        );

    const item =
        menuItems.find(
            food => Number(food.id) === itemId
        );

    if (index >= 0) {
        wishlist.splice(index, 1);

        showToast(
            `${item ? item.name : "Item"} wishlist se remove ho gaya.`,
            "success"
        );
    } else {
        wishlist.push(itemId);

        showToast(
            `${item ? item.name : "Item"} wishlist mein add ho gaya!`,
            "success"
        );
    }

    saveWishlistToStorage();

    renderMenu(searchMenu());

    renderWishlist();
}


function renderWishlist() {
    const container =
        document.getElementById("wishlist-container");

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist">
                <i class="far fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Add your favourite food items here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = wishlist
        .map(id => {
            const item =
                menuItems.find(
                    food => Number(food.id) === Number(id)
                );

            if (!item) return "";

            return `
                <div class="wishlist-item">

                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}">

                    <div>
                        <h4>${escapeHTML(item.name)}</h4>
                        <p>${formatPrice(item.price)}</p>
                    </div>

                    <div class="wishlist-actions">

                        <button
                            onclick="addToCart(${item.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>

                        <button
                            onclick="toggleWishlist(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>

                    </div>

                </div>
            `;
        })
        .join("");
}


function toggleWishlistModal() {
    const modal =
        document.getElementById("wishlist-modal");

    if (!modal) return;

    const isHidden =
        modal.classList.contains("hidden");

    if (isHidden) {
        renderWishlist();
        modal.classList.remove("hidden");
    } else {
        closeWishlistModal();
    }
}


function closeWishlistModal() {
    const modal =
        document.getElementById("wishlist-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {
    const ordersCount =
        document.getElementById("total-orders-count");

    const coinsCount =
        document.getElementById("loyalty-coins-count");

    const wishlistCount =
        document.getElementById("wishlist-count");

    if (ordersCount) {
        ordersCount.textContent = totalOrders;
    }

    if (coinsCount) {
        coinsCount.textContent = loyaltyCoins;
    }

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }

    const historyContainer =
        document.getElementById("history-container");

    if (!historyContainer) return;

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-receipt"></i>
                <h3>No orders yet</h3>
                <p>Your order history will appear here.</p>
            </div>
        `;
        return;
    }

    historyContainer.innerHTML =
        orderHistory.map(order => `
            <div class="order-history">

                <div>
                    <strong>
                        ${escapeHTML(order.id)}
                    </strong>

                    <small>
                        ${new Date(order.date).toLocaleString()}
                    </small>
                </div>

                <div>
                    <span>
                        ${order.items.length} item(s)
                    </span>

                    <strong>
                        ${formatPrice(order.total)}
                    </strong>
                </div>

                <span class="order-status">
                    ${escapeHTML(order.status)}
                </span>

            </div>
        `).join("");
}


function openDashboardModal() {
    const modal =
        document.getElementById("dashboard-modal");

    if (!modal) return;

    renderDashboard();

    modal.classList.remove("hidden");
}


function closeDashboardModal() {
    const modal =
        document.getElementById("dashboard-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function handleLogout() {
    currentUser = null;

    localStorage.removeItem(
        "foodieExpressUser"
    );

    closeDashboardModal();

    showToast(
        "You have been logged out.",
        "success"
    );
}


/* =========================================================
   AUTH
========================================================= */

function openAuthModal(type = "login") {
    const modal =
        document.getElementById("auth-modal");

    if (!modal) return;

    switchAuthScreen(type);

    modal.classList.remove("hidden");
}


function closeAuthModal() {
    const modal =
        document.getElementById("auth-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function switchAuthScreen(screen) {
    const loginScreen =
        document.getElementById("login-screen");

    const signupScreen =
        document.getElementById("signup-screen");

    if (loginScreen) {
        loginScreen.classList.toggle(
            "hidden",
            screen !== "login"
        );
    }

    if (signupScreen) {
        signupScreen.classList.toggle(
            "hidden",
            screen !== "signup"
        );
    }

    document.querySelectorAll(
        ".auth-screen"
    ).forEach(element => {
        const id = element.id.toLowerCase();

        if (
            id.includes(screen) ||
            id === `${screen}-screen`
        ) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
}


function handleAuth(event, type) {
    if (event) {
        event.preventDefault();
    }

    if (type === "login") {
        const email =
            document.getElementById("login-email")?.value.trim();

        const password =
            document.getElementById("login-password")?.value;

        if (!email || !password) {
            showToast(
                "Email aur password enter karein.",
                "error"
            );
            return;
        }

        currentUser = {
            email,
            name: email.split("@")[0]
        };

        saveUserData();

        closeAuthModal();

        showToast(
            "Login successful!",
            "success"
        );

        return;
    }

    if (type === "signup") {
        const name =
            document.getElementById("signup-name")?.value.trim();

        const email =
            document.getElementById("signup-email")?.value.trim();

        const password =
            document.getElementById("signup-password")?.value;

        if (!name || !email || !password) {
            showToast(
                "Please signup form complete karein.",
                "error"
            );
            return;
        }

        currentUser = {
            name,
            email
        };

        saveUserData();

        closeAuthModal();

        showToast(
            "Account successfully create ho gaya!",
            "success"
        );
    }
}


/* =========================================================
   THEME
========================================================= */

function toggleTheme() {
    const html =
        document.getElementById("html-root") ||
        document.documentElement;

    const current =
        html.getAttribute("data-theme") || "light";

    const next =
        current === "dark"
            ? "light"
            : "dark";

    html.setAttribute(
        "data-theme",
        next
    );

    localStorage.setItem(
        "foodieExpressTheme",
        next
    );

    const button =
        document.querySelector(
            '[onclick="toggleTheme()"]'
        );

    if (button) {
        button.innerHTML =
            next === "dark"
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
    }
}


/* =========================================================
   CURRENCY
========================================================= */

function changeCurrency() {
    const selector =
        document.getElementById("currency-selector");

    if (!selector) return;

    currentCurrency =
        selector.value || "PKR";

    localStorage.setItem(
        "foodieExpressCurrency",
        currentCurrency
    );

    renderMenu(searchMenu());
    updateCartUI();
    updateCheckoutSummary();
}


/* =========================================================
   LANGUAGE
========================================================= */

function changeLanguage() {
    const selector =
        document.getElementById("language-selector");

    if (!selector) return;

    currentLanguage =
        selector.value || "en";

    localStorage.setItem(
        "foodieExpressLanguage",
        currentLanguage
    );

    if (currentLanguage === "ur") {
        showToast(
            "Urdu language selected.",
            "success"
        );
    } else {
        showToast(
            "English language selected.",
            "success"
        );
    }
}


/* =========================================================
   LOCATION
========================================================= */

function detectUserLocation(context = "home") {
    if (!navigator.geolocation) {
        showToast(
            "Your browser location support nahi karta.",
            "error"
        );
        return;
    }

    showToast(
        "Location detect ho rahi hai...",
        "success"
    );

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat =
                position.coords.latitude.toFixed(5);

            const lng =
                position.coords.longitude.toFixed(5);

            if (context === "checkout") {
                const address =
                    document.getElementById("cust-address");

                if (address) {
                    address.value =
                        `Location detected (${lat}, ${lng})`;
                }

                showToast(
                    "Location detect ho gayi. Exact address bhi check kar dein.",
                    "success"
                );
            } else {
                showToast(
                    `Your location detected: ${lat}, ${lng}`,
                    "success"
                );
            }
        },

        () => {
            showToast(
                "Location permission nahi mili.",
                "error"
            );
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
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

    recognition.lang =
        currentLanguage === "ur"
            ? "ur-PK"
            : "en-US";

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        showToast(
            "Bolna start karein...",
            "success"
        );
    };

    recognition.onresult = event => {
        const text =
            event.results[0][0].transcript;

        const input =
            document.getElementById("search-input");

        if (input) {
            input.value = text;
        }

        searchMenu(text);
    };

    recognition.onerror = () => {
        showToast(
            "Voice search mein problem hui.",
            "error"
        );
    };

    recognition.start();
}


/* =========================================================
   STORAGE LOAD
========================================================= */

function loadFoodieExpressData() {
    try {
        const savedCart =
            localStorage.getItem(
                "foodieExpressCart"
            );

        const savedWishlist =
            localStorage.getItem(
                "foodieExpressWishlist"
            );

        const savedOrders =
            localStorage.getItem(
                "foodieExpressOrders"
            );

        const savedUser =
            localStorage.getItem(
                "foodieExpressUser"
            );

        const savedCoins =
            localStorage.getItem(
                "foodieExpressCoins"
            );

        const savedTheme =
            localStorage.getItem(
                "foodieExpressTheme"
            );

        const savedCurrency =
            localStorage.getItem(
                "foodieExpressCurrency"
            );

        const savedLanguage =
            localStorage.getItem(
                "foodieExpressLanguage"
            );

        if (savedCart) {
            cart = JSON.parse(savedCart);
        }

        if (savedWishlist) {
            wishlist = JSON.parse(savedWishlist);
        }

        if (savedOrders) {
            orderHistory =
                JSON.parse(savedOrders);
        }

        if (savedUser) {
            currentUser =
                JSON.parse(savedUser);
        }

        if (savedCoins) {
            loyaltyCoins =
                Number(savedCoins) || 0;
        }

        totalOrders =
            orderHistory.length;

        if (savedTheme) {
            const html =
                document.getElementById("html-root") ||
                document.documentElement;

            html.setAttribute(
                "data-theme",
                savedTheme
            );
        }

        if (savedCurrency) {
            currentCurrency =
                savedCurrency;

            const selector =
                document.getElementById(
                    "currency-selector"
                );

            if (selector) {
                selector.value =
                    savedCurrency;
            }
        }

        if (savedLanguage) {
            currentLanguage =
                savedLanguage;

            const selector =
                document.getElementById(
                    "language-selector"
                );

            if (selector) {
                selector.value =
                    savedLanguage;
            }
        }

    } catch (error) {
        console.error(
            "Foodie Express storage error:",
            error
        );
    }
}


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadFoodieExpressData();

        renderMenu(menuItems);

        updateCartUI();

        renderWishlist();

        renderDashboard();

        togglePaymentInfo();

        const savedTheme =
            localStorage.getItem(
                "foodieExpressTheme"
            );

        if (savedTheme) {
            const html =
                document.getElementById("html-root") ||
                document.documentElement;

            html.setAttribute(
                "data-theme",
                savedTheme
            );
        }

        /* Mobile menu */
        const mobileMenuButton =
            document.querySelector(
                ".mobile-menu-btn, .mobile-menu-toggle, #mobile-menu-btn"
            );

        const nav =
            document.querySelector(
                ".nav-links, .navbar-links"
            );

        if (mobileMenuButton && nav) {
            mobileMenuButton.addEventListener(
                "click",
                () => {
                    nav.classList.toggle("active");
                    mobileMenuButton.classList.toggle("active");
                }
            );
        }

        /* Close mobile nav after clicking a link */
        document.querySelectorAll(
            ".nav-links a, .navbar-links a"
        ).forEach(link => {
            link.addEventListener(
                "click",
                () => {
                    if (nav) {
                        nav.classList.remove("active");
                    }

                    if (mobileMenuButton) {
                        mobileMenuButton.classList.remove("active");
                    }
                }
            );
        });

        /* Back to top */
        const backToTop =
            document.querySelector(
                ".back-to-top, #back-to-top"
            );

        if (backToTop) {
            window.addEventListener(
                "scroll",
                () => {
                    backToTop.classList.toggle(
                        "show",
                        window.scrollY > 400
                    );
                }
            );

            backToTop.addEventListener(
                "click",
                () => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            );
        }

        /* Escape closes modals */
        document.addEventListener(
            "keydown",
            event => {
                if (event.key !== "Escape") return;

                closeCart();
                closeAuthModal();
                closeDashboardModal();
                closeWishlistModal();
                closeItemDetailModal();
                closeCheckoutModal();
            }
        );

        /* Cart overlay */
        const overlay =
            document.getElementById("cart-overlay");

        if (overlay) {
            overlay.addEventListener(
                "click",
                closeCart
            );
        }

        /* Page loader */
        const loader =
            document.querySelector(
                ".page-loader, #page-loader"
            );

        if (loader) {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 500);
        }
    }
);
