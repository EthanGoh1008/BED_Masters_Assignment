const express = require("express");
const { connect } = require("./db"); // Adjust path if necessary
const forumRoutes = require("./routes/forumroutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MySQL database
connect();

// Routes
app.use("/api", forumRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
