const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../dbConfig");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (result.recordset.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hash)
      .query(
        "INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)"
      );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Other routes (login, get user by ID, update user, delete user) go here...
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT id, username, email FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get user by ID
router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request().input("userId", sql.Int, userId).query(`
        SELECT u.username, u.email, up.aboutMyself, up.preferredEvent 
        FROM Users u
        LEFT JOIN UserProfile up ON u.id = up.userId
        WHERE u.id = @userId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "User profile not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE id = @id");

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const { aboutMyself, preferredEvent } = req.body;

  try {
    const pool = await poolPromise;

    // Check if user profile exists
    const profileCheck = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM UserProfile WHERE userId = @userId");

    if (profileCheck.recordset.length === 0) {
      // Insert new profile if not exists
      await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("aboutMyself", sql.NVarChar(sql.MAX), aboutMyself)
        .input("preferredEvent", sql.NVarChar(100), preferredEvent)
        .query(
          "INSERT INTO UserProfile (userId, aboutMyself, preferredEvent) VALUES (@userId, @aboutMyself, @preferredEvent)"
        );
    } else {
      // Update existing profile
      await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("aboutMyself", sql.NVarChar(sql.MAX), aboutMyself)
        .input("preferredEvent", sql.NVarChar(100), preferredEvent)
        .query(
          "UPDATE UserProfile SET aboutMyself = @aboutMyself, preferredEvent = @preferredEvent WHERE userId = @userId"
        );
    }

    res.status(200).json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @Email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "0.1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Export the router
module.exports = router;
