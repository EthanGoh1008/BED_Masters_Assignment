require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoute = require("./routes/users");
const adminRoutes = require("./routes/admin");
const forumController = require("./controllers/forumController");
const validateForum = require("./middlewares/validateForum");
const eventsRoute = require("./routes/event");
const eventRoutes = require("./routes/eventRoute");
const forumRoutes = require("./routes/forumroute");
const { poolPromise } = require("./dbConfig");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // Import generated spec
const { auth } = require("./middlewares/authMiddleware");
const recipeRoutes = require("./routes/recipe");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Ethan routes
app.use("/recipes", recipeRoutes);

//Liew Zhan Yang routes
app.use("/api/users", usersRoute);
app.use("/api/admin", adminRoutes);

//Jayden routes
app.use("/api/forum", forumRoutes);
app.post("/api/forum", validateForum, forumController.createForum);
app.put("/api/forum/:id", validateForum, forumController.updateForum);
app.delete("/api/forum/:id", forumController.deleteForum);
app.use("/api", eventsRoute);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the User Management and Forum API");
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
  console.log("Database connection closed");
  process.exit(0);
});
