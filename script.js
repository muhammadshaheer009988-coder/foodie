/* =========================================================
   FOODIE EXPRESS - SCRIPT.JS
   ========================================================= */

/* ==================== DATA ==================== */

const menuItems = [
    {
        id: 1,
        name: "Classic Beef Burger",
        category: "Burgers",
        price: 699,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
        description: "Juicy beef patty, fresh lettuce, cheese and our signature sauce."
    },
    {
        id: 2,
        name: "Zinger Burger",
        category: "Burgers",
        price: 599,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",
        description: "Crispy chicken fillet with lettuce, mayo and a spicy kick."
    },
    {
        id: 3,
        name: "Double Cheese Burger",
        category: "Burgers",
        price: 849,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80",
        description: "Two juicy beef patties layered with melted cheese and special sauce."
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 1299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
        description: "Classic pizza topped with pepperoni, mozzarella and rich tomato sauce."
    },
    {
        id: 5,
        name: "Chicken Tikka Pizza",
        category: "Pizza",
        price: 1399,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
        description: "Loaded with spicy chicken tikka, mozzarella and fresh vegetables."
    },
    {
        id: 6,
        name: "Chicken Biryani",
        category: "Desi",
        price: 449,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d29c?auto=format&fit=crop&w=900&q=80",
        description: "Aromatic basmati rice cooked with tender chicken and traditional spices."
    },
    {
        id: 7,
        name: "Chicken Karahi",
        category: "Desi",
        price: 1199,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
        description: "Traditional chicken karahi cooked with tomatoes, green chilies and spices."
    },
    {
        id: 8,
        name: "Chicken Seekh Kebab",
        category: "BBQ",
        price: 799,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
        description: "Smoky minced chicken kebabs grilled to perfection."
    },
    {
        id: 9,
        name: "Chicken Tikka",
        category: "BBQ",
        price: 749,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80",
        description: "Tender marinated chicken grilled with aromatic spices."
    },
    {
        id: 10,
        name: "Mango Shake",
        category: "Drinks",
        price: 349,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80",
        description: "Creamy mango shake made with fresh mangoes and chilled milk."
    },
    {
        id: 11,
        name: "Chocolate Shake",
        category: "Drinks",
        price: 399,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
        description: "Rich chocolate shake topped with creamy foam."
    },
    {
        id: 12,
        name: "Chocolate Lava Cake",
        category: "Desserts",
        price: 499,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
        description: "Warm chocolate cake with a delicious molten center."
    }
];


/* ==================== GLOBAL STATE ==================== */

let cart = JSON.parse(localStorage.getItem("foodieCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("foodieWishlist")) || [];
let orderHistory = JSON.parse(localStorage.getItem("foodieOrderHistory")) || [];
let currentDiscount = Number(localStorage.getItem("foodieDiscount")) || 0;
let currentCurrency = localStorage.getItem("foodieCurrency") || "PKR";
let currentTheme = localStorage.getItem("foodieTheme") || "light";
let currentLanguage = localStorage.getItem("foodieLanguage") || "en";

const currencyRates = {
    PKR: 1,
    USD: 0.00358,
    GBP: 0.00266,
    AED: 0.01315
};

const currencySymbols = {
    PKR: "Rs.",
    USD: "$",
    GBP: "£",
    AED: "AED "
};

const adminWhatsAppNumber = "923312969666";


/* ==================== INITIALIZATION ==================== */

document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    initializeSelectors();
    renderMenu(menuItems);
    renderCart();
    renderWishlist();
    renderDashboard();
    updateTrackingFromHistory();
    setReservationMinDate();

    document.addEventListener("keydown", handleGlobalKeydown);
});


/* ==================== THEME ==================== */

function applyTheme() {
    const html = document.documentElement;

    html.setAttribute("data-theme", currentTheme);

    const themeButton = document.querySelector(
        '.nav-icon-btn[onclick="toggleTheme()"] i'
    );

    if (themeButton) {
        themeButton.className =
            currentTheme === "dark"
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";
    }
}

