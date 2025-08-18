document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart");
  const cartTab = document.querySelector(".cart-tab");
  const closeCartBtn = document.querySelector(".close-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart span");
  const addToCartButtons = document.querySelectorAll(".product button");

  let cart = [];

  // Show cart
  cartIcon.addEventListener("click", () => {
    cartTab.style.display = "grid";
  });

  // Hide cart
  closeCartBtn.addEventListener("click", () => {
    cartTab.style.display = "none";
  });

  // Add to cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productElement = e.target.closest(".product");
      const name = productElement.querySelector("h2").textContent;
      const price = productElement.querySelector("p").textContent;
      const image = productElement.querySelector("img").src;

      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      updateCartUI();
    });
  });

  // Update cart
  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("item");

      cartItem.innerHTML = `
        <div class="image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="Name">
          <h3>${item.name}</h3>
        </div>
        <div class="price">
          <p>${item.price}</p>
        </div>
        <div class="quantity">
          <label>Qty:</label>
          <input type="number" min="1" value="${item.quantity}">
        </div>
        <button class="remove-item">Remove</button>
      `;

      cartItem.querySelector("input").addEventListener("change", (e) => {
        const newQty = parseInt(e.target.value);
        if (newQty > 0) {
          item.quantity = newQty;
          updateCartUI();
        }
      });

      cartItem.querySelector(".remove-item").addEventListener("click", () => {
        cart = cart.filter((c) => c.name !== item.name);
        updateCartUI();
      });

      cartItemsContainer.appendChild(cartItem);
    });

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  // Animate products in after DOM loads
  const products = document.querySelectorAll(".product");

  products.forEach((product, index) => {
    setTimeout(() => {
      product.classList.add("slide-in");
    }, index * 150);
  });
});

// CSS for slide-in animation
const style = document.createElement("style");
style.textContent = `
  .product.slide-in {
    animation: slideIn 0.5s forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
// End of home.js
