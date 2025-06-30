const User = require('../models/User');
const Preference = require('../models/Preference');

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Preference.countDocuments();
    const pending = await Preference.countDocuments({ status: 'جاري التقديم' });
    const completed = await Preference.countDocuments({ status: 'تم التقديم' });

    res.json({ users, orders, pending, completed });
  } catch (err) {
    res.status(500).json({ msg: 'خطأ في جلب الإحصائيات' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // لا ترجع الباسورد
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'خطأ في جلب المستخدمين' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'فشل في التحديث' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ msg: 'تم الحذف' });
  } catch (err) {
    res.status(500).json({ msg: 'فشل في الحذف' });
  }
};



exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Preference.find().populate('userId', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ msg: 'خطأ في تحميل الطلبات' })
  }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const order = await Preference.findByIdAndUpdate(id, { status }, { new: true })
    res.json(order)
  } catch (err) {
    res.status(500).json({ msg: 'فشل تحديث الحالة' })
  }
}

