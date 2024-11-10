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
    const bankName = document.getElementById('bankName').value.trim();
    const bankAdd = document.getElementById('bankAdd').value.trim();
    const iban = document.getElementById('iban').value.trim();
    const swift = document.getElementById('swift').value.trim();
    const benName = document.getElementById('benName').value.trim();
    const benAdd = document.getElementById('benAdd').value.trim();
    const benContact = document.getElementById('benContact').value.trim();

    // Check if any field is empty
    if (!bankName || !bankAdd || !iban || !swift || !benName || !benAdd || !benContact) {
        alert('Please fill in all required fields');
        return false;
    }

    // Basic IBAN validation (simple length check - can be made more sophisticated)
    if (iban.length < 15) {
        alert('Please enter a valid IBAN/Account Number');
        return false;
    }

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
    const transactionType = "DEBIT";
    const transactionMethod = "BANK TRANSFER";
    let transactionBalance = "580,000.00USD"
    let transactionStatus = "PROCESSED"
    const transactionDate = new Date();
    
    const transferDetails = {
        userName: userName,
        transferType: selected.value,
        bank: transfer.bankName.value,
        baddress: transfer.bankAdd.value,
        iban: transfer.iban.value,
        swift: transfer.swift.value,
        benName: transfer.benName.value,
        benAdd: transfer.benAdd.value,
        benContact: transfer.benContact.value,
        transactionAmount: transfer.transAmount.value,
        transactionDescription: transfer.transDescription.value,
        transactionType: transactionType,
        transactionMethod: transactionMethod,
        transactionBalance: transactionBalance,
        transactionStatus: transactionStatus,
        transactionDate: transactionDate,
        transCharges: transfer.transCharges.value
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
            // Redirect to dashboard or home page
            // window.location.href = 'transactionSuccessful.html';
            alert('Transfer Successful')
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred creating a transfer');
    }

    // localStorage.setItem('transferDetails', JSON.stringify(transferDetails));

    // transfer.reset();
    
    // beneficiary.style.display = 'none';
    // transaction.style.display = 'none';
    // loader.style.display = 'block'
    // setTimeout(function(){
    //     loader.style.display = 'none';
    //     pin.style.display = 'flex'
    // }, 5000)
})

approve.addEventListener('click', () => {
    if (!pinInput.value) {
        alert('Please enter your pin')
    } else {
        alert('Invalid Transaction Pin!')
    }
})