function toggleTheme() {
    currentTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("foodieTheme", currentTheme);

    applyTheme();
}


/* ==================== SELECTORS ==================== */

function initializeSelectors() {
    const currencySelector =
        document.getElementById("currency-selector");

    const languageSelector =
        document.getElementById("language-selector");

    if (currencySelector) {
        currencySelector.value = currentCurrency;
    }

    if (languageSelector) {
        languageSelector.value = currentLanguage;
    }
}

function changeCurrency() {
    const selector = document.getElementById("currency-selector");

    if (!selector) return;

    currentCurrency = selector.value;

    localStorage.setItem(
        "foodieCurrency",
        currentCurrency
    );

    renderMenu(menuItems);
    renderCart();
    renderWishlist();
    renderDashboard();

    const checkoutScreen =
        document.getElementById("checkout-screen");

    if (
        checkoutScreen &&
        !checkoutScreen.classList.contains("hidden")
    ) {
        renderCheckoutSummary();
    }
}

function changeLanguage() {
    const selector = document.getElementById("language-selector");

    if (!selector) return;

    currentLanguage = selector.value;

    localStorage.setItem(
        "foodieLanguage",
        currentLanguage
    );

    showToast(
        currentLanguage === "ur"
            ? "Language updated."
            : "Language updated.",
        "success"
    );
}


/* ==================== CURRENCY ==================== */

function formatPrice(price) {
    const converted =
        Number(price || 0) *
        (currencyRates[currentCurrency] || 1);

    if (currentCurrency === "PKR") {
        return `${currencySymbols[currentCurrency]} ${Math.round(converted).toLocaleString()}`;
    }

    return `${currencySymbols[currentCurrency]}${converted.toFixed(2)}`;
}


/* ==================== MENU ==================== */

