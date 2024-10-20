const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// CORS configuration
app.use(cors()); // This will allow all origins
// or specify a specific origin
// app.use(cors({ origin: 'http://your-client-origin.com' }));

app.use(express.json());  // This line is crucial for parsing JSON request bodies

// app.use(bodyParser.json());

// Set your admin password here
const ADMIN_PASSWORD = 'yourSecurePassword';

// Middleware to check for admin authentication
function checkAdminAuth(req, res, next) {
    const password = req.headers['admin-password'];
    if (password === ADMIN_PASSWORD) {
        next(); // Password is correct, proceed to the next middleware/route
    } else {
        res.status(403).json({ message: 'Access denied. Incorrect password.' });
    }
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('MongoDB connection successful');
    console.log('Connected to database:', mongoose.connection.name);
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// User model
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    authPin: { type: String, required: true },
    userId: { type: String, required: true, unique: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, dob, email, phone, userName, password1, password2, authPin } = req.body;

        // Validate input
        if (!fullName || !dob || !email || !userName || !password1 || !password2 || !authPin) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password1 !== password2) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password1, 10);

        // Create new user
        const newUser = new User({
            fullName,
            dob,
            email,
            phone,
            userName, // Corrected from 'username' to 'userName'
            password: hashedPassword,
            authPin,
            userId: uuidv4()
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password });

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ userName: username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful for user:', user.userName);
        res.status(200).json({ success: true, message: 'Login successful', token, userId: user.userId });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

// PATCH endpoint to update user information
app.patch('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Prevent updating sensitive fields
        delete updates.password;
        delete updates.authPin;
        delete updates.userId;

        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'An error occurred while updating the user' });
    }
});

// PUT endpoint to replace user information
app.put('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, dob, email, phone, userName } = req.body;

        if (!fullName || !dob || !email || !userName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedUser = await User.findOneAndReplace(
            { userId: userId },
            { ...req.body, userId: userId },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User replaced successfully', user: updatedUser });
    } catch (error) {
        console.error('Replace user error:', error);
        res.status(500).json({ message: 'An error occurred while replacing the user' });
    }
});

// DELETE endpoint to remove a user
app.delete('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findOneAndDelete({ userId: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
});

app.post('/api/users', async (req, res) => {
    const { fullName, dob, email, phone, userName, password } = req.body;

    // Basic validation
    if (!fullName || !dob || !email || !userName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Logic to create a new user
    try {
        const newUser = new User({ fullName, dob, email, phone, userName, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'User validation failed', errors: error.errors });
        }
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
});

// Example route to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.options('*', cors()); // Enable preflight for all routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
