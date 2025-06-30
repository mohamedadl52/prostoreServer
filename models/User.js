// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'assistant'], // 👈 صلاحيات محددة
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
