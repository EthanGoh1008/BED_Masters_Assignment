require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");
const usersRoute = require("./routes/users");
const forumController = require("./controllers/forumController");
const validateForum = require("./middlewares/validateForum");
const dbConfig = require("./dbConfig"); // Adjust filename as per your actual DB configuration file

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes for user management
app.use("/api/users", usersRoute);

// Routes for forums
app.get("/api/forum", forumController.getAllForums);
app.post("/api/forum", validateForum, forumController.createForum);
app.put("/api/forum/:id", validateForum, forumController.updateForum);
app.delete("/api/forum/:id", forumController.deleteForum);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the User Management and Forum API");
});

// Start server
const startServer = async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
