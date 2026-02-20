const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const batchRoutes = require('./routes/batchRoutes');

// Routes
app.use('/api/batches', batchRoutes);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Error handling middleware
app.use(require('./middleware/errorHandler'));

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 10000;

// Start server
app.listen(PORT, () => {
  console.log('AgriTrust AI Server running on port', PORT);
  console.log('Database: Using file-based storage with persistence');
  console.log('Production server ready');
});

module.exports = app;