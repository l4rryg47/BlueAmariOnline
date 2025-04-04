const nextButton = document.getElementById('registerButtonNext2');
const entryA = document.getElementById('sideHidden');
const entryB = document.getElementById('sideHidden5');
const nextButtonArea = document.getElementById('forgot6');
const createButtonArea = document.getElementById('forgot5');
const backArrow3 = document.getElementById('backArrow3');


nextButton.addEventListener('click', () => {
    entryA.style.display = 'none';
    entryB.style.display = 'flex';
    nextButtonArea.style.display = 'none'
    createButtonArea.style.display = 'flex'
    backArrow3.style.display = 'block'
})

backArrow3.addEventListener('click', () => {
    entryA.style.display = 'flex';
    entryB.style.display = 'none';
    nextButtonArea.style.display = 'flex'
    createButtonArea.style.display = 'none'
    backArrow3.style.display = 'none'
})


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
        beneficiary: document.getElementById('beneficiary').value,
        benAddress: document.getElementById('benAddress').value,
        benBank: document.getElementById('benBank').value,
        benBankAdd: document.getElementById('benBankAdd').value,
        bankSwift: document.getElementById('bankSwift').value,
        bankAcNo: document.getElementById('bankAcNo').value,
    };

    console.log('Form data:', form1Data); // Debugging output

    try {
        const response = await fetch('https://api.mltakins.com/api/auth/transaction', {
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
