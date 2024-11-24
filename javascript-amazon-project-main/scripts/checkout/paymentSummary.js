import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  //LOOP WHOLE CART
  cart.forEach((cartItem) => {
    //For Product's COST
    const product = getProduct(cartItem.productId);
    productPriceCents =
      productPriceCents + product.priceCents * cartItem.quantity;
    //For Shipping COST
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents = shippingPriceCents + deliveryOption.priceCents;
  });

  console.log(productPriceCents);
  console.log(shippingPriceCents);

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = (totalBeforeTaxCents * 0.1).toFixed(2);
  const totalCents = totalBeforeTaxCents + taxCents;
  console.log(totalBeforeTaxCents);
  console.log(taxCents);
  console.log(totalCents);
}
renderPaymentSummary();