function renderMenu(items = menuItems) {
    const menuGrid = document.getElementById("menu-grid");

    if (!menuGrid) return;

    if (items.length === 0) {
        menuGrid.innerHTML = `
            <div class="menu-no-results">
                <h3>No food found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }

    menuGrid.innerHTML = items.map(item => {

        const isWishlisted =
            wishlist.some(food => food.id === item.id);

        return `
            <article class="food-card">

                <div class="food-card-image">

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                        onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80';"
                    >

                    <button
                        class="wishlist-btn ${isWishlisted ? "active" : ""}"
                        type="button"
                        onclick="toggleWishlist(${item.id})"
                        title="Add to favorites"
                    >
                        <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
                    </button>

                </div>


                <div class="food-card-body">

                    <span class="food-card-category">
                        ${escapeHTML(item.category)}
                    </span>

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <p>
                        ${escapeHTML(item.description)}
                    </p>


                    <div class="food-card-footer">

                        <div>

                            <div class="food-price">
                                ${formatPrice(item.price)}
                            </div>

                            <div class="food-rating">
                                <i class="fa-solid fa-star"></i>
                                ${item.rating}
                            </div>

                        </div>


                        <div style="display:flex;gap:7px;">

                            <button
                                class="add-cart-btn"
                                type="button"
                                onclick="openItemDetailModal(${item.id})"
                                title="View details"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                            <button
                                class="add-cart-btn"
                                type="button"
                                onclick="addToCart(${item.id})"
                                title="Add to cart"
                            >
                                <i class="fa-solid fa-plus"></i>
                            </button>

                        </div>

                    </div>

                </div>

            </article>
        `;
    }).join("");
}


function filterMenu(category, button) {
    document
        .querySelectorAll(".category-tab")
        .forEach(tab => tab.classList.remove("active"));

    if (button) {
        button.classList.add("active");
    }

    if (category === "all") {
        renderMenu(menuItems);
        return;
    }

    const filtered = menuItems.filter(
        item => item.category === category
    );

    renderMenu(filtered);
}


function searchMenu(value) {
    const query = String(value || "").trim().toLowerCase();

    if (!query) {
        renderMenu(menuItems);
        return;
    }

    const results = menuItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    renderMenu(results);
}


function submitSearch(event) {
    event.preventDefault();

    const input = document.getElementById("search-input");

    if (!input) return;

    searchMenu(input.value);

    document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth"
    });
}


function handleSearchKeydown(event) {
    if (event.key === "Escape") {
        const input = document.getElementById("search-input");

        if (input) {
            input.value = "";
            searchMenu("");
        }
    }
}


/* ==================== VOICE SEARCH ==================== */

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

    recognition.onstart = () => {
        showToast("Listening...", "success");
    };

    recognition.onresult = event => {
        const transcript =
            event.results[0][0].transcript;

        const input =
            document.getElementById("search-input");

        if (input) {
            input.value = transcript;
            searchMenu(transcript);

            document.getElementById("menu")?.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    recognition.onerror = () => {
        showToast(
            "Voice search could not be completed.",
            "error"
        );
    };

    recognition.start();
}


/* ==================== CART ==================== */

function addToCart(itemId) {
    const item = menuItems.find(
        food => food.id === itemId
    );

    if (!item) return;

    const existing = cart.find(
        food => food.id === itemId
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    saveCart();
    renderCart();

    showToast(
        `${item.name} added to your cart.`,
        "success"
    );
}


function removeFromCart(itemId) {
    cart = cart.filter(
        item => item.id !== itemId
    );

    saveCart();
    renderCart();
}


function changeCartQuantity(itemId, change) {
    const item = cart.find(
        food => food.id === itemId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    saveCart();
    renderCart();
}


function renderCart() {
    const cartItemsContainer =
        document.getElementById("cart-items");

    const cartEmpty =
        document.getElementById("cart-empty");

    if (!cartItemsContainer || !cartEmpty) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "";
        cartEmpty.classList.add("visible");
    } else {
        cartEmpty.classList.remove("visible");

        cartItemsContainer.innerHTML =
            cart.map(item => `
                <div class="cart-item">

                    <div class="cart-item-image">
                        <img
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
                            onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80';"
                        >
                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${escapeHTML(item.name)}
                        </h4>

                        <span>
                            ${formatPrice(item.price)}
                        </span>


                        <div class="cart-item-actions">

                            <button
                                class="cart-qty-btn"
                                type="button"
                                onclick="changeCartQuantity(${item.id}, -1)"
                            >
                                -
                            </button>

                            <span class="cart-qty-value">
                                ${item.quantity}
                            </span>

                            <button
                                class="cart-qty-btn"
                                type="button"
                                onclick="changeCartQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div>

                        <strong>
                            ${formatPrice(item.price * item.quantity)}
                        </strong>

                        <button
                            class="cart-remove-btn"
                            type="button"
                            onclick="removeFromCart(${item.id})"
                            title="Remove"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </div>
            `).join("");
    }

    updateCartTotals();
}


function updateCartTotals() {
    const subtotal =
        calculateSubtotal();

    const discount =
        subtotal * (currentDiscount / 100);

    const total =
        Math.max(0, subtotal - discount);

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const discountElement =
        document.getElementById("cart-discount");

    const totalElement =
        document.getElementById("cart-total");

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

    if (totalElement) {
        totalElement.textContent =
            formatPrice(total);
    }
}


function calculateSubtotal() {
    return cart.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );
}


function toggleCart() {
    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");

    if (!sidebar || !overlay) return;

    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");

    document.body.classList.toggle(
        "no-scroll",
        sidebar.classList.contains("open")
    );
}


function saveCart() {
    localStorage.setItem(
        "foodieCart",
        JSON.stringify(cart)
    );
}


/* ==================== PROMO ==================== */

function applyPromoCode() {
    const input =
        document.getElementById("promo-input");

    if (!input) return;

    const code =
        input.value.trim().toUpperCase();

    if (!code) {
        showToast(
            "Please enter a promo code.",
            "error"
        );

        return;
    }

    if (code === "WELCOME20") {
        currentDiscount = 20;

        localStorage.setItem(
            "foodieDiscount",
            currentDiscount
        );

        updateCartTotals();

        showToast(
            "20% discount applied successfully!",
            "success"
        );

        return;
    }

    showToast(
        "Invalid promo code.",
        "error"
    );
}


function copyPromoCode() {
    const code =
        document.getElementById("promo-code-text")?.textContent ||
        "WELCOME20";

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
                    `Promo code: ${code}`,
                    "success"
                );
            });
    } else {
        showToast(
            `Promo code: ${code}`,
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
            "Your cart is empty. Add some food first.",
            "error"
        );

        return;
    }

    const screen =
        document.getElementById("checkout-screen");

    if (!screen) return;

    renderCheckoutSummary();
    togglePaymentInfo();

    const sidebar =
        document.getElementById("cart-sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    const overlay =
        document.getElementById("cart-overlay");

    if (overlay) {
        overlay.classList.remove("show");
    }

    screen.classList.remove("hidden");

    document.body.classList.add("no-scroll");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function closeCheckoutModal() {
    const screen =
        document.getElementById("checkout-screen");

    if (screen) {
        screen.classList.add("hidden");
    }

    document.body.classList.remove("no-scroll");
}


function renderCheckoutSummary() {
    const itemsContainer =
        document.getElementById("checkout-summary-items");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const discountElement =
        document.getElementById("checkout-discount");

    const totalElement =
        document.getElementById("checkout-final-total");

    const countElement =
        document.getElementById("checkout-summary-count");

    if (!itemsContainer) return;

    itemsContainer.innerHTML = "";

    let subtotal = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;
        itemCount += item.quantity;

        const row =
            document.createElement("div");

        row.className =
            "checkout-summary-item";

        row.innerHTML = `
            <div class="checkout-summary-item-image">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80';"
                >

            </div>


            <div class="checkout-summary-item-info">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>
                    Qty: ${item.quantity}
                </span>

            </div>


            <strong class="checkout-summary-item-price">
                ${formatPrice(itemTotal)}
            </strong>
        `;

        itemsContainer.appendChild(row);
    });

    const discount =
        subtotal * (currentDiscount / 100);

    const total =
        Math.max(0, subtotal - discount);

    if (countElement) {
        countElement.textContent =
            itemCount;
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

    if (totalElement) {
        totalElement.textContent =
            formatPrice(total);
    }
}


function togglePaymentInfo() {
    const selected =
        document.querySelector(
            'input[name="payment-method"]:checked'
        );

    const details =
        document.getElementById("payment-extra");

    const content =
        document.getElementById("payment-extra-content");

    if (!selected || !details || !content) {
        return;
    }

    const method =
        selected.value;

    if (method === "Cash on Delivery") {
        details.classList.add("hidden");
        content.innerHTML = "";
        return;
    }

    details.classList.remove("hidden");

    if (method === "JazzCash") {
        content.innerHTML = `
            <i class="fa-solid fa-mobile-screen-button"></i>

            <div>
                <strong>
                    JazzCash Payment
                </strong>

                <span>
                    After placing the order, send the payment
                    to the Foodie Express JazzCash account shown
                    by our team on WhatsApp.
                </span>
            </div>
        `;
    }

    else if (method === "EasyPaisa") {
        content.innerHTML = `
            <i class="fa-solid fa-wallet"></i>

            <div>
                <strong>
                    EasyPaisa Payment
                </strong>

                <span>
                    After placing the order, our team will provide
                    the EasyPaisa payment details through WhatsApp.
                </span>
            </div>
        `;
    }

    else if (method === "Card") {
        content.innerHTML = `
            <i class="fa-solid fa-credit-card"></i>

            <div>
                <strong>
                    Card Payment
                </strong>

                <span>
                    Card payment instructions will be provided
                    securely by our team through WhatsApp.
                </span>
            </div>
        `;
    }
}


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

    const payment =
        document.querySelector(
            'input[name="payment-method"]:checked'
        );

    if (!name || !phone || !email || !address || !city) {
        showToast(
            "Please complete all required delivery details.",
            "error"
        );

        return;
    }

    if (!payment) {
        showToast(
            "Please select a payment method.",
            "error"
        );

        return;
    }

    const subtotal =
        calculateSubtotal();

    const discount =
        subtotal * (currentDiscount / 100);

    const total =
        Math.max(0, subtotal - discount);

    const orderId =
        "FE-" +
        Date.now().toString().slice(-8);

    const order = {
        id: orderId,
        date: new Date().toLocaleString(),
        customer: {
            name,
            phone,
            email,
            address,
            city,
            note
        },
        paymentMethod: payment.value,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        subtotal,
        discount,
        total
    };

    orderHistory.unshift(order);

    if (orderHistory.length > 20) {
        orderHistory =
            orderHistory.slice(0, 20);
    }

    localStorage.setItem(
        "foodieOrderHistory",
        JSON.stringify(orderHistory)
    );

    const previousOrders =
        Number(localStorage.getItem("foodieTotalOrders")) || 0;

    localStorage.setItem(
        "foodieTotalOrders",
        previousOrders + 1
    );

    const previousCoins =
        Number(localStorage.getItem("foodieCoins")) || 0;

    localStorage.setItem(
        "foodieCoins",
        previousCoins + Math.floor(total / 100)
    );

    saveUserData(order.customer);

    const whatsappItems =
        order.items
            .map(item =>
                `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
            )
            .join("\n");

    const whatsappMessage = `
*Foodie Express - New Order*

*Order ID:* ${orderId}

*Customer Details*
Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}
City: ${city}
Delivery Note: ${note || "None"}

*Payment Method*
${payment.value}

*Order Items*
${whatsappItems}

*Subtotal:* ${formatPrice(subtotal)}
*Discount:* ${formatPrice(discount)}
*Final Total:* ${formatPrice(total)}

Thank you for ordering from Foodie Express!
`.trim();

    cart = [];

    currentDiscount = 0;

    saveCart();

    localStorage.setItem(
        "foodieDiscount",
        "0"
    );

    renderCart();
    renderDashboard();

    const checkoutForm =
        document.getElementById("checkout-form");

    if (checkoutForm) {
        checkoutForm.reset();
    }

    closeCheckoutModal();

    showToast(
        `Order ${orderId} placed successfully!`,
        "success"
    );

    playSuccessSound();

    updateTrackingFromHistory();

    document.getElementById("tracking-section")?.classList.remove(
        "hidden"
    );

    document.getElementById("tracking-section")?.scrollIntoView({
        behavior: "smooth"
    });

    const whatsappURL =
        `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}


/* ==================== LOCATION ==================== */

function detectUserLocation(target = "hero") {
    if (!navigator.geolocation) {
        showToast(
            "Location is not supported by this browser.",
            "error"
        );

        return;
    }

    showToast(
        "Getting your location...",
        "success"
    );

    navigator.geolocation.getCurrentPosition(
        position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            if (target === "checkout") {
                const address =
                    document.getElementById("cust-address");

                if (address) {
                    address.value =
                        `Location: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                }
            }

            showToast(
                "Location detected successfully.",
                "success"
            );
        },

        () => {
            showToast(
                "Unable to access your location.",
                "error"
            );
        }
    );
}


