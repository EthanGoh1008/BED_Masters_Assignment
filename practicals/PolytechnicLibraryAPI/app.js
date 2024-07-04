require("dotenv").config();
const express = require("express");
const { registerUser, login } = require("./controllers/authControllers");
const {
  getAllBooksController,
  updateBookAvailabilityController,
} = require("./controllers/booksControllers");
const { verifyJWT, authorizeRoles } = require("./middlewares/authorizeUser");

const app = express();
app.use(express.json());

app.post("/register", registerUser);
app.post("/login", login);
app.get(
  "/books",
  verifyJWT,
  authorizeRoles("member", "librarian"),
  getAllBooksController
);
app.put(
  "/books/:bookId/availability",
  verifyJWT,
  authorizeRoles("librarian"),
  updateBookAvailabilityController
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
