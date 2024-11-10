document.getElementById('registrationForm1').addEventListener('submit', async (e) => {
    e.preventDefault();

    
    const form1Data = {
        userName: document.getElementById('userName').value,
        transactionDate: document.getElementById('transactionDate').value,
        transactionDescription: document.getElementById('transactionDescription').value,
        transactionType: document.getElementById('transactionType').value,
        transactionAmount: document.getElementById('transactionAmount').value,
        transactionBalance: document.getElementById('transactionBalance').value,
        transactionStatus: document.getElementById('transactionStatus').value,
        transactionMethod: document.getElementById('transactionMethod').value,
    };

    console.log('Form data:', form1Data); // Debugging output

    try {
        const response = await fetch('http://localhost:5000/api/auth/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form1Data)
        });

        const data = await response.json();
        console.log('Response data:', data); // Debugging output

        if (response.ok) {
            // Redirect to dashboard or home page
            window.location.href = 'transactionSuccessful.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred creating transaction history');
    }
});

function backToAdmin() {
    location.href = '../adminDashboard.html'
}
