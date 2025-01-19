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

document.addEventListener('DOMContentLoaded', () => {
        const lastLogin = localStorage.getItem('lastLogin');
        
        if (lastLogin) {
            // Format lastLogin date if needed
            const formattedDate = new Date(lastLogin).toLocaleString();
            document.getElementById('todayDate').textContent = `Last Login: ${formattedDate}`;
        }
    });
        // Add logout functionality
        document.querySelector('button[type="button"]').addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('fullName'); 
            localStorage.removeItem('cardExpiry'); 
            localStorage.removeItem('accBalance1'); 
            localStorage.removeItem('accBalance2'); 
            localStorage.removeItem('accBalance3'); 
            localStorage.removeItem('accNumber'); 
            localStorage.removeItem('accNumber2'); 
            localStorage.removeItem('cardCvv'); 
            localStorage.removeItem('cardNumber'); 
            localStorage.removeItem('userName'); 
            localStorage.removeItem('userCity'); 
            localStorage.removeItem('userCountry'); 
            localStorage.removeItem('userCity'); 
            localStorage.removeItem('userAddress'); 
            localStorage.removeItem('otp'); 
            localStorage.removeItem('sentOtp'); 
            localStorage.removeItem('accTotal'); 
            localStorage.removeItem('email'); 
            localStorage.removeItem('customerId'); 
            localStorage.removeItem('lastLogin'); 
            window.location.href = '../login/index.html';
        });

        // Display user's name in the welcome message
document.addEventListener('DOMContentLoaded', () => {
    const fullName = localStorage.getItem('fullName');
    const cardNumber = localStorage.getItem('cardNumber');
    const cardExpiry = localStorage.getItem('cardExpiry');
    const cardCvv = localStorage.getItem('cardCvv');
    const accBalance2 = localStorage.getItem('accBalance2');
    const accBalance1 = localStorage.getItem('accBalance1');
    const accBalance3 = localStorage.getItem('accBalance3');
    const accNumber = localStorage.getItem('accNumber');
    const accNumber2 = localStorage.getItem('accNumber2');
    const customerId = localStorage.getItem('customerId');
    const userAddress = localStorage.getItem('userAddress');
    const userCity = localStorage.getItem('userCity');
    const userCountry = localStorage.getItem('userCountry');
    if (fullName) {
        document.getElementById('welcome').textContent = `Welcome, ${fullName}`;
        document.getElementById('cardHolder').textContent = `Card Holder: ${fullName}`;
        document.getElementById('holder').textContent = `${fullName}`;
    }

    if (cardNumber) {
        // Remove commas from the card number
        const cleanedCardNumber = cardNumber.replace(/,/g, ''); // Remove all commas

        // Split into groups of 4
        const splitCardNumber = cleanedCardNumber.match(/.{1,4}/g); // Split into groups of 4
        const formattedCardNumber = splitCardNumber.join(' '); // Join with spaces for display

        // Display formatted card number
        document.getElementById('cardNumber').textContent = `Card Number: ${formattedCardNumber}`;
        document.getElementById('userAccNo2').textContent = formattedCardNumber;
        document.getElementById('displayCardNumber').textContent = `${formattedCardNumber}`;
    }
    
    if(cardExpiry) {
        document.getElementById('cardExpiry').textContent = `Expiry: ${cardExpiry}`;
        document.getElementById('cardValidity').textContent = `${cardExpiry}`;
    }

    if(cardCvv) {
        document.getElementById('cardCvv').textContent = `CVV: ${cardCvv}`;
        document.getElementById('cardCvvNumber').textContent = `${cardCvv}`;
    }
    
    if(accBalance2) {
        document.getElementById('accBalance2').textContent = `Balance: ${accBalance2}.00 USD`;
        document.getElementById('userAccBal2').textContent = `$ ${accBalance2}.00 USD`;
    }
    //From here populates user details to specific parts of the dashboard

    if (accBalance1) {
        document.getElementById('userAccBal1').textContent = `$ ${accBalance1}.00 USD`;
    }

    if (accBalance3) {
        document.getElementById('userAccBal3').textContent = `$ ${accBalance3}.00 USD`;
    }

    if (accNumber) {
        document.getElementById('userAccNo1').textContent = accNumber;
}

    if (accNumber2) {
        document.getElementById('userAccNo3').textContent = accNumber2;
    }

    if (customerId) {
        document.getElementById('welcome').textContent = `Welcome, ${fullName}`;
        document.getElementById('cardHolder').textContent = `Card Holder: ${fullName}`;
        document.getElementById('holder').textContent = `${fullName}`;
    }

    if (userAddress) {
        document.getElementById('welcome').textContent = `Welcome, ${fullName}`;
        document.getElementById('cardHolder').textContent = `Card Holder: ${fullName}`;
        document.getElementById('holder').textContent = `${fullName}`;
    }

    if (userCity) {
        document.getElementById('welcome').textContent = `Welcome, ${fullName}`;
        document.getElementById('cardHolder').textContent = `Card Holder: ${fullName}`;
        document.getElementById('holder').textContent = `${fullName}`;
    }

    if (userCountry) {
        document.getElementById('welcome').textContent = `Welcome, ${fullName}`;
        document.getElementById('cardHolder').textContent = `Card Holder: ${fullName}`;
        document.getElementById('holder').textContent = `${fullName}`;
    }

    const balance1 = Number(accBalance1);
    const balance2 = Number(accBalance2);
    const balance3 = Number(accBalance3);

    const accTotal = balance1 + balance2 + balance3;

    document.getElementById('accTotal').textContent = `$ ${accTotal}.00 USD`;

});


