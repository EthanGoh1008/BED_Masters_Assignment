const { sql, poolPromise } = require("../config/db");

async function getAllUsers() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

async function createUser(user) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.VarChar, user.username)
      .input("email", sql.VarChar, user.email)
      .input("password", sql.VarChar, user.password)
      .query(
        "INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)"
      );
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

module.exports = {
  getAllUsers,
  createUser,
};