/* ==================== WISHLIST ==================== */

function toggleWishlist(itemId) {
    const item =
        menuItems.find(food => food.id === itemId);

    if (!item) return;

    const index =
        wishlist.findIndex(
            food => food.id === itemId
        );

    if (index === -1) {
        wishlist.push(item);

        showToast(
            `${item.name} added to favorites.`,
            "success"
        );
    } else {
        wishlist.splice(index, 1);

        showToast(
            `${item.name} removed from favorites.`,
            "success"
        );
    }

    saveWishlist();
    renderMenu(menuItems);
    renderWishlist();
    renderDashboard();
}


function saveWishlist() {
    localStorage.setItem(
        "foodieWishlist",
        JSON.stringify(wishlist)
    );
}


function renderWishlist() {
    const container =
        document.getElementById("wishlist-container");

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="cart-empty visible">
                <div class="cart-empty-icon">
                    <i class="fa-regular fa-heart"></i>
                </div>

                <h3>
                    No favorites yet
                </h3>

                <p>
                    Save your favorite food here.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        wishlist.map(item => `
            <div class="wishlist-item">

                <div class="wishlist-item-info">

                    <div class="wishlist-item-image">
                        <img
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
                        >
                    </div>

                    <div>
                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <span>
                            ${formatPrice(item.price)}
                        </span>
                    </div>

                </div>


                <div style="display:flex;gap:7px;">

                    <button
                        class="add-cart-btn"
                        type="button"
                        onclick="addToCart(${item.id})"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                    <button
                        class="wishlist-remove"
                        type="button"
                        onclick="toggleWishlist(${item.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>
        `).join("");
}


