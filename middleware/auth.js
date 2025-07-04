const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  const token = req.headers.authorization?.split(' ')[1];
  // console.log("🚀 /middleware/auth.js - verifyToken - token:", token);
  if (!token) return res.status(401).json({ msg: 'لا يوجد توكن' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // يضيف id المستخدم في الطلب
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'توكن غير صالح' });
  }
}

module.exports = verifyToken;
