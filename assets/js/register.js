const nextButton = document.querySelector('#registerButtonNext');
const nextButton1 = document.querySelector('#registerButtonNext1');
const registerButton = document.querySelector('#registerButton');
const hideSide = document.querySelector('#sideHidden');
const showHidden = document.querySelector('#showHidden');
const showHidden2 = document.querySelector('#showHidden2');
const forgot2 = document.querySelector('#forgot2');
const forgot3 = document.querySelector('#forgot3');
const forgot4 = document.querySelector('#forgot4');
const backArrow = document.querySelector('#backArrow');
const backArrow2 = document.querySelector('#backArrow2');
const registerTitle = document.querySelector('#registerTitle');


nextButton.addEventListener('click', () => {
    hideSide.style.display = "none";
    showHidden.style.display = "flex";
    forgot2.style.display ="none";
    forgot3.style.display = "flex";
    backArrow.style.display = "block";
    registerTitle.innerHTML = "Set Account Balances"  
})

nextButton1.addEventListener('click', () => {
    hideSide.style.display = "none";
    showHidden.style.display = "none";
    showHidden2.style.display = "flex";
    forgot2.style.display ="none";
    forgot3.style.display = "none";
    forgot4.style.display = "flex";
    backArrow.style.display = "none";
    backArrow2.style.display = "block";
    registerTitle.innerHTML = "User Details"  
})

backArrow.addEventListener('click', () => {
    showHidden.style.display = "none";
    hideSide.style.display = "flex";
    forgot3.style.display = "none";
    forgot2.style.display ="flex";
    backArrow.style.display = "none";
    registerTitle.innerHTML = "Register an Account" 
})

backArrow2.addEventListener('click', () => {
    hideSide.style.display = "none";
    showHidden2.style.display = "none";
    showHidden.style.display = "flex";
    forgot2.style.display ="none";
    forgot4.style.display = "none";
    forgot3.style.display = "flex";
    backArrow2.style.display = "none";
    backArrow.style.display = "block";
    registerTitle.innerHTML = "Set Account Balances" 
})

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        userName: document.getElementById('userName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password1').value,
        dob: document.getElementById('dob').value,
        phone: document.getElementById('phone').value,
        authPin: document.getElementById('authPin').value,
        accBalance1: document.getElementById('accBalance1').value,
        accBalance2: document.getElementById('accBalance2').value,
        accBalance3: document.getElementById('accBalance3').value,
        cardNumber: document.getElementById('cardNumber').value,
        cardExpiry: document.getElementById('cardExpiry').value,
        cardCvv: document.getElementById('cardCvv').value,
        accNumber: document.getElementById('accNumber').value,
        accNumber2: document.getElementById('accNumber2').value,
        customerId: document.getElementById('customerId').value,
        userAddress: document.getElementById('userAddress').value,
        userCity: document.getElementById('userCity').value,
        userCountry: document.getElementById('userCountry').value,
    };

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store the token
            localStorage.setItem('token', data.token);
            // Redirect to dashboard or home page
            window.location.href = 'successful.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});

function backToAdmin() {
    location.href = '../adminDashboard.html'
}

function homePage() {
    location.href = '../index.html'
}