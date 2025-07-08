// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Preference = require('../models/Preference');
const adminController = require('../controller/admin.controller');
// const PriceSchema = require('../models/price')
const  verifyToken  = require('../middleware/auth'); // ✅ الطريقة الصحيحة
const  authorizeRoles  = require('../middleware/authAdminRole'); // ✅ الطريقة الصحيحة
const Price = require('../models/price');
// const authorizeRoles = require('../middleware/authAdminRole'); // ✅ الطريقة الصحيحة
// const  adminauth  = require('../middleware/auth');
router.get('/price', async (req, res) => {
  try {
    const price = await Price.findOne({});
    if (!price) {
      return res.status(404).json({ msg: '❌ السعر غير موجود' });
    }
    res.json(price);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'حدث خطأ أثناء جلب السعر' });
  }
});

// ✅ Add a new price (once)
router.post('/price', async (req, res) => {
  try {
    const existingPrice = await Price.findOne({});
    if (existingPrice) {
      return res.status(400).json({ msg: '❌ السعر موجود بالفعل، يمكنك فقط تعديله' });
    }

    const newPrice = new Price({ price: req.body.price });
    await newPrice.save();
    res.json({ msg: '✅ تم إضافة السعر بنجاح', price: newPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'حدث خطأ أثناء إضافة السعر' });
  }
});

// ✅ Update the price
router.put('/price', async (req, res) => {
  try {
    const updated = await Price.findOneAndUpdate({}, { price: req.body.price }, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: '❌ لم يتم العثور على السعر لتحديثه' });
    }
    res.json({ msg: '✅ تم تحديث السعر بنجاح', price: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'حدث خطأ أثناء تحديث السعر' });
  }
});
router.get('/stats', adminController.getStats);
router.get('/users', verifyToken , authorizeRoles('admin', 'assistant'), adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/orders', verifyToken, authorizeRoles('admin', 'assistant') , adminController.getAllOrders)
router.put('/orders/:id' ,adminController.updateOrderStatus)
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { role });
    res.json({ msg: 'تم تحديث الدور بنجاح' });
  } catch (err) {
    res.status(500).json({ msg: 'فشل التحديث' });
  }
});


router.get('/admin/orders',
  verifyToken,
  authorizeRoles('admin', 'assistant'),
  (req, res) => {
    res.send('مرحباً بك يا أدمن أو مساعد');
  }
);
module.exports = router;
