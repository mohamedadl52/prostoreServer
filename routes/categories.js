const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// إحضار جميع الأقسام
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// إضافة قسم رئيسي
router.post('/', async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name, children: [] });
  await category.save();
  res.json(category);
});

// حذف قسم رئيسي
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// إضافة قسم فرعي
router.post('/:id/sub', async (req, res) => {
  const { name } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });

  category.children.push({ name });
  await category.save();
  res.json(category);
});

// حذف قسم فرعي
router.delete('/:id/sub/:subId', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });

  category.children = category.children.filter(child => child._id.toString() !== req.params.subId);
  await category.save();
  res.json(category);
});

module.exports = router;
