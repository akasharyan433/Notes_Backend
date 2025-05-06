const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');

// Load environment variables
dotenv.config();

// Route files
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');

// Initialize app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: "https://notes-frontend-cn6jbbosa-akash-aryans-projects-cde69f05.vercel.app",
  Credential: true
})); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Body parser

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Notes App API' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
