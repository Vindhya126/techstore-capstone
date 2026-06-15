const container = document.getElementById("products");

const search = document.getElementById("search");

const category = document.getElementById("category");

const sort = document.getElementById("sort");

function renderProducts(list) {
  container.innerHTML = "";

  list.forEach((product) => {
    container.innerHTML += `

<div
class="card"
onclick="
window.location='product.html?id=${product.id}'
">

<img
src="${product.image}"
alt="${product.name}"
onclick="
window.location='product.html?id=${product.id}'
">

<h3>${product.name}</h3>

<div class="rating">
⭐ ${product.rating}
</div>

<p class="price">
₹${product.price.toLocaleString()}
</p>

<p class="description">
${product.description}
</p>
<button
onclick="
event.stopPropagation();
addToCart(${product.id})
">
Add To Cart
</button>
</div>

`;
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  showToast();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const counter = document.getElementById("cartCount");

  if (counter) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    counter.textContent = totalItems;
  }
}

function showToast() {
  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

search.addEventListener("input", filterProducts);

category.addEventListener("change", filterProducts);

sort.addEventListener("change", filterProducts);

function filterProducts() {
  let filtered = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesCategory =
      category.value === "all" || product.category === category.value;

    return matchesSearch && matchesCategory;
  });

  if (sort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

updateCartCount();

renderProducts(products);
