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
const transfer = document.querySelector('#transferForm');

enquire.addEventListener('click', () => {
    alert('Account limits set. Contact your accounts officer.')
})

request.addEventListener('click', () => {
    alert('Account limits set. Contact your accounts officer.')
})

transactionHistory.addEventListener('click', () => {
    transfer.reset();
    transactionHistory1.style.display = 'flex'
    cards.style.display = 'none'
    billPay.style.display = 'none'
    loan.style.display = 'none'
    mutual.style.display = 'none'
    fundsTransfer.style.display = 'none'
    offer.style.display = 'none'
    accounts.style.display = 'none'
})


accountsHeader.addEventListener('click', () => {
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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
    transfer.reset();
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

Home.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = 'Accounts.html'
})



