const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const product = products.find((p) => p.id === id);

const container = document.getElementById("productDetails");

if (product) {
  container.innerHTML = `

<div class="product-page">

    <img
    src="${product.image}"
    alt="${product.name}">

    <div class="product-info">

        <span class="product-category">
            ${product.category}
        </span>

        <h1>
            ${product.name}
        </h1>

        <div class="rating">
            ⭐ ${product.rating}
        </div>

        <p class="price">
            ₹${product.price.toLocaleString()}
        </p>

        <p class="description">
            ${product.description}
        </p>

        <a
        href="products.html"
        class="back-btn">

            ← Back To Products

        </a>

        <button
        onclick="addToCart(${product.id})">

            Add To Cart

        </button>

    </div>

</div>

`;
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(id);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added To Cart");
}
