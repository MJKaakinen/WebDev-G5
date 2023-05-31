const addToCart = productId => {
  // TODO 9.2
  // use addProductToCart(), available already from /public/js/utils.js
  // call updateProductAmount(productId) from this file
  addProductToCart(productId);
  const newCount = updateProductAmount(productId);
  return newCount;
};

const decreaseCount = productId => {
  // TODO 9.2
  // Decrease the amount of products in the cart, /public/js/utils.js provides decreaseProductCount()
  // Remove product from cart if amount is 0,  /public/js/utils.js provides removeElement = (containerId, elementId
  const newCount = decreaseProductCount(productId);
  if (newCount === 0) {
    removeElement('cart-container', `div-${productId}`);
    return newCount;
  }
  updateProductAmount(productId);
  return newCount;

};

const updateProductAmount = productId => {
  // TODO 9.2
  // - read the amount of products in the cart, /public/js/utils.js provides getProductCountFromCart(productId)
  // - change the amount of products shown in the right element's innerText
  const productCount = getProductCountFromCart(productId);
  document.querySelector('.product-amount').innerText = `${productCount}x`;
  return productCount;
};

const placeOrder = async() => {
  // TODO 9.2
  // Get all products from the cart, /public/js/utils.js provides getAllProductsFromCart()
  // show the user a notification: /public/js/utils.js provides createNotification = (message, containerId, isSuccess = true)
  // for each of the products in the cart remove them, /public/js/utils.js provides removeElement(containerId, elementId)
};

(async() => {
  // TODO 9.2
  // - get the 'cart-container' element
  // - use getJSON(url) to get the available products
  // - get all products from cart
  // - get the 'cart-item-template' template
  // - for each item in the cart
  //    * copy the item information to the template
  //    * hint: add the product's ID to the created element's as its ID to 
  //        enable editing ith 
  //    * remember to add event listeners for cart-minus-plus-button
  //        cart-minus-plus-button elements. querySelectorAll() can be used 
  //        to select all elements with each of those classes, then its 
  //        just up to finding the right index.  querySelectorAll() can be 
  //        used on the clone of "product in the cart" template to get its two
  //        elements with the "cart-minus-plus-button" class. Of the resulting
  //        element array, one item could be given the ID of 
  //        `plus-${product_id`, and other `minus-${product_id}`. At the same
  //        time we can attach the event listeners to these elements. Something 
  //        like the following will likely work:
  //          clone.querySelector('button').id = `add-to-cart-${prodouctId}`;
  //          clone.querySelector('button').addEventListener('click', () => addToCart(productId, productName));
  //
  // - in the end remember to append the modified cart item to the cart 
  const container = document.querySelector('#cart-container');
  const template = document.querySelector('#cart-item-template').content;

  const availableProducts = await getJSON('/api/products');
  const cartProducts = getAllProductsFromCart();

  /*
   * Loops through every product in the cart, find the full product information from
   * the JSON file and plants data to elements.
   */
  cartProducts.forEach(function(product) {
    const product_card = template.cloneNode(true);
    const fullProduct = availableProducts.filter(item => item._id === product.name)[0];

    const div = product_card.querySelector('div');
    const name = product_card.querySelector('.product-name');
    const price = product_card.querySelector('.product-price');
    const amount = product_card.querySelector('.product-amount');
    const plusButton = product_card.querySelectorAll('button')[0];
    const minusButton = product_card.querySelectorAll('button')[1];

    div.id = `div-${fullProduct._id}`;

    name.innerText = fullProduct.name;
    name.id = `name-${fullProduct._id}`;

    price.innerText = fullProduct.price;
    price.id = `price-${fullProduct._id}`;

    amount.innerText = `${product.amount}x`;
    amount.id = `amount-${fullProduct._id}`;

    plusButton.id = `plus-${fullProduct._id}`;

    minusButton.id = `minus-${fullProduct._id}`;

    plusButton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = fullProduct._id;

      addToCart(id);
    })

    minusButton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = fullProduct._id;

      decreaseCount(fullProduct._id);
    })

    container.appendChild(product_card);
  });

  document.querySelector("#place-order-button").addEventListener('click', function(e) {
    e.preventDefault();

    createNotification('Successfully created an order!', 'notifications-container', true);
    clearCart();
    document.querySelector('#cart-container').replaceChildren();

  });
})();