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

// Get current user's profile information
router.get("/me", auth, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("userId", sql.Int, req.user.id)
      .query(`
          SELECT u.username, u.email, up.aboutMyself, up.preferredEvent
          FROM Users u
          LEFT JOIN UserProfile up ON u.id = up.userId
          WHERE u.id = @userId
        `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
