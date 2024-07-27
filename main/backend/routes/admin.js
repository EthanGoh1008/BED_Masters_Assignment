const express = require("express");
const { poolPromise, sql } = require("../dbConfig");
const router = express.Router();

router.get("/count-users", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT COUNT(*) AS totalUsers FROM Users");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/count-members", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT COUNT(*) AS totalMembers FROM Users WHERE role = 'member'"
      );
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/count-admins", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT COUNT(*) AS totalAdmins FROM Users WHERE role = 'admin'");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
