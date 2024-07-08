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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6ImxpYnJhcmlhbiIsImlhdCI6MTcyMDQwNDA5MiwiZXhwIjoxNzIwNDA3NjkyfQ.QcidCCFNLJRHXo0oQxmDhOz8EkNDSFLEx4GN1G3hJ1M"; // Replace with your actual token
decodeToken(token);
