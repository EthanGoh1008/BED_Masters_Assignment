const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { poolPromise, sql } = require("../database-connection/db");
const { jwtSecret } = require("../config/dbConfig"); // Add this line
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
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT id, username, email FROM Users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "User not found" });
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request().input("id", sql.Int, id);

    let query = "UPDATE Users SET ";
    if (username) {
      query += "username = @username, ";
      request.input("username", sql.VarChar, username);
    }
    if (email) {
      query += "email = @Email, ";
      request.input("email", sql.VarChar, email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += "password = @Password, ";
      request.input("password", sql.VarChar, hashedPassword);
    }
    query = query.slice(0, -2); // Remove the last comma
    query += " WHERE id = @id";

    await request.query(query);

    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM Users WHERE email = @Email");

      if (result.recordset.length === 0) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const user = result.recordset[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

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

// Protected route example
router.get("/me", auth, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.user.id)
      .query("SELECT * FROM Users WHERE id = @id");

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
module.exports = router;
