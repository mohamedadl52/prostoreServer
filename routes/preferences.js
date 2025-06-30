const express = require('express');
const router = express.Router();
const Preference = require('../models/Preference');

const verifyToken = require('../middleware/auth');

router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { studentName, phone, seatNumber, preferences } = req.body;

    if (!studentName || !phone || !seatNumber || preferences.length < 1) {
      return res.status(400).json({ msg: 'البيانات غير مكتملة' });
    }

    const newPreference = new Preference({
      studentName,
      phone,
      seatNumber,
      preferences,
      userId: req.user.id  // هذا هو الربط بالمستخدم
    });

    await newPreference.save();
0
    res.status(201).json({ msg: 'تم حفظ الرغبات بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'حدث خطأ في السيرفر' });
  }
});
router.get('/user/:id', async (req, res) => {
  try {
    const preferences = await Preference.find({ userId: req.params.id });
    res.json(preferences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'فشل في جلب الطلبات' });
  }
});



module.exports = router;
