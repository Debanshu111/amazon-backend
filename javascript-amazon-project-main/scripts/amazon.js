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
            <select class="js-quantitySelector-${product.id}">
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary addToCart"
           data-attr-product-id="${product.id}"
           >
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".addToCart").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log(button.dataset.attrProductName); // attrProductName shows in console
    // const ProductName = button.dataset.attrProductName;
    // Id is used instead of name because same items can be available in different companies
    const productId = button.dataset.attrproductId;
    //use a variable for matched item to use it later
    let matchingItem;
    //check if the item in the cart is already present
    cart.forEach((item) => {
      // if (ProductName === item.ProductName) {
      //used Id instead of Name
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    // Then increase the count instead
    if (matchingItem) {
      matchingItem.quantity = matchingItem.quantity + 1;
    } else {
      cart.push({
        // ProductName: ProductName,
        productId: productId,
        quantity: 1,
      });
    }
    // To make the Cart interactive, we need to loop through it

    //Need a variable to store the Total Quantity
    let totalCartQuantity = 0;
    cart.forEach((item) => {
      totalCartQuantity = totalCartQuantity + item.quantity;
    });

    document.querySelector(".js-totalCartQuantity").innerHTML =
      totalCartQuantity;

    console.log(totalCartQuantity);
    console.log(cart);
  });
});
