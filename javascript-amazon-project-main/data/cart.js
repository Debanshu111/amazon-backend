// const cart = [];

export const cart = [];

//ADD TO CART

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
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
