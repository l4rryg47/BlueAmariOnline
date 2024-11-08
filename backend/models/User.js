const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    transactionDate: String,
    transactionDescription: String,
    transactionType: String,
    transactionAmount: String,
    transactionBalance: String,
    transactionStatus: String,
    transactionMethod: String,
});

const UserSchema = new mongoose.Schema({
    fullName: String,
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dob: Date,
    phone: String,
    authPin: String,
    lastLogin: { type: Date },
    accBalance1: String,
    accBalance2: String,
    accBalance3: String,
    transactions: [TransactionSchema]
});

module.exports = mongoose.model('User', UserSchema);