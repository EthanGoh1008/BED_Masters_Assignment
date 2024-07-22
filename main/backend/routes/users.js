const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { poolPromise, sql } = require("../database-connection/db");
const { jwtSecret } = require("../dbConfig");
const router = express.Router();

// Middleware to validate token
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Update user profile
router.put(
  "/profile",
  auth,
  [body("aboutMyself").not().isEmpty(), body("preferredEvent").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { aboutMyself, preferredEvent } = req.body;

    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("userId", sql.Int, req.user.id)
        .input("aboutMyself", sql.NVarChar, aboutMyself)
        .input("preferredEvent", sql.NVarChar, preferredEvent).query(`
        IF EXISTS (SELECT 1 FROM UserProfile WHERE userId = @userId)
        BEGIN
          UPDATE UserProfile
          SET aboutMyself = @aboutMyself, preferredEvent = @preferredEvent
          WHERE userId = @userId
        END
        ELSE
        BEGIN
          INSERT INTO UserProfile (userId, aboutMyself, preferredEvent)
          VALUES (@userId, @aboutMyself, @preferredEvent)
        END
      `);

      res.json({ msg: "Profile updated successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
