"use strict";

/* =========================================================
   FOODIE EXPRESS — PREMIUM FRONTEND JAVASCRIPT
   ========================================================= */

/* =========================
   GLOBAL STATE
   ========================= */

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

/* =========================
   MENU DATA
   ========================= */

const menuItems = [
    {
        id: 1,
        name: "Classic Zinger Burger",
        category: "Fast Food",
        price: 650,
        description: "Crispy chicken fillet with fresh lettuce, cheese and signature sauce.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 2,
        name: "Loaded Beef Burger",
        category: "Fast Food",
        price: 780,
        description: "Juicy beef patty loaded with cheese, caramelized onions and special sauce.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 3,
        name: "Cheesy Chicken Pizza",
        category: "Fast Food",
        price: 1250,
        description: "Loaded chicken pizza with mozzarella, herbs and rich tomato sauce.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 4,
        name: "Crispy Chicken Wings",
        category: "Fast Food",
        price: 720,
        description: "Golden crispy chicken wings served with creamy signature dip.",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 5,
        name: "Loaded Cheese Fries",
        category: "Fast Food",
        price: 520,
        description: "Crispy fries topped with melted cheese and delicious sauces.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 6,
        name: "Chicken Shawarma",
        category: "Fast Food",
        price: 450,
        description: "Tender chicken, fresh vegetables and garlic sauce wrapped perfectly.",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 7,
        name: "Chicken Biryani",
        category: "Desi",
        price: 480,
        description: "Aromatic basmati rice cooked with tender chicken and authentic spices.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d29c?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 8,
        name: "Chicken Karahi",
        category: "Desi",
        price: 1100,
        description: "Traditional chicken karahi prepared with tomatoes, ginger and green chilies.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 9,
        name: "Mutton Karahi",
        category: "Desi",
        price: 1650,
        description: "Tender mutton cooked in a rich traditional karahi masala.",
        image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 10,
        name: "Chicken Handi",
        category: "Desi",
        price: 1200,
        description: "Creamy chicken handi with aromatic spices and a rich restaurant-style gravy.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 11,
        name: "Daal Makhni",
        category: "Desi",
        price: 550,
        description: "Slow-cooked creamy lentils with butter and aromatic spices.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 12,
        name: "Butter Naan",
        category: "Desi",
        price: 120,
        description: "Soft tandoori naan finished with delicious butter.",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 13,
        name: "Chicken Tikka",
        category: "BBQ",
        price: 700,
        description: "Charcoal-grilled chicken tikka marinated with traditional spices.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 14,
        name: "Seekh Kebab",
        category: "BBQ",
        price: 650,
        description: "Juicy minced meat kebabs grilled over charcoal.",
        image: "https://images.unsplash.com/photo-1595777216528-071e0127cc45?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 15,
        name: "Malai Boti",
        category: "BBQ",
        price: 850,
        description: "Creamy tender chicken pieces grilled to perfection.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 16,
        name: "BBQ Platter",
        category: "BBQ",
        price: 1850,
        description: "A premium combination of tikka, kebab, malai boti and grilled specialties.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 17,
        name: "Grilled Chicken",
        category: "BBQ",
        price: 950,
        description: "Healthy grilled chicken with herbs and signature seasoning.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 18,
        name: "Grilled Beef Steak",
        category: "BBQ",
        price: 1950,
        description: "Premium tender beef steak grilled and served with signature sauce.",
        image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 19,
        name: "Mango Shake",
        category: "Drinks",
        price: 350,
        description: "Creamy chilled mango shake made with fresh mangoes.",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 20,
        name: "Chocolate Shake",
        category: "Drinks",
        price: 380,
        description: "Rich chocolate shake topped with creamy goodness.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 21,
        name: "Strawberry Shake",
        category: "Drinks",
        price: 370,
        description: "Fresh strawberry shake with a smooth creamy texture.",
        image: "https://images.unsplash.com/photo-1553787499-6f0e6e2f3c87?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 22,
        name: "Fresh Lime",
        category: "Drinks",
        price: 220,
        description: "Refreshing fresh lime drink served chilled.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 23,
        name: "Cold Coffee",
        category: "Drinks",
        price: 350,
        description: "Smooth chilled coffee blended with milk and ice.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 24,
        name: "Mint Margarita",
        category: "Drinks",
        price: 280,
        description: "Cool mint and lime drink for a refreshing experience.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85"
    }
];

/* =========================
   CURRENCY
   ========================= */

const currencyRates = {
    PKR: 1,
    USD: 0.00358,
    GBP: 0.00265,
    AED: 0.01315
};

const currencySymbols = {
    PKR: "Rs.",
    USD: "$",
    GBP: "£",
    AED: "AED"
};

function formatPrice(price) {
    const converted = price * (currencyRates[currentCurrency] || 1);

    if (currentCurrency === "PKR") {
        return `${currencySymbols[currentCurrency]} ${Math.round(converted).toLocaleString()}`;
    }

    return `${currencySymbols[currentCurrency]} ${converted.toFixed(2)}`;
}

/* =========================
   STORAGE
   ========================= */

