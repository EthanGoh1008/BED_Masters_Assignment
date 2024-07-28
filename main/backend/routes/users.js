const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { poolPromise, sql } = require("../dbConfig");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

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
      .input("role", sql.VarChar, role || "member")
      .query(
        "INSERT INTO Users (username, email, password, role) VALUES (@username, @email, @password, @role)"
      );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//login user
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
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: payload });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//admin login
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: payload });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Other routes (login, get user by ID, update user, delete user) go here...
router.get("/", auth, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT id, username, email ,role FROM Users");
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
      .query("SELECT id, username, email, role FROM Users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update user
router.put("/put/:id", auth, async (req, res) => {
  console.log(`PUT request received for user ID: ${req.params.id}`);
  console.log("Request Body:", req.body);
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

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
    if (role) {
      query += "role = @Role, ";
      request.input("role", sql.VarChar, role);
    }
    query = query.slice(0, -2); // Remove the last comma
    query += " WHERE id = @id";
    request.input("id", sql.Int, id);

    await request.query(query);
    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get user by ID for profile
router.get("/profile/:userId", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
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

// Update user role
router.put("/role/:id", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("role", sql.VarChar, role)
      .query("UPDATE Users SET role = @role WHERE id = @id");

    res.status(200).json({ msg: "User role updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/profile/:userId", auth, async (req, res) => {
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

// Protecting a route with the auth middleware
router.get("/protected-route", auth, (req, res) => {
  res.send("This is a protected route");
});

router.get("/admin-details/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request().input("userId", sql.Int, userId).query(`
        SELECT u.username, u.email, ad.age, ad.about, ad.yearsOfExperience 
        FROM Users u
        LEFT JOIN AdminDetails ad ON u.id = ad.userId
        WHERE u.id = @userId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Admin details not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update admin details
router.put("/admin-details/:userId", async (req, res) => {
  const { userId } = req.params;
  const { age, about, yearsOfExperience } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    await request
      .input("userId", sql.Int, userId)
      .input("age", sql.Int, age)
      .input("about", sql.NVarChar(sql.MAX), about)
      .input("yearsOfExperience", sql.Int, yearsOfExperience).query(`
        UPDATE AdminDetails 
        SET age = @age, about = @about, yearsOfExperience = @yearsOfExperience
        WHERE userId = @userId
      `);

    res.status(200).json({ msg: "Admin details updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// Export the router
module.exports = router;
