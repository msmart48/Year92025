const customerTable = document.getElementById('customerTable');
const customerForm = document.getElementById('customerForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const typeInput = document.getElementById('typeInput');
const sortCustomersButasc = document.getElementById('sortCustomersButasc');
const sortCustomersButdesc = document.getElementById('sortCustomersButdesc');
const searchCustomerInput = document.getElementById('searchCustomerInput');
const searchCustomerButton = document.getElementById('searchCustomerButton');

let customers = [];

//localstorage read and load cuatomers on load
const storedCustomers = localStorage.getItem('customers');
if (storedCustomers) {
    customers = JSON.parse(storedCustomers);
    displayCustomers();
    updateCustomerCount();
    //displayCustomers(customers);
    //updateCustomerCount();
}





//form submission for new customer
customerForm.addEventListener('submit', function (event) {
    event.preventDefault(); //stops page refreshing on form submit
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const type = typeInput.value; //get selected type from dropdown
    if (name && email && phone) {
        const customer = { name, email, phone, type }; //create customer object with form data
        customers.push(customer); //add new customer object to customers array
        addCustomerToTable(customer); // pass object to add customer to table
        customerForm.reset(); //clear the form
        updateCustomerCount(); //update customer count after adding new customer
    }
    //save updated customers array to localstorage as JSON string
    localStorage.setItem('customers', JSON.stringify(customers));
});

//clears the table, loops through customers array and adds each customer to the table
function displayCustomers(customersList = customers) {
    //clear existing table rows
    customerTable.innerHTML = `
    `;
    //loop through customers and add to table
    customersList.forEach(customer => {
        addCustomerToTable(customer);
    });
}

//adds a single customer to the table as a new row by passing a customer object with name, email, and phone properties
function addCustomerToTable(customer) {
    //insert new row for customer
    const row = customerTable.insertRow();
    //insert cells for name, email, and phone
    const nameCell = row.insertCell(0);
    const emailCell = row.insertCell(1);
    const phoneCell = row.insertCell(2);
    const typeCell = row.insertCell(3);
    const actionsCell = row.insertCell(4);
    //update cell content with customer data objects
    nameCell.textContent = customer.name;
    emailCell.textContent = customer.email;
    phoneCell.textContent = customer.phone;
    typeCell.textContent = customer.type || 'N/A';
    //create delete button for each customer row
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button', 'is-danger', 'is-small');
    deleteButton.addEventListener('click', function () {
        //remove customer from customers array
        customers = customers.filter(c => c !== customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        //clear the table and re-display customers to reflect deletion
        displayCustomers();
        updateCustomerCount(); //update customer count after deletionn
    });
    actionsCell.appendChild(deleteButton); //add delete button to actions cell
    //edit button for each customer row
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('button', 'is-info', 'is-small', 'ml-2');
    editButton.addEventListener('click', function () {
        //populate form with existing customer data for editing
        nameInput.value = customer.name;
        emailInput.value = customer.email;
        phoneInput.value = customer.phone;
        //remove customer from customers array to prepare for update
        customers = customers.filter(c => c !== customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        //clear the table and re-display customers to reflect removal of old data
        displayCustomers();
        updateCustomerCount(); //update customer count after preparing for edit
    });
    actionsCell.appendChild(editButton); //add edit button to actions cell
}
//updates the customer count display by setting the text content of the customerCount element
//  to show the current number of customers in the customers array
function updateCustomerCount() {
    const countElement = document.getElementById('customerCount');
    countElement.textContent = `Total Customers: ${customers.length}`;
}



//add event listener to sort button
sortCustomersButasc.addEventListener('click', () => sortCustomers("asc"));
sortCustomersButdesc.addEventListener('click', () => sortCustomers("desc"));

function sortCustomers(order) {
    customers.sort((a, b) => {
        if (order === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    localStorage.setItem('customers', JSON.stringify(customers));
    displayCustomers();
}

searchCustomerInput.addEventListener('input', searchCustomers);

function searchCustomers() {
    console.log('Searching for:', searchCustomerInput.value);
    const searchTerm = document.getElementById('searchCustomerInput').value.toLowerCase();
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.toLowerCase().includes(searchTerm) ||
        (customer.type && customer.type.toLowerCase().includes(searchTerm))
    );
    console.log('Matching customers:', filteredCustomers);
    //clear the table and display only the filtered customers

    displayCustomers(filteredCustomers);
}

