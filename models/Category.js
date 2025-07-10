const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { _id: true });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  children: [SubCategorySchema]
});

module.exports = mongoose.model('Category', CategorySchema);
