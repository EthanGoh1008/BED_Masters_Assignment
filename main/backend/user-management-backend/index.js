const express = require("express");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/users");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the User Management API");
});

app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
