const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userName: { type: String },
    transactionDate: { type: Date },
    transactionDescription: { type: String },
    transactionType: { type: String },
    transactionAmount: { type: String },
    transactionBalance: { type: String },
    transactionStatus: { type: String },
    transactionMethod: { type: String },
    beneficiary: { type: String },
    benAddress: { type: String },
    benBank: { type: String },
    benContact: { type: String },
    benBankAdd: { type: String },
    bankSwift: { type: String },
    bankAcNo: { type: String },
});

module.exports = mongoose.model('Transaction', TransactionSchema);