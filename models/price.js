// models/price.js
const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true , 
    default: 0 // ✅ قيمة افتراضية
  }
});

module.exports = mongoose.model('Price', priceSchema);
