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

// Get total events count
router.get("/count-events", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT COUNT(*) AS totalEvents FROM Events");
    res.json({ totalEvents: result.recordset[0].totalEvents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get total forum count
router.get("/count-forum", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT COUNT(*) AS totalForum FROM Forums");
    res.json({ totalForum: result.recordset[0].totalForum });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
