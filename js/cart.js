const cartItems = document.getElementById("cartItems");

const totalElement = document.getElementById("cartTotal");

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const counter = document.getElementById("cartCount");

  if (counter) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    counter.textContent = totalItems;
  }
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">

        <h2>
          Your Cart Is Empty
        </h2>

        <p>
          Start shopping to add products.
        </p>

      </div>
    `;

    totalElement.textContent = 0;

    document.getElementById("itemCount").textContent = 0;

    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const product = products.find((p) => p.id === item.id);

    if (!product) return;

    total += product.price * item.quantity;

    cartItems.innerHTML += `

      <div class="card">

        <img
        src="${product.image}"
        alt="${product.name}">

        <div class="cart-info">

          <h3>
            ${product.name}
          </h3>

          <div class="rating">
            ⭐ ${product.rating}
          </div>

          <div class="quantity-controls">

            <button
            onclick="decreaseQty(${index})">

              −

            </button>

            <span>
              ${item.quantity}
            </span>

            <button
            onclick="increaseQty(${index})">

              +
            </button>

          </div>

          <p class="price">

            ₹${(product.price * item.quantity).toLocaleString()}

          </p>

          <p class="description">
            ${product.description}
          </p>

          <button
          class="remove-btn"
          onclick="removeItem(${index})">

            Remove

          </button>

        </div>

      </div>

    `;
  });

  totalElement.textContent = total.toLocaleString();

  document.getElementById("itemCount").textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  renderCart();
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  renderCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  renderCart();
}

updateCartCount();

renderCart();
