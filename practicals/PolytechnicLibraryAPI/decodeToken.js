require("dotenv").config(); // Ensure this is at the top of your file
const jwt = require("jsonwebtoken");

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the JWT_SECRET from .env
    console.log("Decoded JWT token:", decoded);
  } catch (err) {
    console.error("Failed to decode JWT token:", err.message);
  }
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Im1lbWJlciIsImlhdCI6MTcyMDA3MTcyNSwiZXhwIjoxNzIwMDc1MzI1fQ.ikP6ewc0f4rbia4kc6Anbql0LDY1NgwRxjG_sYLLN7k"; // Replace with your actual token
decodeToken(token);
