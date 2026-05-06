const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', testRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-spend-audit')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
