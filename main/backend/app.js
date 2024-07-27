require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoute = require("./routes/users");
const adminRoutes = require("./routes/admin");
const forumController = require("./controllers/forumController");
const validateForum = require("./middlewares/validateForum");
const eventsRoute = require("./routes/event");
const { poolPromise } = require("./dbConfig");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // Import generated spec
const { auth, authorizeRoles } = require("./middlewares/authMiddleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Liew Zhan Yang routes
app.use("/api/users", usersRoute);
app.use("/api/admin", adminRoutes);

//Jayden routes
app.get("/api/forum", forumController.getAllForums);
app.post("/api/forum", validateForum, forumController.createForum);
app.put("/api/forum/:id", validateForum, forumController.updateForum);
app.delete("/api/forum/:id", forumController.deleteForum);
app.use("/api", eventsRoute);

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
  await poolPromise.close();
  console.log("Database connection closed");
  process.exit(0);
});