/* ==================== ITEM DETAIL ==================== */

function openItemDetailModal(itemId) {
    const item =
        menuItems.find(food => food.id === itemId);

    const modal =
        document.getElementById("item-detail-modal");

    const body =
        document.getElementById("item-detail-body");

    if (!item || !modal || !body) return;

    body.innerHTML = `
        <div class="item-detail-content">

            <div class="item-detail-image">
                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                >
            </div>

            <span class="eyebrow">
                ${escapeHTML(item.category)}
            </span>

            <h2>
                ${escapeHTML(item.name)}
            </h2>

            <p>
                ${escapeHTML(item.description)}
            </p>

            <div style="display:flex;justify-content:space-between;align-items:center;margin:20px 0;">

                <strong style="color:var(--primary);font-size:1.2rem;">
                    ${formatPrice(item.price)}
                </strong>

                <span class="food-rating">
                    <i class="fa-solid fa-star"></i>
                    ${item.rating}
                </span>

            </div>

            <button
                class="primary-btn full-width"
                type="button"
                onclick="addToCart(${item.id}); closeItemDetailModal();"
            >
                Add To Cart
                <i class="fa-solid fa-bag-shopping"></i>
            </button>

        </div>
    `;

    modal.classList.add("show");
    document.body.classList.add("no-scroll");
}


