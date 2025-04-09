const productSearch = document.getElementById("productSearch");
const productListOutput = document.getElementById("productListOutput");
const cartOutput = document.getElementById("cartOutput");

//each product has a unique id, name and price which makes it simpler to add to the cart with a numnber
var products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Phone", price: 599.99 },
    { id: 3, name: "Tablet", price: 399.99 }
]
//store the bought items in the cart array
var cart = [];

//send an array of products to the displayProducts function
displayProducts(products);

//take an array of products and display them in the productList div. You can use this function to pass in found items from the search function
function displayProducts(products) {
    productListOutput.innerHTML = "";
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var box = document.createElement("div");
        box.className = "box";
        box.innerHTML = `<h3 class="is-subtitle">${product.name}</h3><p>Price: $${product.price.toFixed(2)}</p><button class="button is-warning" onclick="addToCart(${product.id})">Add to Cart</button>`;
        productListOutput.appendChild(box);
    }
}

//when the add to cart button is clicked, this function is called and adds item to cart array
function addToCart(productId) {
    var product = products.find(p => p.id === productId);   //search for the product id in the products list
    //if the product is found, push it to the cart array
    if (product) {
        cart.push(product); //copy shop item and push to cart array

    }
    cartOutput.innerHTML = `Items in cart: ${cart.length}`; //output the number of items in the cart to the cartOutput div
    console.log(cart); //log the cart array to the console
}

//when the user clicks search it searches the products array for matchin terms
function searchProducts() {
    var searchTerm = productSearch.value.toLowerCase(); //get the value of the input field and convert it to lowercase
    var filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm)); //filter the products array based on the search term
    displayProducts(filteredProducts); //display the filtered products in the productList div
}