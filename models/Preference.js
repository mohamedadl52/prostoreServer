const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  phone: { type: String, required: true },
  seatNumber: { type: String, required: true },
  preferences: [
    {
      university: String,
      faculty: String
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['جاري الفحص', 'جاري الطلب', 'مرفوض', 'تم الطلب'],
    default: 'جاري الفحص' // ✅ يبدأ دائمًا بهذه الحالة
  }
}, { timestamps: true });
module.exports = mongoose.model('Preference', preferenceSchema);
