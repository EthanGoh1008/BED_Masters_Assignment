const bcrypt = require("bcryptjs");
const sql = require("mssql");
const { poolPromise } = require("../database-connection/db");

// Function to get a user by username
async function getUserByUsername(username) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username = @username");
    return result.recordset[0];
  } catch (err) {
    console.error(err);
    throw new Error("Database query error");
  }
}

// Function to create a new user in the database
async function createUser(username, email, hashedPassword) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (username, email, password) VALUES (@username, @Email, @password)"
      );
  } catch (err) {
    console.error(err);
    throw new Error("Database insert error");
  }
}

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    // Validate user data
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check for existing username
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in database
    await createUser(username, email, hashedPassword);

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerUser,
};
