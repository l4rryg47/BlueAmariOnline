const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName: String,
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    dob: Date,
    phone: String,
    authPin: String,
    lastLogin: { type: Date },
    accBalance1: String,
    accBalance2: String,
    accBalance3: String,
    cardNumber: String,
    cardExpiry: String,
    cardCvv: String,
    accNumber: String,
    accNumber2: String,
    customerId: String,
    userAddress: String,
    userCity: String,
    userCountry: String
});

module.exports = mongoose.model('User', UserSchema);