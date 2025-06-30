// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Preference = require('../models/Preference');
const adminController = require('../controller/admin.controller');

const  verifyToken  = require('../middleware/auth'); // ✅ الطريقة الصحيحة
const  authorizeRoles  = require('../middleware/authAdminRole'); // ✅ الطريقة الصحيحة
// const authorizeRoles = require('../middleware/authAdminRole'); // ✅ الطريقة الصحيحة
// const  adminauth  = require('../middleware/auth');

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