function saveData() {
    localStorage.setItem("foodie_cart", JSON.stringify(cart));
    localStorage.setItem("foodie_wishlist", JSON.stringify(wishlist));
    localStorage.setItem("foodie_orders", JSON.stringify(orderHistory));
    localStorage.setItem("foodie_coins", String(loyaltyCoins));
    localStorage.setItem("foodie_total_orders", String(totalOrders));
    localStorage.setItem("foodie_currency", currentCurrency);

    if (currentUser) {
        localStorage.setItem("foodie_current_user", JSON.stringify(currentUser));
    } else {
        localStorage.removeItem("foodie_current_user");
    }
}

function loadData() {
    try {
        cart = JSON.parse(localStorage.getItem("foodie_cart")) || [];
        wishlist = JSON.parse(localStorage.getItem("foodie_wishlist")) || [];
        orderHistory = JSON.parse(localStorage.getItem("foodie_orders")) || [];

        loyaltyCoins = Number(localStorage.getItem("foodie_coins")) || 0;
        totalOrders = Number(localStorage.getItem("foodie_total_orders")) || 0;

        currentCurrency = localStorage.getItem("foodie_currency") || "PKR";

        const savedUser = localStorage.getItem("foodie_current_user");

        if (savedUser) {
            currentUser = JSON.parse(savedUser);
        }
    } catch (error) {
        console.warn("Storage could not be loaded:", error);
    }
}

/* =========================
   TOAST
   ========================= */

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
            <i class="fa-solid ${
                type === "error"
                    ? "fa-circle-exclamation"
                    : "fa-circle-check"
            }"></i>
            <span>${escapeHTML(message)}</span>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(30px)";

        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

/* =========================
   SOUND FEEDBACK
   ========================= */

function playCustomSound(type = "click") {
    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        const settings = {
            click: {
                frequency: 520,
                duration: .06
            },
            success: {
                frequency: 720,
                duration: .12
            },
            error: {
                frequency: 180,
                duration: .15
            }
        };

        const sound = settings[type] || settings.click;

        oscillator.frequency.value = sound.frequency;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            .001,
            ctx.currentTime + sound.duration
        );

        oscillator.start();
        oscillator.stop(ctx.currentTime + sound.duration);
    } catch (error) {
        // Audio is optional.
    }
}

/* =========================
   SECURITY HELPER
   ========================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================
   MENU SEARCH
   ========================= */

