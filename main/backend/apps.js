require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { poolPromise } = require("./dbConfig"); // Adjust the path as necessary
const usersRoute = require("./routes/users"); // Adjust the path as necessary

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes for user management
app.use("/api/users", usersRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the User Management API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal server error" });
});

const startServer = async () => {
  try {
    await poolPromise;
    console.log("Database connection established successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await poolPromise.close();
  console.log("Database connection closed");
  process.exit(0);
});
