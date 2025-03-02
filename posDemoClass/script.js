const buttonArea = document.getElementById("buttonArea");
const totalOutput = document.getElementById("totalOutput");
const cartItems = document.getElementById("cartItems");
//list of products for my shop
var products = [
    { name: 'apple', price: 1.00, type: 'fruit', img: 'apple.png' },
    { name: 'banana', price: 0.50, type: 'fruit', img: 'banana.png' },
    { name: 'carrot', price: 0.25, type: 'vegetable', img: 'carrot.jpg' },
    { name: 'potato', price: 0.75, type: 'vegetable', img: 'potatoes.jpg' },
    { name: 'cucumber', price: 3.00, type: 'fruit', img: 'cucumber.jpg' },
    { name: 'broccoli', price: 1.25, type: 'vegetable', img: 'brocolli.jpg' }
];

var total = 0;
var purchasedItems = [];

//sort products by name
products.sort(function (a, b) {
    return a.name.localeCompare(b.name);
})

//create buttons for each product
createButtons(products);

function createButtons(list) {
    //clear the button area first
    buttonArea.innerHTML = '';
    list.forEach(product => {
        //create a button element
        const button = document.createElement('button');
        //assign some html to the button to allow for an image and text and price
        button.innerHTML = `<img src="images/${product.img}" alt="${product.name}" width="100" height="100">${product.name} - $${product.price}`;
        //set the css class for the button
        button.className = 'productBtn';
        //add a function to each button - pass the whole food object to the function
        button.addEventListener('click', () => addProduct(product))
        //add the newly created button to the foodButtons div
        buttonArea.appendChild(button);

    })
}



function addProduct(product) {
    console.log(product);
    //add the price of the product to the total
    total += product.price;
    //add the product to the purchasedItems array
    purchasedItems.push(product);
    console.log(total);
    //update total on page
    totalOutput.innerText = `Total: $${total.toFixed(2)}`;

    const div = document.createElement('div');
    div.innerHTML = ` <img src="images/${product.img}" alt="${product.name}" width="25" height="25"> ${product.name} - $${product.price.toFixed(2)}`;
    div.className = 'cartBox';
    cartItems.appendChild(div);
    //reset the button area
    createButtons(products);
}

function removeLastProduct() {
    var last = purchasedItems.pop();
    total -= last.price;
    totalOutput.innerText = `Total: $${total.toFixed(2)}`;
    cartItems.removeChild(cartItems.lastChild);
}

function search(type) {
    if (type == "all") {
        createButtons(products)
    } else {
        var foundItems = products.filter(product => product.type === type);
        console.log(foundItems);
        //create buttons for the found list by passing to create buttons function
        createButtons(foundItems);
    }
}