function searchMenu(query) {
    const search = String(query || "").trim().toLowerCase();

    const heroInput = document.getElementById("search-input");
    const menuInput = document.getElementById("menu-search-input");

    if (document.activeElement === heroInput && menuInput) {
        menuInput.value = query;
    }

    if (document.activeElement === menuInput && heroInput) {
        heroInput.value = query;
    }

    renderMenu(search);

    const menuSection = document.getElementById("menu");

    if (
        search &&
        document.activeElement === heroInput &&
        menuSection
    ) {
        menuSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function handleSearchSubmit(event) {
    event.preventDefault();

    const input = document.getElementById("search-input");

    if (!input) return;

    searchMenu(input.value);

    const menuSection = document.getElementById("menu");

    if (menuSection) {
        menuSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    playCustomSound("click");
}

function clearSearch() {
    const heroInput = document.getElementById("search-input");
    const menuInput = document.getElementById("menu-search-input");

    if (heroInput) heroInput.value = "";
    if (menuInput) menuInput.value = "";

    currentCategory = "All";

    document
        .querySelectorAll(".category-filter button")
        .forEach((button, index) => {
            button.classList.toggle("active", index === 0);
        });

    renderMenu("");
}

/* =========================
   CATEGORY FILTER
   ========================= */

function filterMenu(category) {
    currentCategory = category;

    document
        .querySelectorAll(".category-filter button")
        .forEach(button => {
            const text = button.textContent.trim();

            button.classList.toggle(
                "active",
                text.toLowerCase().includes(category.toLowerCase()) ||
                (category === "All" && text === "All")
            );
        });

    const searchInput =
        document.getElementById("menu-search-input");

    renderMenu(searchInput ? searchInput.value : "");

    playCustomSound("click");
}

/* =========================
   MENU RENDER
   ========================= */

function getVisibleMenuItems(search = "") {
    const normalized = String(search).trim().toLowerCase();

    return menuItems.filter(item => {
        const categoryMatch =
            currentCategory === "All" ||
            item.category.toLowerCase() === currentCategory.toLowerCase();

        if (!categoryMatch) return false;

        if (!normalized) return true;

        return (
            item.name.toLowerCase().includes(normalized) ||
            item.category.toLowerCase().includes(normalized) ||
            item.description.toLowerCase().includes(normalized)
        );
    });
}

function renderMenu(search = "") {
    const container = document.getElementById("menu-container");
    const noResults = document.getElementById("no-results");
    const status = document.getElementById("search-status");

    if (!container) return;

    const items = getVisibleMenuItems(search);

    container.innerHTML = "";

    if (status) {
        if (search || currentCategory !== "All") {
            status.textContent =
                `${items.length} result${items.length === 1 ? "" : "s"} found`;
        } else {
            status.textContent =
                `${menuItems.length} delicious choices available`;
        }
    }

    if (!items.length) {
        if (noResults) noResults.classList.remove("hidden");
        return;
    }

    if (noResults) noResults.classList.add("hidden");

    items.forEach(item => {
        const isFavorite = wishlist.some(
            favorite => Number(favorite.id) === Number(item.id)
        );

        const card = document.createElement("article");

        card.className = "food-card";

        card.innerHTML = `
            <div class="food-card-image">
                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    loading="lazy"
                >

                <span class="food-card-badge">
                    ${escapeHTML(item.category)}
                </span>

                <button
                    class="food-card-fav ${isFavorite ? "active" : ""}"
                    onclick="toggleWishlistItem(${item.id})"
                    aria-label="Add to wishlist"
                >
                    <i class="fa-${
                        isFavorite ? "solid" : "regular"
                    } fa-heart"></i>
                </button>
            </div>

            <div class="food-card-content">
                <span class="food-card-category">
                    ${escapeHTML(item.category)}
                </span>

                <h3>${escapeHTML(item.name)}</h3>

                <p>${escapeHTML(item.description)}</p>

                <div class="food-card-bottom">
                    <span class="food-price">
                        ${formatPrice(item.price)}
                    </span>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${item.id})"
                        aria-label="Add ${escapeHTML(item.name)} to cart"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        card.addEventListener("click", event => {
            if (
                event.target.closest("button")
            ) {
                return;
            }

            openItemDetail(item.id);
        });

        container.appendChild(card);
    });
}

/* =========================
   ITEM DETAIL
   ========================= */

function openItemDetail(id) {
    const item = menuItems.find(
        product => Number(product.id) === Number(id)
    );

    if (!item) return;

    const modal = document.getElementById("item-detail-modal");

    if (!modal) return;

    const image = modal.querySelector("#item-detail-image");
    const title = modal.querySelector("#item-detail-title");
    const description = modal.querySelector("#item-detail-description");
    const price = modal.querySelector("#item-detail-price");

    if (image) {
        image.src = item.image;
        image.alt = item.name;
    }

    if (title) title.textContent = item.name;
    if (description) description.textContent = item.description;
    if (price) price.textContent = formatPrice(item.price);

    modal.dataset.itemId = item.id;
    modal.classList.remove("hidden");

    document.body.classList.add("no-scroll");
}

function closeItemDetail() {
    const modal = document.getElementById("item-detail-modal");

    if (modal) modal.classList.add("hidden");

    document.body.classList.remove("no-scroll");
}

function addFlavorToCart() {
    const modal = document.getElementById("item-detail-modal");

    if (!modal) return;

    const id = Number(modal.dataset.itemId);

    if (!id) return;

    addToCart(id);
    closeItemDetail();
}

/* =========================
   CART
   ========================= */

function addToCart(id) {
    const item = menuItems.find(
        product => Number(product.id) === Number(id)
    );

    if (!item) return;

    const existing = cart.find(
        cartItem => Number(cartItem.id) === Number(id)
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    saveData();
    renderCart();
    updateCartCount();

    showToast(`${item.name} added to cart`);
    playCustomSound("success");
}

function removeFromCart(id) {
    const index = cart.findIndex(
        item => Number(item.id) === Number(id)
    );

    if (index === -1) return;

    cart.splice(index, 1);

    saveData();
    renderCart();
    updateCartCount();
}

function changeCartQuantity(id, change) {
    const item = cart.find(
        product => Number(product.id) === Number(id)
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(
            product => Number(product.id) !== Number(id)
        );
    }

    saveData();
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
        element.classList.toggle("hidden", count === 0);
    });
}

function getCartSubtotal() {
    return cart.reduce(
        (total, item) =>
            total +
            Number(item.price) * Number(item.quantity),
        0
    );
}

function getDiscountAmount() {
    return getCartSubtotal() * (currentDiscount / 100);
}

function getDeliveryFee() {
    if (!cart.length) return 0;

    return getCartSubtotal() >= 2000 ? 0 : 150;
}

function getCartTotal() {
    return (
        getCartSubtotal() -
        getDiscountAmount() +
        getDeliveryFee()
    );
}

function renderCart() {
    const container = document.getElementById("cart-items");

    if (!container) return;

    if (!cart.length) {
        container.innerHTML = `
            <div style="text-align:center;padding:55px 15px;color:var(--muted);">
                <i
                    class="fa-solid fa-basket-shopping"
                    style="font-size:2.5rem;margin-bottom:15px;"
                ></i>

                <h3 style="margin-bottom:7px;">
                    Your cart is empty
                </h3>

                <p style="font-size:.75rem;">
                    Add something delicious to get started.
                </p>
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                >

                <div>
                    <h4>${escapeHTML(item.name)}</h4>

                    <small>
                        ${formatPrice(item.price)}
                    </small>

                    <div class="cart-item-controls">
                        <button
                            onclick="changeCartQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeCartQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            onclick="removeFromCart(${item.id})"
                            title="Remove"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                <strong>
                    ${formatPrice(item.price * item.quantity)}
                </strong>
            </div>
        `).join("");
    }

    const subtotal = document.getElementById("cart-subtotal");
    const discount = document.getElementById("cart-discount");
    const delivery = document.getElementById("cart-delivery");
    const total = document.getElementById("cart-total");

    if (subtotal) subtotal.textContent = formatPrice(getCartSubtotal());
    if (discount) discount.textContent = `-${formatPrice(getDiscountAmount())}`;
    if (delivery) {
        delivery.textContent =
            getDeliveryFee() === 0
                ? "FREE"
                : formatPrice(getDeliveryFee());
    }

    if (total) total.textContent = formatPrice(getCartTotal());
}

function toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");

    if (!sidebar) return;

    const active = sidebar.classList.toggle("active");

    if (overlay) {
        overlay.classList.toggle("active", active);
    }

    document.body.classList.toggle("no-scroll", active);
}

function closeCart() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");

    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

    document.body.classList.remove("no-scroll");
}

/* =========================
   COUPONS
   ========================= */

function applyCoupon() {
    const input = document.getElementById("coupon-code");

    if (!input) return;

    const code = input.value.trim().toUpperCase();

    const coupons = {
        FOODIE50: 10,
        WELCOME: 5
    };

    if (!code) {
        showToast("Please enter a coupon code.", "error");
        return;
    }

    if (!coupons[code]) {
        currentDiscount = 0;
        showToast("Invalid coupon code.", "error");
        playCustomSound("error");
        renderCart();
        return;
    }

    if (!cart.length) {
        showToast("Add items to cart before applying a coupon.", "error");
        return;
    }

    currentDiscount = coupons[code];

    showToast(`${currentDiscount}% discount applied!`);
    playCustomSound("success");

    renderCart();
}

/* =========================
   WISHLIST
   ========================= */

function toggleWishlistItem(id) {
    const item = menuItems.find(
        product => Number(product.id) === Number(id)
    );

    if (!item) return;

    const index = wishlist.findIndex(
        favorite => Number(favorite.id) === Number(id)
    );

    if (index === -1) {
        wishlist.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category
        });

        showToast(`${item.name} added to wishlist`);
    } else {
        wishlist.splice(index, 1);

        showToast(`${item.name} removed from wishlist`);
    }

    saveData();
    renderMenu(
        document.getElementById("menu-search-input")?.value || ""
    );
}

function toggleWishlistModal() {
    const modal = document.getElementById("wishlist-modal");

    if (!modal) return;

    renderWishlist();

    modal.classList.toggle("hidden");

    document.body.classList.toggle(
        "no-scroll",
        !modal.classList.contains("hidden")
    );
}

function renderWishlist() {
    const container = document.getElementById("wishlist-container");

    if (!container) return;

    if (!wishlist.length) {
        container.innerHTML = `
            <div style="text-align:center;padding:35px;color:var(--muted);">
                <i
                    class="fa-regular fa-heart"
                    style="font-size:2.5rem;margin-bottom:15px;"
                ></i>

                <p>Your wishlist is empty.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img
                src="${item.image}"
                alt="${escapeHTML(item.name)}"
                style="width:100%;height:130px;object-fit:cover;border-radius:10px;margin-bottom:10px;"
            >

            <strong>
                ${escapeHTML(item.name)}
            </strong>

            <p style="color:var(--primary);font-weight:700;">
                ${formatPrice(item.price)}
            </p>

            <button
                class="btn btn-primary"
                style="width:100%;margin-top:8px;"
                onclick="addToCart(${item.id})"
            >
                <i class="fa-solid fa-cart-plus"></i>
                Add to Cart
            </button>
        </div>
    `).join("");
}

/* =========================
   CHECKOUT
   ========================= */

function checkout() {
    if (!cart.length) {
        showToast("Your cart is empty.", "error");
        playCustomSound("error");
        return;
    }

    closeCart();

    const checkoutPage =
        document.getElementById("checkout-page");

    if (!checkoutPage) {
        showToast("Checkout page could not be opened.", "error");
        return;
    }

    renderCheckout();

    checkoutPage.classList.remove("hidden");

    document.body.classList.add("no-scroll");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function closeCheckoutPage() {
    const checkoutPage =
        document.getElementById("checkout-page");

    if (checkoutPage) {
        checkoutPage.classList.add("hidden");
    }

    document.body.classList.remove("no-scroll");
}

function closeCheckoutModal() {
    closeCheckoutPage();
}

function renderCheckout() {
    const container =
        document.getElementById("checkout-items");

    if (!container) return;

    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img
                src="${item.image}"
                alt="${escapeHTML(item.name)}"
            >

            <div>
                <h4>${escapeHTML(item.name)}</h4>

                <small>
                    ${item.quantity} × ${formatPrice(item.price)}
                </small>
            </div>

            <strong>
                ${formatPrice(item.price * item.quantity)}
            </strong>
        </div>
    `).join("");

    const subtotal =
        document.getElementById("checkout-subtotal");

    const discount =
        document.getElementById("checkout-discount");

    const delivery =
        document.getElementById("checkout-delivery");

    const total =
        document.getElementById("checkout-total");

    if (subtotal) {
        subtotal.textContent = formatPrice(getCartSubtotal());
    }

    if (discount) {
        discount.textContent =
            `-${formatPrice(getDiscountAmount())}`;
    }

    if (delivery) {
        delivery.textContent =
            getDeliveryFee() === 0
                ? "FREE"
                : formatPrice(getDeliveryFee());
    }

    if (total) {
        total.textContent = formatPrice(getCartTotal());
    }
}

/* =========================
   PAYMENT
   ========================= */

function setPaymentMethod(method) {
    const select =
        document.getElementById("payment-method");

    if (select) {
        select.value = method;
    }

    togglePaymentInfo(method);
}

function togglePaymentInfo(method) {
    const details =
        document.getElementById("online-payment-details");

    if (!details) return;

    const selected =
        method ||
        document.getElementById("payment-method")?.value ||
        "cod";

    if (
        selected === "card" ||
        selected === "jazzcash" ||
        selected === "easypaisa"
    ) {
        details.classList.remove("hidden");
    } else {
        details.classList.add("hidden");
    }
}

/* =========================
   ORDER PROCESSING
   ========================= */

function processOrder(event) {
    if (event) event.preventDefault();

    if (!cart.length) {
        showToast("Your cart is empty.", "error");
        return;
    }

    const name =
        document.getElementById("cust-name")?.value.trim();

    const phone =
        document.getElementById("cust-phone")?.value.trim();

    const address =
        document.getElementById("cust-address")?.value.trim();

    const payment =
        document.getElementById("payment-method")?.value ||
        document.querySelector(
            'input[name="payment"]:checked'
        )?.value ||
        "cod";

    if (!name) {
        showToast("Please enter your full name.", "error");
        focusElement("cust-name");
        return;
    }

    if (!phone || !isValidPhone(phone)) {
        showToast("Please enter a valid phone number.", "error");
        focusElement("cust-phone");
        return;
    }

    if (!address) {
        showToast("Please enter your delivery address.", "error");
        focusElement("cust-address");
        return;
    }

    const orderId =
        "FE-" +
        Date.now().toString().slice(-8);

    const order = {
        id: orderId,
        customer: {
            name,
            phone,
            address
        },
        payment,
        items: cart.map(item => ({
            ...item
        })),
        subtotal: getCartSubtotal(),
        discount: getDiscountAmount(),
        delivery: getDeliveryFee(),
        total: getCartTotal(),
        currency: currentCurrency,
        date: new Date().toISOString(),
        status: "Order Confirmed"
    };

    orderHistory.unshift(order);

    totalOrders += 1;

    loyaltyCoins += Math.max(
        1,
        Math.floor(order.total / 100)
    );

    saveData();

    sendOrderToWhatsApp(order);

    cart = [];
    currentDiscount = 0;

    saveData();
    renderCart();
    updateCartCount();

    startOrderTracking(order);

    closeCheckoutPage();

    showToast(
        `Order ${orderId} placed successfully!`
    );

    playCustomSound("success");

    setTimeout(() => {
        const tracking =
            document.getElementById("tracking-section");

        if (tracking) {
            tracking.classList.remove("hidden");

            tracking.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, 500);
}

function focusElement(id) {
    const element = document.getElementById(id);

    if (element) {
        element.focus();
        element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/[\s\-()]/g, "");

    return (
        /^(\+92|0092|92|0)?3\d{9}$/.test(cleaned)
    );
}

/* =========================
   WHATSAPP ORDER
   ========================= */

function sendOrderToWhatsApp(order) {
    const lines = [];

    lines.push("🍔 *FOODIE EXPRESS — NEW ORDER*");
    lines.push("");
    lines.push(`🧾 Order ID: ${order.id}`);
    lines.push(`👤 Name: ${order.customer.name}`);
    lines.push(`📱 Phone: ${order.customer.phone}`);
    lines.push(`📍 Address: ${order.customer.address}`);
    lines.push(`💳 Payment: ${getPaymentLabel(order.payment)}`);
    lines.push("");
    lines.push("🍽️ *ORDER ITEMS*");

    order.items.forEach(item => {
        lines.push(
            `• ${item.name} × ${item.quantity} = ${formatPrice(
                item.price * item.quantity
            )}`
        );
    });

    lines.push("");
    lines.push(`Subtotal: ${formatPrice(order.subtotal)}`);
    lines.push(`Discount: -${formatPrice(order.discount)}`);
    lines.push(
        `Delivery: ${
            order.delivery === 0
                ? "FREE"
                : formatPrice(order.delivery)
        }`
    );
    lines.push(`*TOTAL: ${formatPrice(order.total)}*`);
    lines.push("");
    lines.push("Thank you for ordering from Foodie Express! ❤️");

    const message = lines.join("\n");

    const url =
        `https://wa.me/${adminWhatsAppNumber}?text=` +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
}

function getPaymentLabel(method) {
    const labels = {
        cod: "Cash on Delivery",
        cash: "Cash on Delivery",
        jazzcash: "JazzCash",
        easypaisa: "EasyPaisa",
        card: "Debit / Credit Card"
    };

    return labels[method] || method;
}

/* =========================
   ORDER TRACKING
   ========================= */

function startOrderTracking(order) {
    const section =
        document.getElementById("tracking-section");

    if (!section) return;

    section.classList.remove("hidden");

    const steps =
        section.querySelectorAll(".tracking-step");

    steps.forEach(step =>
        step.classList.remove("active")
    );

    if (steps[0]) steps[0].classList.add("active");

    clearInterval(trackingTimer);

    let currentStep = 0;

    trackingTimer = setInterval(() => {
        currentStep++;

        if (steps[currentStep]) {
            steps[currentStep].classList.add("active");
        }

        if (currentStep >= steps.length - 1) {
            clearInterval(trackingTimer);
        }
    }, 5000);
}

/* =========================
   DASHBOARD
   ========================= */

function openDashboardModal() {
    const modal =
        document.getElementById("dashboard-modal");

    if (!modal) return;

    updateDashboard();

    modal.classList.remove("hidden");

    document.body.classList.add("no-scroll");
}

function closeDashboardModal() {
    const modal =
        document.getElementById("dashboard-modal");

    if (modal) modal.classList.add("hidden");

    document.body.classList.remove("no-scroll");
}

function updateDashboard() {
    const userName =
        document.getElementById("dashboard-user");

    const coins =
        document.getElementById("loyalty-coins");

    const orders =
        document.getElementById("total-orders");

    const history =
        document.getElementById("order-history");

    if (userName) {
        userName.textContent =
            currentUser?.name || "Guest User";
    }

    if (coins) coins.textContent = loyaltyCoins;

    if (orders) orders.textContent = totalOrders;

    if (history) {
        if (!orderHistory.length) {
            history.innerHTML = `
                <p style="color:var(--muted);">
                    No orders yet.
                </p>
            `;
        } else {
            history.innerHTML = orderHistory
                .slice(0, 10)
                .map(order => `
                    <div
                        style="
                            padding:13px;
                            border:1px solid var(--border);
                            border-radius:12px;
                            margin-bottom:9px;
                        "
                    >
                        <strong>${order.id}</strong>

                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                gap:10px;
                                margin-top:5px;
                            "
                        >
                            <small>
                                ${order.status}
                            </small>

                            <strong>
                                ${formatPrice(order.total)}
                            </strong>
                        </div>
                    </div>
                `)
                .join("");
        }
    }
}

/* =========================
   AUTH
   ========================= */

function openAuthModal(type = "login") {
    const modal =
        document.getElementById("auth-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

    document.body.classList.add("no-scroll");

    switchAuthForm(type);
}

function closeAuthModal() {
    const modal =
        document.getElementById("auth-modal");

    if (modal) modal.classList.add("hidden");

    document.body.classList.remove("no-scroll");
}

function switchAuthForm(type) {
    document
        .querySelectorAll(".auth-form")
        .forEach(form => {
            form.classList.add("hidden");
        });

    const target =
        document.getElementById(
            type === "signup"
                ? "signup-form"
                : "login-form"
        );

    if (target) target.classList.remove("hidden");

    document
        .querySelectorAll(".auth-tabs button")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.auth === type
            );
        });
}

function loginUser(event) {
    if (event) event.preventDefault();

    const email =
        document.getElementById("login-email")?.value.trim();

    const password =
        document.getElementById("login-password")?.value;

    if (!email || !password) {
        showToast("Please fill all login fields.", "error");
        return;
    }

    const users =
        JSON.parse(localStorage.getItem("foodie_users")) || [];

    const user = users.find(
        account =>
            account.email.toLowerCase() === email.toLowerCase() &&
            account.password === password
    );

    if (!user) {
        showToast(
            "Incorrect email or password.",
            "error"
        );

        playCustomSound("error");
        return;
    }

    currentUser = {
        name: user.name,
        email: user.email
    };

    saveData();

    closeAuthModal();

    showToast(`Welcome back, ${user.name}!`);
    playCustomSound("success");

    updateAuthButton();
}

function signupUser(event) {
    if (event) event.preventDefault();

    const name =
        document.getElementById("signup-name")?.value.trim();

    const email =
        document.getElementById("signup-email")?.value.trim();

    const password =
        document.getElementById("signup-password")?.value;

    if (!name || !email || !password) {
        showToast("Please complete all signup fields.", "error");
        return;
    }

    if (password.length < 6) {
        showToast(
            "Password must be at least 6 characters.",
            "error"
        );
        return;
    }

    const users =
        JSON.parse(localStorage.getItem("foodie_users")) || [];

    const exists = users.some(
        user =>
            user.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
        showToast(
            "An account with this email already exists.",
            "error"
        );
        return;
    }

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem(
        "foodie_users",
        JSON.stringify(users)
    );

    currentUser = {
        name,
        email
    };

    saveData();

    closeAuthModal();

    showToast(
        "Account created successfully!"
    );

    playCustomSound("success");

    updateAuthButton();
}

function logoutUser() {
    currentUser = null;

    saveData();

    closeDashboardModal();

    showToast("You have been logged out.");

    updateAuthButton();
}

function updateAuthButton() {
    const button =
        document.getElementById("login-button");

    if (!button) return;

    if (currentUser) {
        button.innerHTML = `
            <i class="fa-solid fa-user-check"></i>
            <span>${escapeHTML(currentUser.name.split(" ")[0])}</span>
        `;
    } else {
        button.innerHTML = `
            <i class="fa-solid fa-user"></i>
            <span>Login</span>
        `;
    }
}

/* =========================
   DARK MODE
   ========================= */

function toggleDarkMode() {
    const html = document.documentElement;

    const dark =
        html.getAttribute("data-theme") === "dark";

    html.setAttribute(
        "data-theme",
        dark ? "light" : "dark"
    );

    localStorage.setItem(
        "foodie_theme",
        dark ? "light" : "dark"
    );

    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const button =
        document.getElementById("dark-mode-btn");

    if (!button) return;

    const dark =
        document.documentElement.getAttribute("data-theme") === "dark";

    button.innerHTML = `
        <i class="fa-solid ${
            dark ? "fa-sun" : "fa-moon"
        }"></i>
    `;
}

/* =========================
   CURRENCY
   ========================= */

function changeCurrency(value) {
    if (typeof value !== "string") {
        const selector =
            document.getElementById("currency-selector");

        value = selector?.value || "PKR";
    }

    if (!currencyRates[value]) {
        value = "PKR";
    }

    currentCurrency = value;

    localStorage.setItem(
        "foodie_currency",
        currentCurrency
    );

    renderMenu(
        document.getElementById("menu-search-input")?.value || ""
    );

    renderCart();
    renderCheckout();

    showToast(`Currency changed to ${currentCurrency}.`);
}

/* =========================
   LANGUAGE
   ========================= */

function changeLanguage(value) {
    if (typeof value !== "string") {
        const selector =
            document.getElementById("language-selector");

        value = selector?.value || "en";
    }

    currentLanguage = value;

    document.documentElement.lang = value;

    const messages = {
        en: "English selected.",
        ur: "Roman Urdu mode selected.",
        ar: "Arabic selected."
    };

    showToast(
        messages[value] ||
        "Language preference updated."
    );
}

/* =========================
   MOBILE MENU
   ========================= */

function toggleMobileMenu() {
    const menu =
        document.getElementById("mobile-menu");

    if (!menu) return;

    menu.classList.toggle("active");

    document.body.classList.toggle(
        "no-scroll",
        menu.classList.contains("active")
    );
}

function closeMobileMenu() {
    const menu =
        document.getElementById("mobile-menu");

    if (!menu) return;

    menu.classList.remove("active");

    if (
        !document.querySelector(
            ".modal:not(.hidden), #chat-window.active, #cart-sidebar.active"
        )
    ) {
        document.body.classList.remove("no-scroll");
    }
}

/* =========================
   LOCATION
   ========================= */

function findNearMe() {
    if (!navigator.geolocation) {
        showToast(
            "Location is not supported by your browser.",
            "error"
        );
        return;
    }

    showToast("Requesting your location...");

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } =
                position.coords;

            showToast(
                `Location detected: ${latitude.toFixed(
                    3
                )}, ${longitude.toFixed(3)}`
            );
        },
        () => {
            showToast(
                "Location permission was not granted.",
                "error"
            );
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

/* =========================
   VOICE SEARCH
   ========================= */

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

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    showToast("Listening... Speak your food name.");

    recognition.start();

    recognition.onresult = event => {
        const text =
            event.results[0][0].transcript;

        const input =
            document.getElementById("search-input");

        if (input) {
            input.value = text;
        }

        searchMenu(text);

        showToast(`Searching for "${text}"`);
    };

    recognition.onerror = () => {
        showToast(
            "Voice search could not understand that.",
            "error"
        );
    };
}

/* =========================
   AI ASSISTANT
   ========================= */

function askAI() {
    openChatbot();

    setTimeout(() => {
        addBotMessage(
            "Sure! Tell me what you want — Fast Food, Desi, BBQ, Drinks, budget meals, spicy food, or something else. I can help you choose."
        );
    }, 250);
}

function aiVoice() {
    if (!("speechSynthesis" in window)) {
        showToast(
            "Voice assistant is not supported here.",
            "error"
        );
        return;
    }

    const text =
        "Welcome to Foodie Express. Tell me what you are craving and I will help you find something delicious.";

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = .95;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

    showToast("AI voice assistant started.");
}

/* =========================
   CHATBOT
   ========================= */

function openChatbot() {
    const windowElement =
        document.getElementById("chat-window");

    if (!windowElement) return;

    windowElement.classList.remove("hidden");
    windowElement.classList.add("active");
}

function toggleChatbot() {
    const windowElement =
        document.getElementById("chat-window");

    if (!windowElement) return;

    const isHidden =
        windowElement.classList.contains("hidden");

    windowElement.classList.toggle(
        "hidden",
        !isHidden
    );

    windowElement.classList.toggle(
        "active",
        isHidden
    );
}

function addBotMessage(message) {
    const messages =
        document.getElementById("chat-messages");

    if (!messages) return;

    const div = document.createElement("div");

    div.className = "chat-message bot";

    div.textContent = message;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(message) {
    const messages =
        document.getElementById("chat-messages");

    if (!messages) return;

    const div = document.createElement("div");

    div.className = "chat-message user";

    div.textContent = message;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

function sendChatMessage() {
    const input =
        document.getElementById("chat-input");

    if (!input) return;

    const message = input.value.trim();

    if (!message) return;

    addUserMessage(message);

    input.value = "";

    setTimeout(() => {
        respondToChat(message);
    }, 350);
}

function respondToChat(message) {
    const text = message.toLowerCase();

    if (
        text.includes("fast food") ||
        text.includes("burger") ||
        text.includes("pizza") ||
        text.includes("fries")
    ) {
        addBotMessage(
            "For Fast Food, try our Classic Zinger Burger, Loaded Beef Burger, Cheesy Chicken Pizza, or Loaded Cheese Fries 🍔🍕"
        );
        return;
    }

    if (
        text.includes("desi") ||
        text.includes("biryani") ||
        text.includes("karahi") ||
        text.includes("handi")
    ) {
        addBotMessage(
            "For Desi food, Chicken Biryani is a popular choice. If you want something richer, try Chicken Karahi or Chicken Handi 🍛"
        );
        return;
    }

    if (
        text.includes("bbq") ||
        text.includes("kebab") ||
        text.includes("tikka") ||
        text.includes("steak")
    ) {
        addBotMessage(
            "BBQ lover? You can choose Chicken Tikka, Seekh Kebab, Malai Boti, BBQ Platter, or Grilled Beef Steak 🔥"
        );
        return;
    }

    if (
        text.includes("drink") ||
        text.includes("shake") ||
        text.includes("coffee") ||
        text.includes("margarita")
    ) {
        addBotMessage(
            "For drinks, Mango Shake, Chocolate Shake, Cold Coffee and Mint Margarita are available 🥤"
        );
        return;
    }

    if (
        text.includes("cheap") ||
        text.includes("budget") ||
        text.includes("500") ||
        text.includes("low price")
    ) {
        const affordable = [...menuItems]
            .sort((a, b) => a.price - b.price)
            .slice(0, 5);

        addBotMessage(
            "Some lower-priced options are: " +
            affordable
                .map(item => `${item.name} (${formatPrice(item.price)})`)
                .join(", ") +
            "."
        );

        return;
    }

    if (
        text.includes("cart") ||
        text.includes("order")
    ) {
        if (!cart.length) {
            addBotMessage(
                "Your cart is currently empty. Pick any food from the menu and tap the + button."
            );
        } else {
            addBotMessage(
                `You currently have ${cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                )} item(s) in your cart, with a total of ${formatPrice(
                    getCartTotal()
                )}.`
            );
        }

        return;
    }

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("salam")
    ) {
        addBotMessage(
            "Wa Alaikum Assalam! 👋 Welcome to Foodie Express. What are you craving today?"
        );

        return;
    }

    const randomReplies = [
        "I can help you find food by category, price, or craving. Try saying 'Fast Food' or 'BBQ'.",
        "Hungry? 😋 Tell me your craving and I will suggest something from our menu.",
        "You can ask me about burgers, biryani, BBQ, drinks, prices, your cart, or ordering.",
        "I am ready! Tell me what kind of food you want today."
    ];

    addBotMessage(
        randomReplies[
            Math.floor(Math.random() * randomReplies.length)
        ]
    );
}

/* =========================
   RESERVATION
   ========================= */

function submitReservation(event) {
    if (event) event.preventDefault();

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

    if (!name || !phone || !date || !time || !guests) {
        showToast(
            "Please complete all reservation fields.",
            "error"
        );
        return;
    }

    showToast(
        `Table reserved for ${guests} guest(s) on ${date} at ${time}.`
    );

    playCustomSound("success");

    const form =
        document.getElementById("reservation-form");

    if (form) form.reset();
}

/* =========================
   MOBILE NAV LINK HANDLING
   ========================= */

document.addEventListener("click", event => {
    const link = event.target.closest(
        '#mobile-menu a[href^="#"]'
    );

    if (!link) return;

    closeMobileMenu();
});

/* =========================
   KEYBOARD SUPPORT
   ========================= */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMobileMenu();
        closeCart();
        closeCheckoutPage();
        closeItemDetail();
        closeAuthModal();
        closeDashboardModal();
    }
});

/* =========================
   ENTER KEY — SEARCH
   ========================= */

document.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    const target = event.target;

    if (
        target.id === "menu-search-input"
    ) {
        event.preventDefault();
        searchMenu(target.value);
    }

    if (
        target.id === "chat-input"
    ) {
        event.preventDefault();
        sendChatMessage();
    }
});

