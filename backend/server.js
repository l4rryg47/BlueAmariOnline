const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
connectDB();

// Configure CORS settings
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], // Allow only necessary HTTP methods
    credentials: true, // Allow credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server bubbling a joint on port ${PORT}`));