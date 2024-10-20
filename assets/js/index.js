// Project coded vanilla from scratch by SNK for CMC||RIP FL3XY

const hamburger = document.querySelector('#hamburger');
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const close = document.querySelector('.close');
const registerform1 = document.querySelector('.formContainer');
const registerform2 = document.querySelector('.formContainer2');
const registerform3 = document.querySelector('.formContainer3');
const accounts = document.querySelector('.accounts');
const accountsHeader = document.querySelector('#accounts');
const accountSection = document.querySelector('.myAccounts');
const billPay = document.querySelector('.billPayDiv');
const billPayHeader = document.querySelector('#billPay');
const billSection = document.querySelector('.payBills');
const cards = document.querySelector('.cardsDiv');
const cardsHeader = document.querySelector('#cards');
const fundsTransfer = document.querySelector('.faccounts');
const fundsTransferHeader = document.querySelector('#fundsTransfer');
const loan = document.querySelector('.loansDiv');
const loanHeader = document.querySelector('#loans');
const mutual = document.querySelector('.mutualFundsDiv');
const mutualHeader = document.querySelector('#mutualFunds');
const offer = document.querySelector('.offers1');
const offersHeader = document.querySelector('#offers');
const transactionHistory = document.querySelector('.transaction');
const transactionHistory1 = document.querySelector('.transactionHistory1');
// const register = document.querySelector('#accessButton2');

transactionHistory.addEventListener('click', (e) => {
    e.preventDefault();
    transactionHistory1.style.display = 'flex'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
    console.log('clicked')
})


accountsHeader.addEventListener('click', (e) => {
    e.preventDefault();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'flex'
    console.log('clicked')
})

accountSection.addEventListener('click', (e) => {
    e.preventDefault();
    transactionHistory1.style.display = 'none'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'flex'
    console.log('clicked')
})

fundsTransferHeader.addEventListener('click', (e) => {
    e.preventDefault();
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

billPayHeader.addEventListener('click', (e) => {
    e.preventDefault();
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

billSection.addEventListener('click', (e) => {
    e.preventDefault();
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

cardsHeader.addEventListener('click', (e) => {
    e.preventDefault();
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

mutualHeader.addEventListener('click', (e) => {
    e.preventDefault();
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

loanHeader.addEventListener('click', (e) => {
    e.preventDefault();
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

offersHeader.addEventListener('click', (e) => {
    e.preventDefault();
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

hamburger.addEventListener('click', (e) =>{
    e.preventDefault();
    hamburgerMenu.style.display = 'flex';
    console.log('clicked')
})

close.addEventListener('click', (e) =>{
    e.preventDefault();
    hamburgerMenu.style.display = 'none';
    console.log('closed')
})

function register() {
    location.href = '../register/index.html'
    console.log("register")
}

function login() {
    location.href = '../login/index.html'
    console.log("register")
}

function next () {
    registerform1.style.display = 'none'
    registerform2.style.display = 'flex'
    console.log("register")
}

function back () {
    registerform2.style.display = 'none'
    registerform1.style.display = 'flex'
    console.log("register")
}

function next2 () {
    registerform2.style.display = 'none'
    registerform3.style.display = 'flex'
    registerform3.style.height = '70%'
    console.log("register")
}

function homepage() {
    location.href = '../index.html'
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    
    // loginButton.addEventListener('click', function(e) {
    //     e.preventDefault(); // Prevent form submission
    //     const username = document.getElementById('username').value;
    //     const password = document.getElementById('password').value;
        
    //     console.log('Attempting login with:', { username, password });

    //     fetch('http://localhost:3000/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userName: username,
    //             password: password
    //         }),
    //     })
    //     .then(response => {
    //         console.log('Response status:', response.status);
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Response data:', data);
    //         if (data.token) {
    //             // Login successful
    //             localStorage.setItem('token', data.token);
    //             localStorage.setItem('userId', data.userId);
                
    //             // Show success message
    //             const successMessage = document.createElement('div');
    //             successMessage.textContent = 'Login successful! Redirecting...';
    //             successMessage.style.cssText = 'position: fixed; top: 20px; right: 20px; background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px;';
    //             document.body.appendChild(successMessage);
                
    //             // Redirect after a short delay
    //             setTimeout(() => {
    //                 window.location.href = './RetailBanking/Accounts.html';
    //             }, 2000); // 2 second delay
    //         } else {
    //             // Login failed
    //             alert('Login failed: ' + (data.message || 'Unknown error'));
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         alert('An error occurred during login: ' + error.message);
    //     });
    // });
});
