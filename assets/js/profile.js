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
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('fullName'); 
        window.location.href = '../login/index.html';
    });

    // Display user's name in the welcome message
document.addEventListener('DOMContentLoaded', () => {
const fullName = localStorage.getItem('fullName');
if (fullName) {
    document.getElementById('welcome').textContent = `Welcome, ${fullName}`;
    document.querySelector('.profileName').textContent = `Name: ${fullName}`;
}

const customerId = localStorage.getItem('customerId');
if (customerId) {
    document.querySelector('.customerID').textContent = `Customer Id: ${customerId}`;
}

const userAddress = localStorage.getItem('userAddress');
if (userAddress) {
    document.getElementById('userAddress').textContent = `${userAddress}`;
}

const phone = localStorage.getItem('phone');
if (phone) {
    document.getElementById('phone').textContent = `${phone}`;
}

const email = localStorage.getItem('email');
if (email) {
    document.getElementById('email').textContent = `${email}`;
}
});

document.querySelector('.profileHome').addEventListener('click', () => {
    window.location.href = 'Accounts.html'
})