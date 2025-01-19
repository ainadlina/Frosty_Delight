document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  const cart = document.querySelector(".cart");
  const closeCartButton = document.querySelector(".close-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalElement = document.querySelector(".cart-total");
  const cartItemCount = document.querySelector(".cart-item-count");
  const categoryButtons = document.querySelectorAll(".category-tabs button");
  const menuItems = document.querySelectorAll(".menu-item");
  const subcategoryFilters = document.getElementById("subcategory-filters");
  const subcategoryButtons = subcategoryFilters.querySelectorAll(".filter-btn");

  let cartItems = []; // Array to store cart items

  // Open Cart
  const openCart = () => {
    cart.classList.remove("hidden");
  };

  // Close Cart
  const closeCart = () => {
    cart.classList.add("hidden");
  };

  // Update Cart Total
  const updateCartTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: RM${total.toFixed(2)}`;
    cartItemCount.textContent = cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Render Cart
  const renderCart = () => {
    cartItemsContainer.innerHTML = ""; // Clear the cart display

    cartItems.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} (x${item.quantity}) - RM${(item.price * item.quantity).toFixed(2)}
        <button class="remove-item" data-id="${item.id}"><i class="fa fa-trash"></i></button>
      `;
      cartItemsContainer.appendChild(li);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemId = e.target.closest("button").dataset.id;
        removeItemFromCart(itemId);
      });
    });

    updateCartTotal();
  };

  // Add Item to Cart
  const addItemToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if item exists
    } else {
      cartItems.push({ ...item, quantity: 1 }); // Add new item
    }

    renderCart(); // Update cart display
  };

  // Remove Item from Cart
  const removeItemFromCart = (id) => {
    cartItems = cartItems.filter((item) => item.id !== id); // Filter out the item
    renderCart(); // Update cart display
  };

  // Add to Cart Button Click Listener
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const menuItem = e.target.closest(".menu-item");
      const id = menuItem.querySelector("h3").textContent; // Use item name as ID
      const name = menuItem.querySelector("h3").textContent;
      const price = parseFloat(menuItem.querySelector(".price").textContent.replace("RM", "")); // Extract price

      addItemToCart({ id, name, price });
    }
  });

  // Open Cart Event Listener
  cartIcon.addEventListener("click", openCart);

  // Close Cart Event Listener
  closeCartButton.addEventListener("click", closeCart);

  // Filter Menu Items by Category
  function filterItems(category) {
    menuItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      if (category === "all" || itemCategory === category) {
        item.style.display = "block"; // Show matching items
      } else {
        item.style.display = "none"; // Hide non-matching items
      }
    });
  }

  // Toggle Subcategory Filters Visibility
  function toggleSubcategoryFilters(show) {
    if (show) {
      subcategoryFilters.style.display = "block";
    } else {
      subcategoryFilters.style.display = "none";
    }
  }

  // Category Buttons Event Listener
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Update active state
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      if (category === "drinks") {
        toggleSubcategoryFilters(true);
        filterItems(category); // Show drinks and subcategories
      } else {
        toggleSubcategoryFilters(false);
        filterItems(category); // Filter by main category
      }
    });
  });

  // Subcategory Buttons Event Listener
  subcategoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const subcategory = button.getAttribute("data-category");

      // Update active state
      subcategoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      filterItems(subcategory); // Filter by subcategory
    });
  });
});
