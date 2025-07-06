const mongoose = require('mongoose');

const starlinkIssueSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueType: { type: String, required: true },
  fullName: String,
  email: { type: String, required: true },
  address: String,
  phone: String,
  accountNumber: String,
  dishNumber: String,
  kitNumber: String,
  starlinkID: String,
  password: String,
   identityImageUrl: String,
  invoiceImageUrl: String,
  dishImageUrl: String,
  visaImageUrl: String,
    status: {
    type: String,
    default: "جاري الفحص", // الحالة الابتدائية
    enum: ['جاري الفحص', 'جاري الطلب', 'مرفوض', 'تم الطلب']
  },


  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StarlinkIssue', starlinkIssueSchema);
