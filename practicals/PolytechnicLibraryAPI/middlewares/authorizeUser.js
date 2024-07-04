const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log("Decoded token:", decoded); // Log the decoded token for debugging

    req.user = decoded;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(`User role ${req.user.role} not authorized`); // Log the role check for debugging
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

module.exports = { verifyJWT, authorizeRoles };
