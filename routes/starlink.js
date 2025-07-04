const express = require('express');
const router = express.Router();
const StarlinkOrder = require('../models/StarlinkIssue');
const  verifyToken  = require('../middleware/auth'); // ✅ الطريقة الصحيحة

// POST: submit starlink issue
router.post('/submit-issue', verifyToken ,  async (req, res) => {
  try {
    const issue = new StarlinkOrder(req.body);
    await issue.save();
    res.status(201).json({ message: "Issue submitted successfully", issue });
  } catch (err) {
    console.error("❌ Error saving issue:", err);
    res.status(500).json({ message: "Server error while saving issue." });
  }
});

router.get('/orders', async (req, res) => {
  console.log("🚀 /api/starlink/orders")  ;
  try {
    const orders = await StarlinkOrder.find().sort({ createdAt: -1 });
    console.log("🚀 /api/starlink/orders - orders:", orders);
    res.json(orders);
  } catch (err) {
    console.log("❌ Error fetching orders:", err);
    res.status(500).json({ error: 'فشل في جلب الطلبات' });
  }
});

// GET /api/starlink/user-orders
router.get('/user-orders', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await StarlinkOrder.find({ userId });
    res.json(orders);
  console.log(orders)
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ message: 'فشل في جلب الطلبات' });
  }
});


router.put('/orders/:id', async (req, res) => {
  try {
    const updated = await StarlinkOrder.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'فشل في تحديث حالة الطلب' });
  }
});

module.exports = router;
