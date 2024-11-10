const nextButton = document.querySelector('#registerButtonNext');
const registerButton = document.querySelector('#registerButton');
const hideSide = document.querySelector('#sideHidden');
const showHidden = document.querySelector('#showHidden');
const forgot2 = document.querySelector('#forgot2');
const forgot3 = document.querySelector('#forgot3');
const backArrow = document.querySelector('#backArrow');
const registerTitle = document.querySelector('#registerTitle');


// function next () {
//     registerform1.style.display = 'none'
//     registerform2.style.display = 'flex'
//     console.log("register")
// }

// function back () {
//     registerform2.style.display = 'none'
//     registerform1.style.display = 'flex'
//     console.log("register")
// }

// function next2 () {
//     registerform2.style.display = 'none'
//     registerform3.style.display = 'flex'
//     registerform3.style.height = '70%'
//     console.log("register")
// }

nextButton.addEventListener('click', () => {
    hideSide.style.display = "none";
    showHidden.style.display = "flex";
    forgot2.style.display ="none";
    forgot3.style.display = "flex";
    backArrow.style.display = "block";
    registerTitle.innerHTML = "Set Account Balances"  
})

backArrow.addEventListener('click', () => {
    showHidden.style.display = "none";
    hideSide.style.display = "flex";
    forgot3.style.display = "none";
    forgot2.style.display ="flex";
    backArrow.style.display = "none";
    registerTitle.innerHTML = "Register an Account" 
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