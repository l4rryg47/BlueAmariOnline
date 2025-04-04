function homepage() {
    location.href = '../index.html'
}

function register() {
  location.href = '../register/index.html'
  console.log("register")
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('https://api.mltakins.com/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userName, password })
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {

          const errorText = await response.text();
          alert(`Error: ${errorText || 'Login failed'}`);
          return;
      }

      // Parse response as JSON if the request was successful
      const data = await response.json();
      
      // Store token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('fullName', data.fullName);
      localStorage.setItem('lastLogin', data.lastLogin);
      localStorage.setItem('phone', data.phone);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('email', data.email);
      localStorage.setItem('cardNumber', data.cardNumber);
      localStorage.setItem('cardCvv', data.cardCvv);
      localStorage.setItem('cardExpiry', data.cardExpiry);
      localStorage.setItem('accBalance1', data.accBalance1);
      localStorage.setItem('accBalance2', data.accBalance2);
      localStorage.setItem('accBalance3', data.accBalance3);
      localStorage.setItem('accNumber', data.accNumber);
      localStorage.setItem('accNumber2', data.accNumber2);
      localStorage.setItem('customerId', data.customerId);
      localStorage.setItem('userAddress', data.userAddress);
      localStorage.setItem('userCity', data.userCity);
      localStorage.setItem('userCountry', data.userCountry);

      window.location.href = 'otpverify.html';

  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
  }
});
