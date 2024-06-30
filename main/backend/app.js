const express = require("express");
const forumController = require("./controllers/forumController");
const sql = require("mssql");
const dbConfig = require("./dbConfig"); // Adjust filename as per your actual DB configuration file
const bodyParser = require("body-parser");
const validateForum = require("./middlewares/validateForum"); // Assuming you have a validation middleware for forums

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes for forums
app.get("/forum", forumController.getAllForums);
app.post("/forum", validateForum, forumController.createForum);
app.put("/forum/:id", validateForum, forumController.updateForum);
app.delete("/forum/:id", forumController.deleteForum);

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
