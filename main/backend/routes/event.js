const express = require("express");
const { poolPromise, sql } = require("../dbConfig");
const router = express.Router();

router.get("/event", async (req, res) => {
  try {
    const pool = await poolPromise;
    console.log("Connected to the database");
    const result = await pool
      .request()
      .query(
        "SELECT event_date, event_title, event_image_url FROM Events WHERE event_date >= GETDATE() ORDER BY event_date ASC"
      );

    console.log("Query executed, result:", result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error during query execution:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
