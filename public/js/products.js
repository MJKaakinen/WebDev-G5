const addToCart = (productId, productName) => {
  // TODO 9.2
  // you can use addProductToCart(), available already from /public/js/utils.js
  // for showing a notification of the product's creation, /public/js/utils.js  includes createNotification() function
  addProductToCart(productId);
  createNotification(`Added ${productName} to cart!`, 'notifications-container', true);
};
console.log('hei');
(async() => {
  //TODO 9.2 
  // - get the 'products-container' element from the /products.html
  // - get the 'product-template' element from the /products.html
  // - save the response from await getJSON(url) to get all the products. getJSON(url) is available to this script in products.html, as "js/utils.js" script has been added to products.html before this script file 
  // - then, loop throug the products in the response, and for each of the products:
  //    * clone the template
  //    * add product information to the template clone
  //    * remember to add an event listener for the button's 'click' event, and call addToCart() in the event listener's callback
  // - remember to add the products to the the page
  const container = document.querySelector('#products-container');
  const template = document.querySelector('#product-template').content;

  const products = await getJSON('/api/products');
  products.forEach(function(product) {
    const product_card = template.cloneNode(true);

    const div = product_card.querySelector('div');
    const name = product_card.querySelector('.product-name');
    const description = product_card.querySelector('.product-description');
    const price = product_card.querySelector('.product-price');
    const button = product_card.querySelector('button');

    div.id = `div-${product._id}`;

    name.innerText = product.name;
    name.id = `name-${product._id}`;

    description.innerText = product.description;
    description.id = `description-${product._id}`;

    price.innerText = product.price;
    price.id = `price-${product._id}`;

    button.id = `add-to-cart-${product._id}`;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product._id, product.name);
    })
    container.appendChild(product_card);
  });
})();