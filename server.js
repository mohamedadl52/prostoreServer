// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'https://prostore.onrender.com'], // ضع هنا الدومينات المسموحة
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));app.use(express.json());

const preferencesRoute = require('./routes/preferences');
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error:', err));

  
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to ProStore API');
  });
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/preferences', preferencesRoute);

// Start Server
const PORT = 8081;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
