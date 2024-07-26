const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../dbConfig");

// Middleware to validate token and role
const auth = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], jwtSecret); // Split to remove 'Bearer' prefix
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
  

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};

module.exports = { auth, authorizeRoles };
