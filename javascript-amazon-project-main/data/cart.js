// export const cart = [
export let cart = JSON.parse(localStorage.getItem("cart")); //Need to get cart from Local Storage but since Cart isn't sting normally so it's made back to array using JSON.parse

if (!cart) {
  cart = [];
}

//LOCAL STORAGE FUNCTION

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); //Saving to local storage(only saves strings, so cart has been converted to string)
}

//ADD TO CART FUNCTION

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  // console.log(productId);

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
      deliveryOptionId: "1", //used  1 for now...need to change later
    });
  }
  saveToStorage();
}
// console.log(cart);

//REMOVE FROM CART FUNCTION

export function removeFromCart(productId) {
  // let deletedProduct;
  const newCart = []; //NEW CART for Deleted product check
  cart.forEach((cartItem) => {
    //To check whatever is in the cart we loop
    if (cartItem.productId !== productId) {
      newCart.push(cartItem); //new cart will be the one after checking delete option, we push cartItem into New Cart
    }
  });
  cart = newCart; //post deletion check...cart is updated...since it's dependent on options lile delete...we change const to let for Cart at the beginning
  saveToStorage();
}

//CALCULATE CART QUANTITY FUNCTION used at multiple files, to optiimize
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity = cartQuantity + cartItem.quantity;
  });
  return cartQuantity;
}

//UPDATE QUANTITY FUNCTION

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}

//UPDATE DELIVERY OPTION FUNTION

export function updateDeliveryOption(productId, deliveryOptionId) {
  //Match the delivery date selection as per checked in the radio options
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
