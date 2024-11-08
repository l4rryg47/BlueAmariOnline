const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Registration Route
router.post('/register', async (req, res) => {
    const { fullName, userName, email, password, dob, phone, authPin, accBalance1, accBalance2, accBalance3 } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            dob,
            phone,
            authPin,
            accBalance1,
            accBalance2,
            accBalance3,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName: userName });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Update lastLogin to current date/time
        const currentTime = new Date();
        user.lastLogin = currentTime;
        await user.save();

        res.json({ 
            token, 
            userName: user.userName, 
            fullName: user.fullName, 
            lastLogin: user.lastLogin 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/transaction', async (req, res) => {
    const { userName, transactionDate, transactionDescription, transactionType, transactionAmount, transactionBalance, transactionStatus, transactionMethod } = req.body;

    try {
        // Verify that the user exists
        const user = await User.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transaction = new Transaction({
            userName, // Add userId to associate the transaction with the user
            transactionDate,
            transactionDescription,
            transactionType,
            transactionAmount,
            transactionBalance,
            transactionStatus,
            transactionMethod,
        });

        await transaction.save();

        // Update the user's transaction history (optional)
        user.transactions = user.transactions || [];
        user.transactions.push(transaction._id);
        await user.save();

        res.status(201).json({ message: 'Transaction created successfully', transaction });

    } catch (error) {
        console.error('Transaction error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Add pagination parameters
    try {
        const users = await User.find()
            .limit(limit * 1) // Limit the number of users returned
            .skip((page - 1) * limit); // Skip users for pagination
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all transactions
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a transaction
router.delete('/transactions/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    const { fullName, userName, email, password, dob, phone, authPin, accBalance1, accBalance2, accBalance3 } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            fullName,
            userName,
            email,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            dob,
            phone,
            authPin,
            accBalance1,
            accBalance2,
            accBalance3,
        }, { new: true });

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a transaction
router.put('/transactions/:id', async (req, res) => {
    const { transactionDate, transactionDescription, transactionType, transactionAmount, transactionBalance, transactionStatus, transactionMethod } = req.body;
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, {
            transactionDate,
            transactionDescription,
            transactionType,
            transactionAmount,
            transactionBalance,
            transactionStatus,
            transactionMethod,
        }, { new: true });

        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;