const express = require("express");
const path = require("path");
const recipesController = require("./controllers/recipesController");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body-parser
const validateRecipe = require("./middlewares/validateRecipe");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default ports

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve recipesmore.html at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "recipesmore.html"));
});

// Routes for GET requests (replace with appropriate routes for update and delete later)
app.get("/recipes", recipesController.getAllRecipes);
app.get("/recipes/:id", recipesController.getRecipeById);
app.post("/recipes", validateRecipe, recipesController.createRecipe);
app.put("/recipes/:id", validateRecipe, recipesController.updateRecipe);
app.delete("/recipes/:id", recipesController.deleteRecipe);

app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
