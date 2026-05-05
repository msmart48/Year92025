const itemsforsale = document.getElementById('itemsforsale');
const catButArea = document.getElementById('catButArea');
const cartArea = document.getElementById('cartArea');

//my items for sale
let items = [
    { name: "Apple", price: 0.99, category: "Fruit", img: "apple.jpg" },
    { name: "Banana", price: 0.59, category: "Fruit", img: "banana.png" },
    { name: "Carrot", price: 0.49, category: "Vegetable", img: "carrot.png" },
]

let cart = []; //my shopping cart, starts empty

loadCatButtons();
updateCartDisplay(); //initial display of the cart, which will show that the cart is empty and the total is $0.00


function loadCatButtons() {
    catButArea.innerHTML = ''; // Clear existing buttons
    //search through the items array and create a button for each unique category and add it to the catButArea
    const categories = [...new Set(items.map(item => item.category))]; // Get unique categories
    //loop through the unique categories and create a button for each one and add it to the catButArea
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'button is-light m-3 pr-5 pl-5';
        button.textContent = category;

        //add click event listener to the button that will filter the items for sale by the category of the button that was clicked and display the filtered items in the items for sale area
        button.addEventListener('click', function () {
            //search through the items array and filter the items that have a category that matches the category of the button that was clicked and display the filtered items in the items for sale area
            const filteredItems = items.filter(item => item.category === category);
            displayItems(filteredItems); //run the function to display the filtered items in the items for sale area
        });
        catButArea.appendChild(button);
    });
}

function displayItems(itemsToDisplay) {
    itemsforsale.innerHTML = ''; // Clear existing items
    //loop through the items to display and create a new div for each item and add it to the items for sale area
    itemsToDisplay.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'box m-2';
        itemDiv.innerHTML = `<strong>${item.name}</strong><br>Price: $${item.price.toFixed(2)}`;
        const img = document.createElement('img');
        img.src = item.img; //img file stored in the same folder as the html file
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.marginLeft = '100px';
        img.alt = 'Food';
        itemDiv.appendChild(img); //add the image to the div for the item
        //add to order button
        const addToOrderButton = document.createElement('button');
        addToOrderButton.className = 'button is-success is-light mt-2';
        addToOrderButton.textContent = 'Add to Order';
        //create a click listener for the add to order button that will add the item to the cart array and update the cart display to show the new item in the cart and the new total cost of the items in the cart
        addToOrderButton.addEventListener('click', function () {
            cart.push(item); //add the item to the cart array including all its propertoes (name, price, category, img)
            updateCartDisplay(); //update the cart display to show the new item in the cart
        });
        //append the add to order button to the div for the item and then append the div for the item to the items for sale area
        itemDiv.appendChild(addToOrderButton); //add the add to order button to the div for the item
        itemsforsale.appendChild(itemDiv);
    });
}

//initial display of all items for sale when the page loads and tally up based on what in items array
function updateCartDisplay() {
    cartArea.innerHTML = ''; // Clear existing cart items
    let total = 0; //initialize total variable to keep track of the total cost of the items in the cart
    let count = 0;
    //loop through the cart array and create a new div for each item and add it to the cart area
    cart.forEach(item => {
        total += item.price; //add the price of the item to the total variable
        count++;
    });
    //update cart display with the total cost of the items in the cart and the number of items in the cart
    cartArea.innerHTML = `<strong>Cart:</strong><br>Total: $${total.toFixed(2)}<br>Items in Cart: ${count}`;
    const viewCartButton = document.createElement('button');
    viewCartButton.className = 'button is-info is-light mt-2';
    viewCartButton.textContent = 'View Cart';
    viewCartButton.addEventListener('click', viewMyCart); //add click event listener to the view cart button that will run the viewMyCart function when the button is clicked
    cartArea.appendChild(viewCartButton); //add the view cart button to the cart area
}

function viewMyCart() {
    //hide the other items
    itemsforsale.innerHTML = ''; // Clear existing items
    let count = 0;
    let total = 0;
    //loop through the cart array and create a new div for each item and add it to the cart area
    cartArea.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'box m-2';
        itemDiv.innerHTML = `<strong>${item.name}</strong><br>Price: $${item.price.toFixed(2)}`;
        cartArea.appendChild(itemDiv);
        total += item.price;
        count++;
    });
    //update below the cart area insert a div area
    const totalDiv = document.createElement('div');
    totalDiv.className = 'box m-2 has-background-light';
    totalDiv.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}<br><strong>Items in Cart:</strong> ${count}`;
    cartArea.appendChild(totalDiv);
}