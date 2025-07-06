const asyncHandler = require("express-async-handler");

const checkRole = (roles) => {
  return asyncHandler((req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. You do not have permission to access this page." });
    }
    next();
  });
};

module.exports = { checkRole };
