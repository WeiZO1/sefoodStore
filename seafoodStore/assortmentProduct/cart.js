let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функция для добавления товара в корзину
function addToCart(button) {
    const product = button.closest(".product");
    const name = product.getAttribute("data-name");
    const price = parseInt(product.getAttribute("data-price"));
    const image = product.getAttribute("data-image");

    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }

    saveCart();
    updateCart();
    openCart();
}

// Функция для обновления корзины
function updateCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name} - ${item.price} грн. x <span class="quantity">${item.quantity}</span></p>
            <button class="increase-btn" onclick="increaseQuantity(${index}, event)">+</button>
            <button class="decrease-btn" onclick="decreaseQuantity(${index}, event)">-</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById("totalPrice").innerText = total;
}

// Функция для увеличения количества товара
function increaseQuantity(index, event) {
    event.stopPropagation(); // Предотвращаем закрытие корзины
    cart[index].quantity += 1;
    saveCart();
    updateCart();
}

// Функция для уменьшения количества товара
function decreaseQuantity(index, event) {
    event.stopPropagation(); // Предотвращаем закрытие корзины
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCart();
}

function openCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    if (!cartSidebar.classList.contains("open")) {
        cartSidebar.classList.add("open");

        document.removeEventListener("click", closeCartOnClickOutside);
        setTimeout(() => {
            document.addEventListener("click", closeCartOnClickOutside);
        }, 0);
    }
}

function closeCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.remove("open");
    document.removeEventListener("click", closeCartOnClickOutside);
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Функция для закрытия корзины при клике вне её области
function closeCartOnClickOutside(event) {
    const cartSidebar = document.getElementById("cartSidebar");
    const openCartBtn = document.querySelector(".open-cart-btn");

    if (!cartSidebar.contains(event.target) && !openCartBtn.contains(event.target) && !event.target.closest('.product button')) {
        closeCart();
    }
}

document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

// Загружаем корзину при загрузке страницы
window.addEventListener("load", updateCart);