function closeItemDetailModal() {
    const modal =
        document.getElementById("item-detail-modal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.classList.remove("no-scroll");
}


/* ==================== AUTH ==================== */

function openAuthModal(screen = "login") {
    const modal =
        document.getElementById("auth-modal");

    if (!modal) return;

    modal.classList.add("show");

    switchAuthScreen(screen);

    document.body.classList.add("no-scroll");
}


function closeAuthModal() {
    const modal =
        document.getElementById("auth-modal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.classList.remove("no-scroll");
}


function switchAuthScreen(screen) {
    const loginScreen =
        document.getElementById("login-screen");

    const signupScreen =
        document.getElementById("signup-screen");

    if (!loginScreen || !signupScreen) return;

    if (screen === "signup") {
        loginScreen.classList.add("hidden");
        signupScreen.classList.remove("hidden");
    } else {
        signupScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    }
}


function handleAuth(event, type) {
    event.preventDefault();

    if (type === "signup") {
        const name =
            document.getElementById("signup-name")?.value.trim();

        const email =
            document.getElementById("signup-email")?.value.trim();

        const password =
            document.getElementById("signup-password")?.value;

        if (!name || !email || !password) {
            showToast(
                "Please complete all fields.",
                "error"
            );

            return;
        }

        localStorage.setItem(
            "foodieUser",
            JSON.stringify({
                name,
                email,
                password
            })
        );

        showToast(
            "Account created successfully!",
            "success"
        );

        switchAuthScreen("login");

        return;
    }

    const email =
        document.getElementById("login-email")?.value.trim();

    const password =
        document.getElementById("login-password")?.value;

    const savedUser =
        JSON.parse(
            localStorage.getItem("foodieUser") || "null"
        );

    if (
        savedUser &&
        savedUser.email === email &&
        savedUser.password === password
    ) {
        localStorage.setItem(
            "foodieLoggedIn",
            "true"
        );

        showToast(
            `Welcome back, ${savedUser.name}!`,
            "success"
        );

        closeAuthModal();
        renderDashboard();

        return;
    }

    if (!savedUser) {
        showToast(
            "No account found. Please create an account first.",
            "error"
        );

        return;
    }

    showToast(
        "Incorrect email or password.",
        "error"
    );
}


function handleLogout() {
    localStorage.removeItem("foodieLoggedIn");

    showToast(
        "You have been logged out.",
        "success"
    );

    closeDashboardModal();
}


/* ==================== DASHBOARD ==================== */

function openDashboardModal() {
    renderDashboard();

    const modal =
        document.getElementById("dashboard-modal");

    if (!modal) return;

    modal.classList.add("show");

    document.body.classList.add("no-scroll");
}


function closeDashboardModal() {
    const modal =
        document.getElementById("dashboard-modal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.classList.remove("no-scroll");
}


function renderDashboard() {
    const ordersElement =
        document.getElementById("total-orders-count");

    const coinsElement =
        document.getElementById("loyalty-coins-count");

    const wishlistElement =
        document.getElementById("wishlist-count");

    const historyContainer =
        document.getElementById("history-container");

    const totalOrders =
        Number(
            localStorage.getItem("foodieTotalOrders")
        ) || orderHistory.length;

    const coins =
        Number(
            localStorage.getItem("foodieCoins")
        ) || 0;

    if (ordersElement) {
        ordersElement.textContent =
            totalOrders;
    }

    if (coinsElement) {
        coinsElement.textContent =
            coins;
    }

    if (wishlistElement) {
        wishlistElement.textContent =
            wishlist.length;
    }

    if (!historyContainer) return;

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `
            <p style="color:var(--muted);font-size:.82rem;">
                No orders yet.
            </p>
        `;

        return;
    }

    historyContainer.innerHTML =
        orderHistory.map(order => `
            <div class="history-item">

                <strong>
                    ${escapeHTML(order.id)}
                </strong>

                <span>
                    ${escapeHTML(order.date)}
                </span>

                <span>
                    ${order.items.length} item(s) ·
                    ${formatPrice(order.total)}
                </span>

            </div>
        `).join("");
}


/* ==================== WISHLIST MODAL ==================== */

function toggleWishlistModal() {
    const modal =
        document.getElementById("wishlist-modal");

    if (!modal) return;

    renderWishlist();

    modal.classList.toggle("show");

    document.body.classList.toggle(
        "no-scroll",
        modal.classList.contains("show")
    );
}


function closeWishlistModal() {
    const modal =
        document.getElementById("wishlist-modal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.classList.remove("no-scroll");
}


/* ==================== RESERVATION ==================== */

function setReservationMinDate() {
    const dateInput =
        document.getElementById("reservation-date");

    if (!dateInput) return;

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.min = today;
}


function submitReservation(event) {
    event.preventDefault();

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
            "Please complete your reservation details.",
            "error"
        );

        return;
    }

    const reservationMessage = `
*Foodie Express - Table Reservation*

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}
Special Request: ${note || "None"}
`.trim();

    showToast(
        "Reservation request created successfully!",
        "success"
    );

    const whatsappURL =
        `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(reservationMessage)}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

    event.target.reset();

    setReservationMinDate();
}


/* ==================== TRACKING ==================== */

function updateTrackingFromHistory() {
    const trackingSection =
        document.getElementById("tracking-section");

    const latestOrder =
        orderHistory[0];

    if (!trackingSection || !latestOrder) {
        return;
    }

    trackingSection.classList.remove("hidden");

    const orderId =
        document.getElementById("tracking-order-id");

    const message =
        document.getElementById("tracking-message");

    if (orderId) {
        orderId.textContent =
            latestOrder.id;
    }

    if (message) {
        message.textContent =
            `Your order was placed on ${latestOrder.date}.`;
    }
}


/* ==================== USER DATA ==================== */

function saveUserData(customer) {
    if (!customer) return;

    localStorage.setItem(
        "foodieLastCustomer",
        JSON.stringify(customer)
    );
}


/* ==================== TOAST ==================== */

function showToast(message, type = "success") {
    const container =
        document.getElementById("toast-container");

    if (!container) return;

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent =
        message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";

        setTimeout(() => {
            toast.remove();
        }, 250);

    }, 3000);
}


/* ==================== SUCCESS SOUND ==================== */

function playSuccessSound() {
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
            520,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            760,
            audioContext.currentTime + 0.15
        );

        gain.gain.setValueAtTime(
            0.001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.12,
            audioContext.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.25
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.25
        );

    } catch (error) {
        /* Audio is optional. */
    }
}


/* ==================== GLOBAL KEYBOARD ==================== */

function handleGlobalKeydown(event) {
    if (event.key !== "Escape") {
        return;
    }

    const checkoutScreen =
        document.getElementById("checkout-screen");

    if (
        checkoutScreen &&
        !checkoutScreen.classList.contains("hidden")
    ) {
        closeCheckoutModal();
        return;
    }

    const authModal =
        document.getElementById("auth-modal");

    if (
        authModal &&
        authModal.classList.contains("show")
    ) {
        closeAuthModal();
        return;
    }

    const dashboardModal =
        document.getElementById("dashboard-modal");

    if (
        dashboardModal &&
        dashboardModal.classList.contains("show")
    ) {
        closeDashboardModal();
        return;
    }

    const wishlistModal =
        document.getElementById("wishlist-modal");

    if (
        wishlistModal &&
        wishlistModal.classList.contains("show")
    ) {
        closeWishlistModal();
        return;
    }

    const itemModal =
        document.getElementById("item-detail-modal");

    if (
        itemModal &&
        itemModal.classList.contains("show")
    ) {
        closeItemDetailModal();
        return;
    }

    const cartSidebar =
        document.getElementById("cart-sidebar");

    if (
        cartSidebar &&
        cartSidebar.classList.contains("open")
    ) {
        toggleCart();
    }
}


/* ==================== MODAL CLICK OUTSIDE ==================== */

document.addEventListener("click", event => {

    const modalIds = [
        "auth-modal",
        "dashboard-modal",
        "wishlist-modal",
        "item-detail-modal"
    ];

    modalIds.forEach(id => {

        const modal =
            document.getElementById(id);

        if (
            modal &&
            event.target === modal
        ) {
            modal.classList.remove("show");

            document.body.classList.remove(
                "no-scroll"
            );
        }
    });

});


/* ==================== HTML ESCAPE ==================== */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ==================== GLOBAL FUNCTIONS ==================== */

window.toggleTheme = toggleTheme;
window.changeCurrency = changeCurrency;
window.changeLanguage = changeLanguage;

window.filterMenu = filterMenu;
window.searchMenu = searchMenu;
window.submitSearch = submitSearch;
window.handleSearchKeydown = handleSearchKeydown;
window.startVoiceSearch = startVoiceSearch;

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeCartQuantity = changeCartQuantity;
window.toggleCart = toggleCart;

window.applyPromoCode = applyPromoCode;
window.copyPromoCode = copyPromoCode;

window.checkout = checkout;
window.closeCheckoutModal = closeCheckoutModal;
window.togglePaymentInfo = togglePaymentInfo;
window.processOrder = processOrder;

window.detectUserLocation = detectUserLocation;

window.toggleWishlist = toggleWishlist;
window.toggleWishlistModal = toggleWishlistModal;
window.closeWishlistModal = closeWishlistModal;

window.openItemDetailModal = openItemDetailModal;
window.closeItemDetailModal = closeItemDetailModal;

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthScreen = switchAuthScreen;
window.handleAuth = handleAuth;
window.handleLogout = handleLogout;

window.openDashboardModal = openDashboardModal;
window.closeDashboardModal = closeDashboardModal;

window.submitReservation = submitReservation;
