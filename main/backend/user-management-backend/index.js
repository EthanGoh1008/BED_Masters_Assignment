const express = require("express");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/users");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
