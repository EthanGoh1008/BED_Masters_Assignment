require("dotenv").config();

module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true, // Add this line if you are using self-signed certificates
  },
  jwtSecret: "your_jwt_secret",
};
