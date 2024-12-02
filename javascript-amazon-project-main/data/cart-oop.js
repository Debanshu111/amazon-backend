//OOPS concept...Cart defined as an obj. to group all data and func into it
//can't use keywords directly inside obj
//fuction inside obj is called METHOD
const cart = {
    cartItems: undefined,

    //LOAD FROM STORAGE FUNCTION
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem("cart-oop"));

        if (!this.cartItems) {
            this.cartItems = [];
        }
    },

    //LOCAL STORAGE FUNCTION
    saveToStorage() {
        localStorage.setItem("cart-oop", JSON.stringify(this.cartItems)); //Saving to local storage(only saves strings, so cart has been converted to string)
    },

    //ADD TO CART FUNCTION
    addToCart(productId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
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
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: "1", //used  1 for now...need to change later
            });
        }
        this.saveToStorage(); //since already inside the obj.
    },

    //REMOVE FROM CART FUNCTION
    removeFromCart(productId) {
        // let deletedProduct;
        const newCart = []; //NEW CART for Deleted product check
        this.cartItems.forEach((cartItem) => {
            //To check whatever is in the cart we loop
            if (cartItem.productId !== productId) {
                newCart.push(cartItem); //new cart will be the one after checking delete option, we push cartItem into New Cart
            }
        });
        this.cartItems = newCart; //post deletion check...cart is updated...since it's dependent on options lile delete...we change const to let for Cart at the beginning
        this.saveToStorage();
    },

    //CALCULATE CART QUANTITY FUNCTION used at multiple files, to optiimize
    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity = cartQuantity + cartItem.quantity;
        });
        return cartQuantity;
    },

    //UPDATE QUANTITY FUNCTION
    updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    },

    //UPDATE DELIVERY OPTION FUNTION
    updateDeliveryOption(productId, deliveryOptionId) {
        //Match the delivery date selection as per checked in the radio options
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
};

cart.loadFromStorage(); //since it's present inside the cart obj.

cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

console.log(cart);