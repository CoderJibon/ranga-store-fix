//load product 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("col-md-4");
    div.innerHTML = `<div class="single-product ">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Average rating: ${product.rating.rate} </p>
      <p>Total review count: ${product.rating.count}</p>
      <h2>Price: $ ${product.price}</h2>
      <button  onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="singleProduct(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;

const addToCart = (id, price) => {
  count = count + 1;
  updatePrice('price', price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if(priceConverted >= 1){
    setInnerText("delivery-charge", 20);
  }
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// product details event

const singleProduct = (e) => {
  const url = `https://fakestoreapi.com/products/${e}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => productsDetails(data));

}

const productsDetails = (products) => {

 document.querySelector('.modal-title').innerText = products.title;
 document.getElementById('midImage').setAttribute('src', products.image);
 document.querySelector('.category').innerText = `Category : ${products.category}`;
 document.querySelector('.des').innerText = `Description : ${products.description}`;
 const modalBtn = document.querySelector('.modal-footer');
 const div = document.createElement('div');
 const AddToCardBtn = `<button  onclick="addToCart(${products.id},${products.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>`;
 div.innerHTML = AddToCardBtn; 
 modalBtn.appendChild(div);

}
