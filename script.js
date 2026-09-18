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

    const checkoutScreen =
        document.getElementById("checkout-screen");

    if (!checkoutScreen) return;

    checkoutScreen.classList.remove("hidden");

    checkoutScreen.setAttribute(
        "aria-hidden",
        "false"
    );

    updateCheckoutSummary();

    togglePaymentInfo();

    const sidebar =
        document.getElementById("cart-sidebar");

    if (sidebar) {

        sidebar.classList.remove("open");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function closeCheckoutModal() {

    const checkoutScreen =
        document.getElementById("checkout-screen");

    if (!checkoutScreen) return;

    checkoutScreen.classList.add("hidden");

    checkoutScreen.setAttribute(
        "aria-hidden",
        "true"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   CHECKOUT SUMMARY
========================================================= */

function updateCheckoutSummary() {

    const itemsContainer =
        document.getElementById(
            "checkout-summary-items"
        );

    const countElement =
        document.getElementById(
            "checkout-summary-count"
        );

    const subtotalElement =
        document.getElementById(
            "checkout-subtotal"
        );

    const discountElement =
        document.getElementById(
            "checkout-discount"
        );

    const totalElement =
        document.getElementById(
            "checkout-final-total"
        );

    let subtotal = 0;

    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    cart.forEach(item => {

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


    if (countElement) {

        countElement.textContent =
            `${totalQuantity} ${
                totalQuantity === 1
                    ? "item"
                    : "items"
            }`;

    }


    if (itemsContainer) {

        if (cart.length === 0) {

            itemsContainer.innerHTML = `
                <div class="checkout-empty">
                    Your bag is empty.
                </div>
            `;

        } else {

            itemsContainer.innerHTML = "";

            cart.forEach(item => {

                const itemTotal =
                    item.price *
                    item.quantity;

                const row =
                    document.createElement("div");

                row.className =
                    "checkout-summary-item";

                row.innerHTML = `
                    <div class="checkout-summary-item-image">
                        <img
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
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

        }

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


/* =========================================================
   CHECKOUT PAYMENT
========================================================= */

function togglePaymentInfo() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const details =
        document.getElementById(
            "online-payment-details"
        );

    if (!details) return;

    if (!selected) {

        details.classList.add("hidden");

        return;
    }

    const method =
        selected.value;

    if (method === "Cash on Delivery") {

        details.classList.add("hidden");

        details.innerHTML = "";

        return;
    }

    details.classList.remove("hidden");


    if (method === "JazzCash") {

        details.innerHTML = `
            <i class="fa-solid fa-mobile-screen-button"></i>

            <div>
                <strong>JazzCash Payment</strong>

                <span>
                    Payment instructions will be
                    provided through WhatsApp
                    after your order is placed.
                </span>
            </div>
        `;

    } else if (method === "EasyPaisa") {

        details.innerHTML = `
            <i class="fa-solid fa-wallet"></i>

            <div>
                <strong>EasyPaisa Payment</strong>

                <span>
                    Payment instructions will be
                    provided through WhatsApp
                    after your order is placed.
                </span>
            </div>
        `;

    } else if (
        method === "Debit / Credit Card"
    ) {

        details.innerHTML = `
            <i class="fa-solid fa-credit-card"></i>

            <div>
                <strong>Card Payment</strong>

                <span>
                    This is a frontend demo.
                    Never enter real card details.
                    Payment confirmation will be
                    handled through WhatsApp.
                </span>
            </div>
        `;

    }
}


/* =========================================================
   CHECKOUT LOCATION
========================================================= */

function detectCheckoutLocation() {

    detectUserLocation();

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

    const email =
        document.getElementById("cust-email")
            ?.value.trim();

    const address =
        document.getElementById("cust-address")
            ?.value.trim();

    const city =
        document.getElementById("cust-city")
            ?.value.trim();

    const note =
        document.getElementById("delivery-note")
            ?.value.trim();


    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const payment =
        selectedPayment
            ? selectedPayment.value
            : "";


    if (
        !name ||
        !phone ||
        !address ||
        !payment
    ) {

        showToast(
            "Please complete all required checkout fields.",
            "error"
        );

        return;
    }


    const terms =
        document.getElementById(
            "checkout-terms"
        );

    if (
        terms &&
        !terms.checked
    ) {

        showToast(
            "Please confirm your order details.",
            "error"
        );

        return;
    }


    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    const discount =
        subtotal *
        (currentDiscount / 100);

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

            email,

            address,

            city,

            note

        },

        payment,

        items:
            JSON.parse(
                JSON.stringify(cart)
            ),

        subtotal,

        discount,

        total,

        currency:
            currentCurrency,

        date:
            new Date()
                .toLocaleString(),

        status:
            "Order Placed"

    };


    orderHistory.unshift(order);

    totalOrders += 1;

    loyaltyCoins +=
        Math.floor(
            total / 100
        );


    saveOrderHistory();

    saveUserData();


    /* -----------------------------------------------------
       WHATSAPP MESSAGE
    ----------------------------------------------------- */

    let whatsappMessage =
        `*FOODIE EXPRESS - NEW ORDER*%0A%0A`;

    whatsappMessage +=
        `*Order ID:* ${orderId}%0A`;

    whatsappMessage +=
        `*Customer:* ${name}%0A`;

    whatsappMessage +=
        `*Phone:* ${phone}%0A`;

    if (email) {

        whatsappMessage +=
            `*Email:* ${email}%0A`;

    }

    whatsappMessage +=
        `*Address:* ${address}%0A`;

    if (city) {

        whatsappMessage +=
            `*City:* ${city}%0A`;

    }

    if (note) {

        whatsappMessage +=
            `*Delivery Note:* ${note}%0A`;

    }

    whatsappMessage +=
        `*Payment:* ${payment}%0A%0A`;


    whatsappMessage +=
        `*ORDER ITEMS*%0A`;

    cart.forEach(item => {

        whatsappMessage +=
            `• ${item.name} x ${item.quantity} = ${formatPrice(
                item.price *
                item.quantity
            )}%0A`;

    });


    whatsappMessage +=
        `%0A*Subtotal:* ${formatPrice(subtotal)}%0A`;

    whatsappMessage +=
        `*Discount:* ${formatPrice(discount)}%0A`;

    whatsappMessage +=
        `*TOTAL:* ${formatPrice(total)}%0A%0A`;

    whatsappMessage +=
        `Please confirm this order. Thank you!`;


    const whatsappURL =
        `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;


    /* -----------------------------------------------------
       CLEAR CART
    ----------------------------------------------------- */

    cart = [];

    currentDiscount = 0;

    saveCartToStorage();

    updateCartUI();

    renderOrderHistory();


    /* -----------------------------------------------------
       RESET CHECKOUT
    ----------------------------------------------------- */

    const form =
        document.getElementById(
            "checkout-form"
        );

    if (form) {

        form.reset();

    }


    togglePaymentInfo();

    closeCheckoutModal();


    /* -----------------------------------------------------
       SUCCESS
    ----------------------------------------------------- */

    showToast(
        `Order ${orderId} placed successfully!`
    );

    playCustomSound();

    startOrderTrackingSimulation();


    /* -----------------------------------------------------
       OPEN WHATSAPP
    ----------------------------------------------------- */

    window.open(
        whatsappURL,
        "_blank"
    );


    const tracking =
        document.getElementById(
            "tracking-section"
        );

    if (tracking) {

        setTimeout(() => {

            tracking.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 500);

    }
}/* =========================================================
   ORDER TRACKING
========================================================= */

function startOrderTrackingSimulation() {

    const trackingSection =
        document.getElementById("tracking-section");

    if (!trackingSection) return;

    let currentStep = 0;

    const steps =
        trackingSection.querySelectorAll(
            ".tracking-step"
        );

    if (!steps.length) return;

    steps.forEach(step => {

        step.classList.remove("active");
        step.classList.remove("completed");

    });

    currentStep = 0;

    steps[currentStep]
        ?.classList.add("active");

    clearInterval(trackingTimer);

    trackingTimer =
        setInterval(() => {

            if (currentStep < steps.length - 1) {

                steps[currentStep]
                    ?.classList.remove("active");

                steps[currentStep]
                    ?.classList.add("completed");

                currentStep++;

                steps[currentStep]
                    ?.classList.add("active");

            } else {

                clearInterval(trackingTimer);

            }

        }, 5000);
}


/* =========================================================
   ORDER HISTORY
========================================================= */

function renderOrderHistory() {

    const container =
        document.getElementById(
            "order-history-list"
        );

    if (!container) return;

    if (orderHistory.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-receipt"></i>
                <h3>No Orders Yet</h3>
                <p>Your order history will appear here.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    orderHistory.forEach(order => {

        const card =
            document.createElement("div");

        card.className =
            "order-history-card";

        const itemsText =
            order.items
                .map(item =>
                    `${escapeHTML(item.name)} x ${item.quantity}`
                )
                .join(", ");

        card.innerHTML = `
            <div class="order-history-header">

                <div>
                    <strong>
                        ${escapeHTML(order.id)}
                    </strong>

                    <span>
                        ${escapeHTML(order.date)}
                    </span>
                </div>

                <span class="order-status">
                    ${escapeHTML(order.status)}
                </span>

            </div>

            <div class="order-history-items">
                ${itemsText}
            </div>

            <div class="order-history-footer">

                <span>
                    ${escapeHTML(order.payment)}
                </span>

                <strong>
                    ${formatPrice(order.total)}
                </strong>

            </div>
        `;

        container.appendChild(card);

    });
}


/* =========================================================
   DASHBOARD
========================================================= */

function openDashboard() {

    const dashboard =
        document.getElementById(
            "dashboard-modal"
        );

    if (!dashboard) return;

    dashboard.classList.remove("hidden");

    dashboard.setAttribute(
        "aria-hidden",
        "false"
    );

    updateDashboard();

}


function closeDashboard() {

    const dashboard =
        document.getElementById(
            "dashboard-modal"
        );

    if (!dashboard) return;

    dashboard.classList.add("hidden");

    dashboard.setAttribute(
        "aria-hidden",
        "true"
    );

}


function updateDashboard() {

    const ordersElement =
        document.getElementById(
            "dashboard-total-orders"
        );

    const coinsElement =
        document.getElementById(
            "dashboard-loyalty-coins"
        );

    const userElement =
        document.getElementById(
            "dashboard-user-name"
        );

    if (ordersElement) {

        ordersElement.textContent =
            totalOrders;

    }

    if (coinsElement) {

        coinsElement.textContent =
            loyaltyCoins;

    }

    if (
        userElement &&
        currentUser
    ) {

        userElement.textContent =
            currentUser.name ||
            currentUser.email ||
            "Guest";

    }

}


/* =========================================================
   AUTHENTICATION
========================================================= */

function openAuthModal() {

    const modal =
        document.getElementById(
            "auth-modal"
        );

    if (!modal) return;

    modal.classList.remove("hidden");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeAuthModal() {

    const modal =
        document.getElementById(
            "auth-modal"
        );

    if (!modal) return;

    modal.classList.add("hidden");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


function loginUser(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "login-name"
        )?.value.trim();

    const email =
        document.getElementById(
            "login-email"
        )?.value.trim();

    if (!name || !email) {

        showToast(
            "Please enter your name and email.",
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

    updateSavedSelectors();

    showToast(
        `Welcome, ${name}!`
    );

}


function logout() {

    currentUser = null;

    saveUserData();

    updateSavedSelectors();

    showToast(
        "You have been logged out."
    );

}


/* =========================================================
   CURRENCY
========================================================= */

function changeCurrency(currency) {

    if (!currencyRates[currency]) return;

    currentCurrency =
        currency;

    localStorage.setItem(
        "foodieCurrency",
        currentCurrency
    );

    renderMenu();

    updateCartUI();

    updateCheckoutSummary();

    renderOrderHistory();

    updateSavedSelectors();

    showToast(
        `Currency changed to ${currency}.`
    );

}


/* =========================================================
   LANGUAGE
========================================================= */

function changeLanguage(language) {

    if (!language) return;

    currentLanguage =
        language;

    localStorage.setItem(
        "foodieLanguage",
        currentLanguage
    );

    updateSavedSelectors();

    showToast(
        `Language changed to ${language}.`
    );

}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const enabled =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "foodieDarkMode",
        enabled
    );

    updateSavedSelectors();

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
        "Detecting your location..."
    );

    navigator.geolocation.getCurrentPosition(

        position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const addressField =
                document.getElementById(
                    "cust-address"
                );

            if (addressField) {

                addressField.value =
                    `Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

            }

            showToast(
                "Location detected successfully."
            );

        },

        () => {

            showToast(
                "Unable to detect your location.",
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
            "Voice search is not supported by your browser.",
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

    recognition.interimResults =
        false;

    recognition.maxAlternatives =
        1;

    recognition.onstart = () => {

        showToast(
            "Listening..."
        );

    };

    recognition.onresult = event => {

        const transcript =
            event.results[0][0]
                .transcript;

        const searchInput =
            document.getElementById(
                "search-input"
            );

        if (searchInput) {

            searchInput.value =
                transcript;

        }

        searchMenu(transcript);

    };

    recognition.onerror = () => {

        showToast(
            "Voice search could not be completed.",
            "error"
        );

    };

    recognition.start();

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function openAIAssistant() {

    const assistant =
        document.getElementById(
            "ai-assistant"
        );

    if (!assistant) return;

    assistant.classList.remove(
        "hidden"
    );

}


function closeAIAssistant() {

    const assistant =
        document.getElementById(
            "ai-assistant"
        );

    if (!assistant) return;

    assistant.classList.add(
        "hidden"
    );

}


function sendAIMessage() {

    const input =
        document.getElementById(
            "ai-input"
        );

    const messages =
        document.getElementById(
            "ai-messages"
        );

    if (!input || !messages) return;

    const message =
        input.value.trim();

    if (!message) return;

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "ai-message user";

    userMessage.textContent =
        message;

    messages.appendChild(
        userMessage
    );

    input.value = "";

    const reply =
        document.createElement("div");

    reply.className =
        "ai-message assistant";

    reply.textContent =
        "Thanks! I can help you explore the Foodie Express menu and choose something delicious.";

    messages.appendChild(
        reply
    );

    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================================
   CHATBOT
========================================================= */

function toggleChatbot() {

    const chatbot =
        document.getElementById(
            "chatbot"
        );

    if (!chatbot) return;

    chatbot.classList.toggle(
        "hidden"
    );

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

    const message =
        input.value.trim();

    if (!message) return;

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "chat-message user";

    userMessage.textContent =
        message;

    messages.appendChild(
        userMessage
    );

    input.value = "";

    const botMessage =
        document.createElement("div");

    botMessage.className =
        "chat-message bot";

    botMessage.textContent =
        "Thanks for your message! How can I help you with your Foodie Express order?";

    messages.appendChild(
        botMessage
    );

    messages.scrollTop =
        messages.scrollHeight;

}/* =========================================================
   CHATBOT REPLY
========================================================= */

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


            const checkoutScreen =
                document.getElementById(
                    "checkout-screen"
                );

            if (
                checkoutScreen &&
                !checkoutScreen.classList.contains(
                    "hidden"
                )
            ) {

                closeCheckoutModal();

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
