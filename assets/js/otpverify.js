// Add event listener for form submission
const email = localStorage.getItem('email'); // Ensure the key matches what you set
const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const otp = document.getElementById('userName').value;
        verifyOtp(email, otp); // Call the function to verify OTP
    });

function sendOtp(email) {
    // Example API call to send OTP
    fetch('https://api.mltakins.com/api/auth/send-otp', { // Ensure this URL is correct
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('OTP sent:', data);
        alert('A One-Time-Password has been sent to your email!');
    })
    .catch(error => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please try again later.'); // Alert user on error
    });
}

function verifyOtp(email, otp) {
    fetch('https://api.mltakins.com/api/auth/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'OTP verified successfully') {
            // Handle successful verification (e.g., redirect or show success message)
            console.log('OTP verified successfully');
            alert('Login successful');
            window.location.href = '../RetailBanking/Accounts.html';
        } else {
            // Handle invalid or expired OTP
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}