const accounts = document.querySelector('.accounts');
const accountsHeader = document.querySelector('#accounts');
const accountSection = document.querySelector('.myAccounts');
const billPay = document.querySelector('.billPayDiv');
const billPayHeader = document.querySelector('#billPay');
const billSection = document.querySelector('.payBills');
const cards = document.querySelector('.cardsDiv');
const cardsHeader = document.querySelector('#cards');
const enquire = document.querySelector('.enquire');
const fundsTransfer = document.querySelector('.faccounts');
const fundsTransfer2 = document.querySelector('#faccounts');
const fundsTransferHeader = document.querySelector('#fundsTransfer');
const loan = document.querySelector('.loansDiv');
const loanHeader = document.querySelector('#loans');
const mutual = document.querySelector('.mutualFundsDiv');
const mutualHeader = document.querySelector('#mutualFunds');
const offer = document.querySelector('.offers1');
const offersHeader = document.querySelector('#offers');
const request = document.querySelector('.request');
const transactionHistory = document.querySelector('.transaction');
const transactionHistory1 = document.querySelector('.transactionHistory1');
const settings = document.querySelector('#profileDetails');
const Home = document.querySelector('.profileHome');
const transfer1 = document.querySelector('#transferForm');

enquire.addEventListener('click', () => {
    alert('Account limits set. Contact your accounts officer.')
})

request.addEventListener('click', () => {
    alert('Account limits set. Contact your accounts officer.')
})


transactionHistory.addEventListener("click", async () => {
    transfer1.reset();
    transactionHistory1.style.display = 'flex'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log("clicked");
    try {
      const userName = localStorage.getItem('userName'); // Ensure this is set correctly
      console.log("Fetching transactions for user:", userName);
      const response = await fetch(`http://localhost:5000/api/auth/transactions/${userName}`);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      const transactions = await response.json();
      console.log("Fetched transactions:", transactions);
      
      if (Array.isArray(transactions) && transactions.length === 0) {
          console.warn("No transactions found for user:", userName);
      }
      
      populateTransactionsTable(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }

    function populateTransactionsTable(transactions) {
        const transactionsTableBody = document.querySelector('#transactionsTable tbody');
        transactionsTableBody.innerHTML = '';
        
        if (!Array.isArray(transactions) || transactions.length === 0) {
            console.log("No transactions to display."); // Log if there are no transactions
            return;
        }
    
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
  });
  



accountsHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'flex'
})

accountSection.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'flex'
})

fundsTransferHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'flex'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})

billPayHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'flex'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})

billSection.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'flex'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})

cardsHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'flex'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})

mutualHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'flex'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})

loanHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'flex'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})

offersHeader.addEventListener('click', () => {
    transfer1.reset();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'flex'
    accounts.style.display = 'none'
    console.log('clicked')
})

//To navigate to rpofile settings
settings.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = 'profile.html'
})

// Home.addEventListener('click', (e) => {
//     e.preventDefault();
//     location.href = 'Accounts.html'
// })



