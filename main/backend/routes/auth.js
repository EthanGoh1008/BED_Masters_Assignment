router.get("/", auth, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
