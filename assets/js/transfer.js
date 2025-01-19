//Transfer Form behavior
const transfer = document.querySelector('#transferForm');
const beneficiary = document.querySelector('.beneficiary');
const transaction = document.querySelector('.transDetails');
const next1 = document.querySelector('#nextButton');
const back1 = document.querySelector('#backButton');
const selected = document.querySelector('#transferType');
const transCharges = document.querySelector('#transCharges');
const loader = document.querySelector('.loader');
const pin = document.querySelector('.enterPin');
const showTransactions = document.getElementById('showTransactions');
const approve = document.querySelector('#approveBtn');
const pinInput = document.querySelector('#enterPin')

function reloadForm() {
    // Store the current values we want to keep
    const currentTransferType = selected.value;
    
    // Reset the form
    transfer.reset();
    
    // Restore the selected transfer type
    selected.value = currentTransferType;
    
    // Re-enable the next button
    next1.disabled = false;
    
    // Update transfer charges based on selection
    transCharges.value = selected.value === 'local' ? 'NIL' : '0.05%';
}

// Add event listener for transfer type changes
selected.addEventListener('change', reloadForm);



next1.addEventListener('click', (e) => {
    e.preventDefault();
    const bankName = document.getElementById('benBank').value.trim();
    const bankAdd = document.getElementById('benAddress').value.trim();
    const iban = document.getElementById('bankAcNo').value.trim();
    const swift = document.getElementById('bankSwift').value.trim();
    const benName = document.getElementById('beneficiary').value.trim();
    const benAdd = document.getElementById('benBankAdd').value.trim();
    const benContact = document.getElementById('benContact').value.trim();

    // Check if any field is empty
    if (!bankName || !bankAdd || !iban || !swift || !benName || !benAdd || !benContact) {
        alert('Please fill in all required fields');
        return false;
    }

    // Basic IBAN validation (simple length check - can be made more sophisticated)
    // if (iban.length < 15) {
    //     alert('Please enter a valid IBAN/Account Number');
    //     return false;
    // }

    // Basic SWIFT/BIC validation (should be 8 or 11 characters)
    if (swift.length !== 8 && swift.length !== 11) {
        alert('Please enter a valid SWIFT/BIC code');
        return false;
    }

    // Contact number validation (basic check for numbers only)
    if (!/^\d{10,}$/.test(benContact.replace(/[\s-]/g, ''))) {
        alert('Please enter a valid contact number');
        return false;
    }

    beneficiary.style.display = 'none';
    transaction.style.display = 'flex';

    transCharges.value = selected.value === 'local' ? 'NIL' : '0.05%';
    transCharges.disabled = 'true';

      
})

back1.addEventListener('click', (e) => {
    e.preventDefault();
    beneficiary.style.display = 'flex';
    transaction.style.display = 'none';

    transCharges.value = selected.value === 'local' ? 'NIL' : '0.05%';
    transCharges.disabled = 'true';

      
})


transfer.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log('form submitted')

    const userName = localStorage.getItem('userName')
    const email = localStorage.getItem('email')
    let currentBalance = Number(localStorage.getItem('accBalance3'));
    const transactionType = "DEBIT";
    const transactionMethod = "BANK TRANSFER";
    let transactionStatus = "PROCESSED"
    const transactionDate = new Date();

    const transAmount = document.getElementById('transAmount').value;
    const formattedTransAmount = Number(transAmount);

    const accBalance3 = currentBalance - formattedTransAmount;
    const finalBalance = accBalance3.toString();


    const balance1 = Number(localStorage.getItem('accBalance1'));
    const balance2 = Number(localStorage.getItem('accBalance2'));

    

    const accTotal = balance1 + balance2 + accBalance3;
    
    localStorage.setItem('accBalance3', accBalance3);
    localStorage.setItem('accTotal', accTotal);
    
    const accBalance1 = localStorage.getItem('accBalance1')
    const accBalance2 = localStorage.getItem('accBalance2')
    


    const transferDetails = {
        userName: userName,
        email: email,
        accBalance1: accBalance1,
        accBalance2: accBalance2,
        accBalance3: accBalance3,
        transferType: selected.value,
        benBank: transfer.benBank.value,
        benBankAdd: transfer.benBankAdd.value,
        bankAcNo: transfer.bankAcNo.value,
        bankSwift: transfer.bankSwift.value,
        beneficiary: transfer.beneficiary.value,
        benAddress: transfer.benAddress.value,
        benContact: transfer.benContact.value,
        transactionAmount: transfer.transAmount.value,
        transactionDescription: transfer.transDescription.value,
        transactionType: transactionType,
        transactionMethod: transactionMethod,
        transactionBalance: finalBalance,
        transactionStatus: transactionStatus,
        transactionDate: transactionDate,
        transCharges: transfer.transCharges.value,
    }

    console.log('Form data:', transferDetails); // Debugging output

    try {
        const response = await fetch('http://localhost:5000/api/auth/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transferDetails)
        });

        const data = await response.json();
        console.log('Response data:', data); // Debugging output

        if (response.ok) {
            
            alert('Transfer initiated. Enter OTP to approve!');

            transaction.style.display = 'none';
            loader.style.display = 'flex';

            // Add a delay before showing the pin
            setTimeout(() => {
                loader.style.display = 'none'; // Hide loader
                pin.style.display = 'flex'; // Show pin
                sendOTP(); // Call the function to send OTP
            }, 3000); // Adjust the delay time (in milliseconds) as needed
            
            
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred creating a transfer');
    }

})

// Function to send OTP to user's email
async function sendOTP() {
    const email = localStorage.getItem('email'); // Assuming user email is stored in localStorage
    if (!email) {
        alert('User email not found.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/send-otp2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Authorization Token sent to registered email!');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        alert('An error occurred while sending OTP');
    }
}


const email = localStorage.getItem('email');

document.getElementById('approveBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
        const otp = document.getElementById('enterPin').value;
        verifyOtp(email, otp); // Call the function to verify OTP
        document.getElementById('enterPin').value = '';
});

function verifyOtp(email, otp) {
    fetch('http://localhost:5000/api/auth/verify-otp2', {
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
            alert('Transaction approved successfully!');
            window.location.reload();
        } else {
            // Handle invalid or expired OTP
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}