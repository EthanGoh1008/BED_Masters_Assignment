require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoute = require("./routes/users");
const forumController = require("./controllers/forumController");
const validateForum = require("./middlewares/validateForum");
const { poolPromise } = require("./dbConfig");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", usersRoute);

app.get("/api/forum", forumController.getAllForums);
app.post("/api/forum", validateForum, forumController.createForum);
app.put("/api/forum/:id", validateForum, forumController.updateForum);
app.delete("/api/forum/:id", forumController.deleteForum);

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
