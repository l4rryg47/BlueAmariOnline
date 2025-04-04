const listUser = document.getElementById("listUser");
const showUser = document.getElementById("showUsers");
const listTransactions = document.getElementById("listTransactions");
const showTransactions = document.getElementById("showTransactions");
const newUser = document.getElementById('newUser');
const deleteUser = document.getElementById('deleteUser');
const newTransaction = document.getElementById('newTransaction');
const deleteTransaction = document.getElementById('deleteTransaction');
const usersTable = document.getElementsByClassName('usersTable');
const transactionsTable = document.getElementsByClassName('transactionsTable');
const deleteTransaction1 = document.getElementsByClassName('deleteTransaction1');
const deleteUser1 = document.getElementsByClassName('deleteUser1');
const hiddenSection = document.querySelector('#hiddenSection');
const hiddenSection1 = document.querySelector('#hiddenSection1');
const hiddenSection2 = document.querySelector('#hiddenSection2');

console.log(usersTable)

listUser.addEventListener('click', () => {
  // Clear previous user data
  const usersTableBody = document.querySelector('#usersTable tbody');
  usersTableBody.innerHTML = ''; // Clear existing user data

  // Clear previous transaction data
  const transactionsTableBody = document.querySelector('#transactionsTable tbody');
  transactionsTableBody.innerHTML = ''; // Clear existing transaction data

  hiddenSection.style.display = 'none'
  hiddenSection1.style.display = 'none'
  hiddenSection2.style.display = 'none'
  transactionsTable[0].style.display = 'none'
  usersTable[0].style.display = 'block'
  showTransactions.style.display = 'none'
  showUser.style.display = 'block'
  deleteTransaction1[0].style.display = 'none'
})

listTransactions.addEventListener('click', () => {
  // Clear previous user data
  const usersTableBody = document.querySelector('#usersTable tbody');
  usersTableBody.innerHTML = ''; // Clear existing user data

  // Clear previous transaction data
  const transactionsTableBody = document.querySelector('#transactionsTable tbody');
  transactionsTableBody.innerHTML = ''; // Clear existing transaction data
  hiddenSection.style.display = 'none';
  hiddenSection1.style.display = 'none';
  hiddenSection2.style.display = 'none';
  usersTable[0].style.display = 'none';
  transactionsTable[0].style.display = 'block';
  showUser.style.display = 'none';
  showTransactions.style.display = 'block';
  deleteTransaction1[0].style.display = 'none';
})

deleteUser.addEventListener('click', () => {
  // Clear previous user data
  const usersTableBody = document.querySelector('#usersTable tbody');
  usersTableBody.innerHTML = ''; // Clear existing user data

  // Clear previous transaction data
  const transactionsTableBody = document.querySelector('#transactionsTable tbody');
  transactionsTableBody.innerHTML = ''; // Clear existing transaction data
  transactionsTable[0].style.display = 'none';
  hiddenSection.style.display = 'none';
  hiddenSection1.style.display = 'none';
  hiddenSection2.style.display = 'none';
  usersTable[0].style.display = 'none';
  showTransactions.style.display = 'none';
  showUser.style.display = 'none';
  deleteTransaction1[0].style.display = 'none';
  deleteUser1[0].style.display = 'block';
})

deleteTransaction.addEventListener('click', () => {
  // Clear previous user data
  const usersTableBody = document.querySelector('#usersTable tbody');
  usersTableBody.innerHTML = ''; // Clear existing user data

  // Clear previous transaction data
  const transactionsTableBody = document.querySelector('#transactionsTable tbody');
  transactionsTableBody.innerHTML = ''; // Clear existing transaction data
  transactionsTable[0].style.display = 'none';
  hiddenSection.style.display = 'none';
  usersTable[0].style.display = 'none';
  hiddenSection1.style.display = 'none';
  hiddenSection2.style.display = 'none';
  showTransactions.style.display = 'none';
  showUser.style.display = 'none';
  deleteUser1[0].style.display = 'none';
  deleteTransaction1[0].style.display = 'block';
})


