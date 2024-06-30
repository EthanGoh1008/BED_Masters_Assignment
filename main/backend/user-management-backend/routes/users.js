const express = require("express");
const bcrypt = require("bcryptjs");
const { poolPromise, sql } = require("../db");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("passwordHash", sql.VarChar, hash)
      .query(
        "INSERT INTO Users (Email, PasswordHash) VALUES (@Email, @PasswordHash)"
      );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
