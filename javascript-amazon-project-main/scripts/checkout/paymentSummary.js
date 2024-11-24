import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

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
  const paymentSummaryHTML = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
