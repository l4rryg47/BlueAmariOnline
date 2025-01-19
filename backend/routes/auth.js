const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Registration Route
router.post('/register', async (req, res) => {
    const { fullName, userName, email, password, dob, phone, authPin, accBalance1, accBalance2, accBalance3, cardNumber, cardExpiry, cardCvv, accNumber, accNumber2, customerId, userAddress, userCity, userCountry } = req.body;

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
            cardNumber,
            cardExpiry,
            cardCvv,
            accNumber,
            accNumber2,
            customerId,
            userAddress,
            userCity,
            userCountry
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
            lastLogin: user.lastLogin,
            phone: user.phone,
            email: user.email,
            cardNumber: user.cardNumber,
            cardCvv: user.cardCvv,
            cardExpiry: user.cardExpiry,
            accBalance1: user.accBalance1,
            accBalance2: user.accBalance2,
            accBalance3: user.accBalance3,
            accNumber: user.accNumber,
            accNumber2: user.accNumber2,
            customerId: user.customerId,
            userAddress: user.userAddress,
            userCity: user.userCity,
            userCountry: user.userCountry
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/transaction', async (req, res) => {
    const { userName, transactionDate, transactionDescription, transactionType, transactionAmount, transactionBalance, transactionStatus, transactionMethod, accBalance1, accBalance2, accBalance3 } = req.body;

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

        // Update account balances
        user.accBalance1 = accBalance1; // Update accBalance1
        user.accBalance2 = accBalance2; // Update accBalance2
        user.accBalance3 = accBalance3; // Update accBalance3
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

// Get all transactions by userName
router.get('/transactions/:userName', async (req, res) => {
    const { userName } = req.params; // Get userName from request parameters
    try {
        // Verify that the user exists
        const user = await User.findOne({ userName: userName });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const transactions = await Transaction.find({ userName: userName }); // Filter transactions by userName
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// router.get('/api/auth/transactions/user', async (req, res) => {
//     const { userName } = req.query; // Get userName from query parameters
//     try {
//         // Ensure userName is provided
//         if (!userName) {
//             return res.status(400).json({ error: 'userName is required' });
//         }

//         // Fetch transactions for the specific user
//         const transactions = await Transaction.find({ userName: userName }); // Adjust according to your database model
//         res.json(transactions);
//     } catch (error) {
//         console.error("Error fetching transactions:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Delete a user
router.delete('/users/:userName', async (req, res) => {
    const { userName } = req.params; // Get userName from request parameters
    try {
        const user = await User.findOneAndDelete({ userName: userName }); // Find and delete user by userName
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a transaction
router.delete('/transactions/:_id', async (req, res) => {
    const { _id } = req.params; // Get transaction ID from request parameters
    try {
        const transaction = await Transaction.findOneAndDelete({_id: _id});
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction deleted successfully' });
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

// Function to send OTP
const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'larzhoops@gmail.com', // your Gmail address
            pass: 'vjdrcfnplcxmjnve' // your Gmail password or App Password
        }
    });

    const mailOptions = {
        from: '"Notification@BluSkeyAmaris.online" <Notification@BluSkeyAmaris.online>', // sender address
        to: email,
        subject: 'Login Authorization Token',
        text: `Your OTP code is: ${otp}`,
    };

    return transporter.sendMail(mailOptions);
};

// Function to send OTP2
const sendOTP2 = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'larzhoops@gmail.com', // your Gmail address
            pass: 'vjdrcfnplcxmjnve' // your Gmail password or App Password
        }
    });

    const mailOptions = {
        from: '"Notification@BluSkeyAmaris.online" <Notification@BluSkeyAmaris.online>', // sender address
        to: email,
        subject: 'Transfer Authorization Token',
        text: `Your OTP code is: ${otp}`,
    };

    return transporter.sendMail(mailOptions);
};

// Route to send OTP
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    try {
        // Send OTP to user's email
        await sendOTP(email, otp);

        // Save the OTP and its expiration time (e.g., 5 minutes from now)
        const user = await User.findOne({ email });
        if (user) {
            user.otp = otp;
            user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
            await user.save();
        }

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

// Route to send OTP2
router.post('/send-otp2', async (req, res) => {
    const { email } = req.body;

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    try {
        // Send OTP to user's email
        await sendOTP2(email, otp);

        // Save the OTP and its expiration time (e.g., 5 minutes from now)
        const user = await User.findOne({ email });
        if (user) {
            user.otp = otp;
            user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
            await user.save();
        }

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the OTP is valid and not expired
        if (user.otp === otp && user.otpExpires > Date.now()) {
            // OTP is valid
            user.otp = null; // Clear OTP after successful verification
            user.otpExpires = null; // Clear expiration time
            await user.save();
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error); // Log the error
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to verify OTP2
router.post('/verify-otp2', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the OTP is valid and not expired
        if (user.otp === otp && user.otpExpires > Date.now()) {
            // OTP is valid
            user.otp = null; // Clear OTP after successful verification
            user.otpExpires = null; // Clear expiration time
            await user.save();
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error); // Log the error
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;