const jwt = require('jsonwebtoken');

 function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'ليس لديك صلاحية الوصول' });
    }
    next();
  };
};

module.exports = authorizeRoles;