/* =========================
   CLOSE MODAL BY BACKDROP
   ========================= */

document.addEventListener("click", event => {
    const modal = event.target.closest(".modal");

    if (!modal) return;

    if (event.target !== modal) return;

    modal.classList.add("hidden");

    document.body.classList.remove("no-scroll");
});

/* =========================
   CHECKOUT EDIT CART
   ========================= */

function editCartFromCheckout() {
    closeCheckoutPage();
    toggleCart();
}

/* =========================
   INITIALIZATION
   ========================= */

function initializeFoodieExpress() {
    loadData();

    const savedTheme =
        localStorage.getItem("foodie_theme");

    if (savedTheme) {
        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );
    }

    updateDarkModeIcon();
    updateAuthButton();

    renderMenu("");
    renderCart();
    renderWishlist();
    updateCartCount();
    updateDashboard();

    const currencySelector =
        document.getElementById("currency-selector");

    if (currencySelector) {
        currencySelector.value = currentCurrency;
    }

    const languageSelector =
        document.getElementById("language-selector");

    if (languageSelector) {
        languageSelector.value = currentLanguage;
    }

    togglePaymentInfo();

    /* Prevent accidental checkout submission issues */
    const checkoutForm =
        document.getElementById("checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener(
            "submit",
            processOrder
        );
    }

    /* Reservation fallback */
    const reservationForm =
        document.getElementById("reservation-form");

    if (reservationForm) {
        reservationForm.addEventListener(
            "submit",
            submitReservation
        );
    }

    /* Chatbot Enter support */
    const chatInput =
        document.getElementById("chat-input");

    if (chatInput) {
        chatInput.addEventListener(
            "keydown",
            event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    sendChatMessage();
                }
            }
        );
    }

    /* Header shadow while scrolling */
    window.addEventListener(
        "scroll",
        () => {
            const header =
                document.getElementById("main-header");

            if (!header) return;

            header.style.boxShadow =
                window.scrollY > 20
                    ? "0 8px 30px rgba(0,0,0,.10)"
                    : "0 5px 30px rgba(30,20,15,.05)";
        },
        { passive: true }
    );

    /* Lazy image fallback */
    document.addEventListener(
        "error",
        event => {
            if (
                event.target.tagName === "IMG"
            ) {
                event.target.style.background =
                    "var(--light)";
            }
        },
        true
    );

    /* Remove page loader */
    const loader =
        document.getElementById("page-loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(
                () => loader.remove(),
                500
            );
        }, 450);
    }
}

/* =========================
   START APP
   ========================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeFoodieExpress
    );
} else {
    initializeFoodieExpress();
}
