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
});

module.exports = mongoose.model('Transaction', TransactionSchema);