showUser.addEventListener("click", async () => {
  console.log(usersTable);
  
  try {
    console.log("Fetching users..."); // Add this line to log before the fetch
    const response = await fetch("https://api.mltakins.com/api/auth/users"); // Fetch users from the API
    console.log("Response status:", response.status); // Log the response status
    const users = await response.json(); // Parse the JSON response
    populateUsersTable(users); // Log the user data to the table    
  } catch (error) {
    console.error("Error fetching users:", error); // Handle errors
  }
});

function populateUsersTable(users) {
    const usersTableBody = document.querySelector('#usersTable tbody');
    usersTableBody.innerHTML = ''; // Clear existing data

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.userName}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.dob}</td>
            <td>${user.phone}</td>
            <td>${user.authPin}</td>
            <td>${user.accBalance1}</td>
            <td>${user.accBalance2}</td>
            <td>${user.accBalance3}</td>
        `;
        usersTableBody.appendChild(row);
    });
}


showTransactions.addEventListener("click", async () => {
  console.log("clicked");
  try {
    console.log("Fetching transactions..."); // Add this line to log before the fetch
    const response = await fetch("https://api.mltakins.com/api/auth/transactions"); // Fetch users from the API
    console.log("Response status:", response.status); // Log the response status
    const transactions = await response.json(); // Parse the JSON response
    populateTransactionsTable(transactions); // Log the user data to the table
  } catch (error) {
    console.error("Error fetching transactions:", error); // Handle errors
  }
});

function populateTransactionsTable(transactions) {
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');
    transactionsTableBody.innerHTML = ''; // Clear existing data

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction._id}</td>
            <td>${transaction.transactionDate}</td>
            <td>${transaction.transactionDescription}</td>
            <td>${transaction.transactionType}</td>
            <td>${transaction.transactionAmount}</td>
            <td>${transaction.transactionBalance}</td>
            <td>${transaction.transactionStatus}</td>
            <td>${transaction.transactionMethod}</td>
        `;
        transactionsTableBody.appendChild(row);
    });
}

newUser.addEventListener('click', () => {
    location.href = '/register/index.html'
})

newTransaction.addEventListener('click', () => {
    location.href = '/register/createTransaction.html'
})

// Add event listener for the delete user form submission
document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const userName = document.getElementById('userName').value; // Get the userName from the form
  await deleteUserByUserName(userName); // Call delete function
});

// New function to delete a user by userName
async function deleteUserByUserName(userName) {
  const messageDiv = document.getElementById('message'); // Get the message div
  try {
    const response = await fetch(`https://api.mltakins.com/api/auth/users/${userName}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      messageDiv.textContent = "User successfully deleted."; // Success message
      messageDiv.style.color = "green"; // Change text color to green
      showUser.click(); // Refresh user list
    } else {
      messageDiv.textContent = "Failed to delete user: " + response.statusText; // Error message
      messageDiv.style.color = "red"; // Change text color to red
    }
  } catch (error) {
    messageDiv.textContent = "Error deleting user: " + error.message; // Error message
    messageDiv.style.color = "red"; // Change text color to red
  }
}

// Add event listener for the delete user form submission
document.getElementById('deleteTransactionForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const _id = document.getElementById('_id').value; // Get the userName from the form
  await deleteTransactionByTransactionId(_id); // Call delete function
});

// New function to delete a user by userName
async function deleteTransactionByTransactionId(_id) {
  const messageDiv = document.getElementById('message2'); // Get the message div
  if (!messageDiv) {
    console.error("Message div not found!"); // Log error if message div is not found
    return; // Exit the function if messageDiv is not found
  }
  
  console.log("Attempting to delete transaction with ID:", _id); // Log the transaction ID
  try {
    const response = await fetch(`https://api.mltakins.com/api/auth/transactions/${_id}`, {
      method: 'DELETE',
    });
    console.log("Response status:", response.status); // Log the response status
    if (response.ok) {
      messageDiv.textContent = "Transaction successfully deleted."; // Success message
      messageDiv.style.color = "green"; // Change text color to green
      showUser.click(); // Refresh user list
    } else {
      messageDiv.textContent = "Failed to delete Transaction: " + response.statusText; // Error message
      messageDiv.style.color = "red"; // Change text color to red
    }
  } catch (error) {
    messageDiv.textContent = "Error deleting Transaction: " + error.message; // Error message
    messageDiv.style.color = "red"; // Change text color to red
  }
}
