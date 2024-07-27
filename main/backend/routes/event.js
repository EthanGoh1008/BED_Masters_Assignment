const express = require("express");
const { poolPromise, sql } = require("../dbConfig");
const router = express.Router();

router.get("/events", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT event_date, title, image_url FROM Events WHERE event_date >= GETDATE() ORDER BY event_date ASC");
    res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
