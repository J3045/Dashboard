// server.js
const express = require('express');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', dataRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
