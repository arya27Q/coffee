/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".menu-category button");
  const menuSections = document.querySelectorAll(".menu-grid");
  const addButtons = document.querySelectorAll(".add-btn");

  const cartModal = document.getElementById("cart-modal");
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeBtn = document.querySelector(".close-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const emptyMessage = document.querySelector(".empty-cart-message");
  const cartItemCount = document.getElementById("cart-item-count");

  let cart = [];

  function parsePrice(priceString) {
    return parseFloat(
      priceString.replace("RP.", "").replace(".", "").replace(",", ".")
    );
  }

  function formatPrice(number) {
    return `RP.${number.toLocaleString("id-ID")}`;
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.appendChild(emptyMessage);
      checkoutBtn.disabled = true;
      cartItemCount.textContent = 0;
    } else {
      if (emptyMessage.parentNode) {
        emptyMessage.remove();
      }
      checkoutBtn.disabled = false;
      cartItemCount.textContent = cart.length;

      cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        const priceValue = parsePrice(item.price);
        total += priceValue;

        itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <span>${item.price}</span>
                    </div>
                    <div class="cart-item-controls">
                        <span class="cart-item-price">${formatPrice(
                          priceValue
                        )}</span>
                        <button class="remove-btn" data-index="${index}">&times;</button>
                    </div>
                `;
        cartItemsContainer.appendChild(itemElement);
      });
    }

    cartTotalPrice.textContent = formatPrice(total);
  }

  function handleRemoveItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }

  function handleAddItem(event) {
    const card = event.target.closest(".card");

    if (card) {
      const productName = card.querySelector("h3").textContent;
      const productPrice = card.querySelector("span").textContent;

      cart.push({ name: productName, price: productPrice });
      updateCartDisplay();

      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "✅ Added!";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1000);

      cartModal.style.display = "block";
    }
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const selectedCategory = button.getAttribute("data-category");
      menuSections.forEach((section) => section.classList.add("hidden"));
      const activeSection = document.getElementById(selectedCategory);
      if (activeSection) activeSection.classList.remove("hidden");
    });
  });

  addButtons.forEach((button) => {
    button.addEventListener("click", handleAddItem);
  });

  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const index = parseInt(event.target.dataset.index);
      handleRemoveItem(index);
    }
  });

  checkoutBtn.addEventListener("click", () => {
    alert(
      "Proceeding to checkout with a total of " + cartTotalPrice.textContent
    );
  });

  openCartBtn.onclick = function () {
    cartModal.style.display = "block";
  };

  closeBtn.onclick = function () {
    cartModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == cartModal) {
      cartModal.style.display = "none";
    }
  };

  updateCartDisplay();
});
