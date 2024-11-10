import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";
products.forEach((product) => {
  productsHTML =
    productsHTML +
    `<div class="product-container"> 
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars.toFixed(
                1
              )}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary addToCart"
           data-product-id="${product.id}"
           >
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

//ADD TO CART

function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  //QUANTITY DROPDOWN
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);
  //Cart Item already in Cart?
  if (matchingItem) {
    matchingItem.quantity = matchingItem.quantity + quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
}

//UPDATE CART QUANTITY

function updateCartQuantity() {
  let totalCartQuantity = 0;
  cart.forEach((item) => {
    totalCartQuantity = totalCartQuantity + item.quantity;
  });
  document.querySelector(".js-totalCartQuantity").innerHTML = totalCartQuantity;
}

document.querySelectorAll(".addToCart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);

    //MESSAGE
    const addedMssg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMssg.classList.add("addedToCartMssg"); //used for registering it if clicked on add more than once for the same product...linked to below to check if it matches

    //TIMEOUTS for Message
    const addedMessageTimeouts = {};
    const prevTimeoutId = addedMessageTimeouts[productId];
    if (prevTimeoutId) {
      clearTimeout(prevTimeoutId);
    }
    // setTimeout(() => {
    const timeoutId = setTimeout(() => {
      addedMssg.classList.remove("addedToCartMssg");
    }, 3000);
    updateCartQuantity();
    console.log(totalCartQuantity);
    console.log(cart);
  });
});
