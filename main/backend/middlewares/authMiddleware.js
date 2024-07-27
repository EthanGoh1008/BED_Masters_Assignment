const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../dbConfig");
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      console.log("Invalid token format");
      return res.status(401).json({ msg: "Token is not valid" });
    }

    const decoded = jwt.verify(tokenParts[1], jwtSecret);
    console.log("Decoded token:", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};



module.exports = { auth};
