// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require('../middleware/auth'); // تحقق من التوكن

// تعديل الملف الشخصي
router.put('/update-profile', verifyToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ msg: 'المستخدم غير موجود' });

    res.json({ user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ msg: 'فشل في التحديث' });
  }
});

// التسجيل
router.get("/", (req, res) => {
    res.send("Welcome to the authentication API");
}   ); 
router.post("/register", async (req, res) => {
    console.log(req.body); // Added console log for debugging
    const { name, email, password, phone } = req.body; // Added phone
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "البريد مسجل من قبل" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword, phone }); // Added phone
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone } }); // Added phone
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("خطأ في السيرفر");
    }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
    console.log(req.body); // Added console log for debugging
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "المستخدم غير موجود" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "كلمة المرور غير صحيحة" });

const token = jwt.sign(
  { id: user._id, role: user.role }, // <-- نرسل الرول هنا
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } }); // Added phone
    } catch (err) {
        console.error("err"); // Log the error for debugging
        res.status(500).send("خطأ في السيرفر");
    }
});

module.exports = router;
