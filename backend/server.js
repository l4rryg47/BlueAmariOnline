const express = require('express');
// const cors = require('cors'); // Import the CORS middleware
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const https = require('https');

const app = express();
connectDB();

// app.use(cors({ origin: '*', credentials: true }));

// app.options('/api/auth/login', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
//     res.sendStatus(204);
// });

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server bubbling a joint on port ${PORT}`));