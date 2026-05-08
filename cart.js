let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function resetCart() {
  cart = [];
  updateCart();
}

function onCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
  
  window.location.href = 'checkout-message.html';
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotal.textContent = '0';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">P${(item.price * item.qty).toLocaleString()}</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
        <span class="cart-item-qty">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
  const dropdown = document.getElementById('cartDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function(e) {
  const container = document.querySelector('.cart-container');
  if (!container.contains(e.target)) {
    document.getElementById('cartDropdown').style.display = 'none';
  }
});
updateCart()
