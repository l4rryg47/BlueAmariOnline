const listUser = document.getElementById("listUser");
const listTransactions = document.getElementById("listTransactions");
const newUser = document.getElementById('newUser');
const newTransaction = document.getElementById('newTransaction');


listUser.addEventListener("click", async () => {
  console.log("clicked");
  try {
    console.log("Fetching users..."); // Add this line to log before the fetch
    const response = await fetch("http://localhost:5000/api/auth/users"); // Fetch users from the API
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
            <td>${user.phone}</td>
        `;
        usersTableBody.appendChild(row);
    });
}


listTransactions.addEventListener("click", async () => {
  console.log("clicked");
  try {
    console.log("Fetching transactions..."); // Add this line to log before the fetch
    const response = await fetch("http://localhost:5000/api/auth/transactions"); // Fetch users from the API
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
    location.href = '/register'
})

newTransaction.addEventListener('click', () => {
    location.href = '/register/createTransaction.html'
})
